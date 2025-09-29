const express = require('express');
const router = express.Router();
const { generateInvoice } = require('../controllers/generateInvoice');

router.get('/generate-pdf', generateInvoice);

module.exports = router;
