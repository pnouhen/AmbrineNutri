const express = require('express');
const router = express.Router();
const { generatePDF } = require('../controllers/pdfController');

router.get('/generate-pdf', generatePDF);

module.exports = router;
