const express = require('express');
const connectDB = require('./config/db.js');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Connect to Database
connectDB();

// Init Middleware
app.use(cors());
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/agents', require('./routes/agentRoutes'));
app.use('/api/lists', require('./routes/listRoutes'));


const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT} 🚀`));