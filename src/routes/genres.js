const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genreController');

router.get('/', genreController.getAllGenres);
router.get('/:id', genreController.getGenreById);
router.get('/:id/games', genreController.getGamesByGenre);

module.exports = router;
