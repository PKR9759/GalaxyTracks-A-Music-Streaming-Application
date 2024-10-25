const express = require('express');
const router = express.Router();
const { streamSparkClip } = require('../controllers/sparksController');

router.get('/stream', streamSparkClip);


module.exports = router;
