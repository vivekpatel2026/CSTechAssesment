const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin } = require('../controllers/authController');

// NOTE: Register route should ideally be removed or protected after initial admin setup
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

module.exports = router;