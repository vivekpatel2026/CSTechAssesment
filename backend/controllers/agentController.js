const Agent = require('../models/Agent');
const bcrypt = require('bcryptjs');

exports.addAgent = async (req, res) => {
  const { name, email, mobile, password } = req.body;
  try {
    let agent = await Agent.findOne({ email });
    if (agent) {
      return res.status(400).json({ msg: 'Agent already exists' });
    }

    agent = new Agent({ name, email, mobile, password });

    const salt = await bcrypt.genSalt(10);
    agent.password = await bcrypt.hash(password, salt);

    await agent.save();
    res.status(201).json(agent);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// --- NEW FUNCTION ---
// @desc    Get all agents
// @route   GET /api/agents
// @access  Private
exports.getAllAgents = async (req, res) => {
  try {
    // Find all agents and exclude their passwords from the result
    const agents = await Agent.find().select('-password');
    res.json(agents);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// --- NEW FUNCTION ---
// @desc    Delete an agent
// @route   DELETE /api/agents/:id
// @access  Private
exports.deleteAgent = async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);

    if (!agent) {
      return res.status(404).json({ msg: 'Agent not found' });
    }

    await Agent.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Agent removed successfully' });
  } catch (err) {
    console.error(err.message);
    // Handle cases where the ID is not a valid ObjectId
    if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Agent not found' });
    }
    res.status(500).send('Server Error');
  }
};