const express = require('express');
const router = express.Router();

const genreRoutes = require('./genres');
const platformRoutes = require('./platforms');
const gameRoutes = require('./games');
const yearRoutes = require('./years');

router.use('/genre', genreRoutes);
router.use('/platform', platformRoutes);
router.use('/game', gameRoutes);
router.use('/year', yearRoutes);

// Endpoint para configuraciones (ej: API Keys)
router.get('/config', (req, res) => {
    res.json({
        rawgApiKey: process.env.RAWG_API_KEY || ''
    });
});

module.exports = router;
