
const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    songs: [String]  // List of song IDs (strings)
});

module.exports = mongoose.model('Playlist', playlistSchema);
