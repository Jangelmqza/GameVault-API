const express = require('express');
const router = express.Router();
const platformController = require('../controllers/platformController');

router.get('/', platformController.getAllPlatforms);
router.get('/:id', platformController.getPlatformById);
router.get('/:id/games', platformController.getGamesByPlatform);

module.exports = router;
