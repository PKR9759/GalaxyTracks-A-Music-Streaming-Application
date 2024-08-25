// controllers/homeController.js
const axios = require('axios');
const User = require('../models/User');

const getHomePageData = async (req, res) => {
    const userId = req.user.id; // Assuming JWT middleware handles user authentication

    try {
        // Fetch user from the database
        const user = await User.findById(userId);
        const { listeningHistory } = user;

        // Fetch song details from JioSaavn for each songId in the listening history
        const listeningHistorySongs = await Promise.all(listeningHistory.map(async (entry) => {
            const songId = entry.songId;
            // Fetch song details from JioSaavn API using songId
            const songDetailsResponse = await axios.get(`https://saavn.dev/api/song?id=${songId}`);
            const songDetails = songDetailsResponse.data;

            return {
                songId: songDetails.id,
                name: songDetails.name,
                artist: songDetails.primaryArtists,
                duration: songDetails.duration,  // Add song duration
                playedAt: entry.playedAt,
                image: songDetails.image[2].link // Assuming the image URL comes from JioSaavn
            };
        }));

        // Fetch latest releases from JioSaavn API
        const latestReleaseResponse = await axios.get(`https://saavn.dev/api/search/songs?query=latest`);
        const latestReleaseSongs = latestReleaseResponse.data.results.map(song => ({
            name: song.name,
            artist: song.primaryArtists,
            duration: song.duration,  // Add song duration
            image: song.image[2].link
        }));

        // Return both listening history songs and latest release songs
        res.status(200).json({
            listeningHistorySongs,
            latestReleaseSongs,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching home page data' });
    }
};

module.exports = { getHomePageData };
