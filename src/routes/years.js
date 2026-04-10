const express = require('express');
const router = express.Router();
const yearController = require('../controllers/yearController');

router.get('/', yearController.getYears);

module.exports = router;
