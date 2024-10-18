const axios = require('axios');

const searchSongs = async (req, res) => {
    const { query } = req.params; // This is the search query
    const page=req.query.page;
    // console.log(query,page);
    try {
        const response = await axios.get(`https://saavn.dev/api/search/songs`, {
            params: { query:query ,page:page}
        });

        if (!response.data.success) {
            return res.status(500).json({ success: false, message: 'Failed to fetch songs' });
        }

        // Map the results to the structure needed by the frontend
        const songs = response.data.data.results.map(song => ({
            id: song.id,
            name: song.name,
            artist: song.artists.primary[0]?.name || 'Unknown Artist', // First primary artist
            album: song.album.name || 'Unknown Album',  // Album name
            duration: song.duration || 0,  // Duration if available
            image: song.image[0]?.url || 'No Image',  // First image URL if available
            url: song.downloadUrl[0].url  // Song URL (for playback or more details)
        }));

        res.status(200).json({ success: true, songs });
    } catch (error) {
        console.error('Error fetching songs:', error.message);
        res.status(500).json({ success: false, message: 'Error fetching songs', error: error.message });
    }
};

module.exports = {
    searchSongs
};
