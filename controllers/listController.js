const csv = require('csv-parser');
const xlsx = require('xlsx');
const fs = require('fs');
const Agent = require('../models/Agent');
const ListItem = require('../models/ListItem');

exports.uploadAndDistribute = async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const agents = await Agent.find().limit(5); // Get 5 agents
  if (agents.length < 5) {
    return res.status(400).json({ msg: 'Not enough agents. Please add at least 5 agents.' });
  }

  const results = [];
  const filePath = req.file.path;

  const stream = fs.createReadStream(filePath);

  // Handle file parsing based on mimetype
  if (req.file.mimetype === 'text/csv') {
    stream.pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        await distributeAndSave(results, agents, res);
        fs.unlinkSync(filePath); // Clean up uploaded file
      });
  } else if (['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'].includes(req.file.mimetype)) {
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = xlsx.utils.sheet_to_json(sheet);
      await distributeAndSave(jsonData, agents, res);
      fs.unlinkSync(filePath); // Clean up uploaded file
  } else {
     fs.unlinkSync(filePath);
     return res.status(400).json({ msg: 'Unsupported file type.' });
  }
};

// Helper function to distribute and save data
const distributeAndSave = async (items, agents, res) => {
  try {
    const totalItems = items.length;
    const numAgents = agents.length;
    const itemsToSave = [];
    let agentIndex = 0;

    for (const item of items) {
      const listItem = {
        firstName: item.FirstName,
        phone: item.Phone,
        notes: item.Notes,
        agent: agents[agentIndex]._id,
      };
      itemsToSave.push(listItem);

      // Cycle through agents
      agentIndex = (agentIndex + 1) % numAgents;
    }

    // Clear previous list items before inserting new ones
    await ListItem.deleteMany({});
    await ListItem.insertMany(itemsToSave);

    res.status(200).json({ msg: `${totalItems} items distributed successfully among ${numAgents} agents.` });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error during distribution');
  }
};


exports.getDistributedLists = async (req, res) => {
    try {
        const lists = await ListItem.find().populate('agent', 'name email');
        // Group lists by agent
        const groupedByAgent = lists.reduce((acc, item) => {
            const agentId = item.agent._id;
            if (!acc[agentId]) {
                acc[agentId] = {
                    agent: item.agent,
                    items: []
                };
            }
            acc[agentId].items.push(item);
            return acc;
        }, {});
        res.json(Object.values(groupedByAgent));
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};