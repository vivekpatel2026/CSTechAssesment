const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/authMiddleware');
const { uploadAndDistribute, getDistributedLists } = require('../controllers/listController');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// File validation
const fileFilter = (req, file, cb) => {
  const allowedTypes = /csv|xlsx|xls/;
  const mimetype = allowedTypes.test(file.mimetype);
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  if (mimetype && extname) {
    return cb(null, true);
  }
  cb('Error: File type not supported. Please upload CSV or XLSX files.');
};

const upload = multer({ storage, fileFilter });

// @route   POST api/lists/upload
// @desc    Upload CSV and distribute
// @access  Private
router.post('/upload', [auth, upload.single('listFile')], uploadAndDistribute);

// @route   GET api/lists
// @desc    Get all distributed lists
// @access  Private
router.get('/', auth, getDistributedLists);

module.exports = router;