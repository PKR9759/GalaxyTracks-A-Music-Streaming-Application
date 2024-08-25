const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String },//url of the profile picture
    preferences: {
        genre: [String],
        volume: { type: Number, default: 40 }
    },
    listeningHistory: [
        {
            songId: { type: String },  // song ID from the API
            playedAt: { type: Date, default: Date.now }
        }
    ]

});

module.exports = mongoose.model("User", userSchema);