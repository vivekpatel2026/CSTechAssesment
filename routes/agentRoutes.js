const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { addAgent, getAllAgents, deleteAgent } = require('../controllers/agentController');

// @route   POST api/agents
// @desc    Add a new agent
// @access  Private (Admin only)
router.post('/', auth, addAgent);
// @route   GET api/agents
// @desc    Get all agents
// @access  Private (Admin only)
router.get('/', auth, getAllAgents);

// --- NEW ROUTE ---
// @route   DELETE api/agents/:id
// @desc    Delete an agent by ID
// @access  Private (Admin only)
router.delete('/:id', auth, deleteAgent);
module.exports = router;