const axios = require('axios');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.getHomePageData = async (req, res) => {
    try {
        // Get the token from the Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }

        const token = authHeader.split(' ')[1]; // Extract the token from the "Bearer token"

        // Verify token and extract userId
        let userId;
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            userId = decoded.id;
        } catch (err) {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }

        // Find the user by their ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Retrieve the user's listening history
        const listeningHistory = user.listeningHistory.slice(-10); // Get the last 10 songs
        const historySongs = [];

        for (const history of listeningHistory) {
            try {
                const response = await axios.get(`https://saavn.dev/api/songs/${history.songId}`);
                const song = response.data.data[0];
                historySongs.push({
                    id: song.id,
                    name: song.name,
                    duration: song.duration,
                    artist: song.artists.primary.map(artist => artist.name).join(', '),
                    image: song.image?.[0]?.url || '',
                    url: song.url
                });
            } catch (error) {
                console.error(`Error fetching song ${history.songId} from JioSaavn:`, error);
            }
        }

        // Retrieve latest releases
        const latestReleases = [];
        try {
            const latestReleasesResponse = await axios.get('https://saavn.dev/api/playlists?link=https://www.jiosaavn.com/featured/latest-hindi-songs/TRw,fDVtT7c14faDlWgB3A__');
            const songs = latestReleasesResponse.data.data.songs;
            songs.forEach(song => {
                latestReleases.push({
                    id: song.id,
                    name: song.name,
                    duration: song.duration,
                    artist: song.artists.primary.map(artist => artist.name).join(', '),
                    image: song.image?.[0]?.url || '',
                    url: song.url
                });
            });
        } catch (error) {
            console.error('Error fetching latest releases from JioSaavn:', error);
        }

        // Return the data to the frontend
        return res.json({
            success: true,
            data: {
                historySongs,
                latestReleases
            }
        });

    } catch (error) {
        console.error('Error fetching home page data:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};
