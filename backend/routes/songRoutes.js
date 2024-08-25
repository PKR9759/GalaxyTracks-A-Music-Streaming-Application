const express = require('express');
const { getSongDetails } = require('../controllers/songController');

const router = express.Router();

router.get('/:songId', getSongDetails);  

module.exports = router;
