const axios = require('axios');

const getCategorySongs = async (req, res) => {
    const { category } = req.params;

    try {
        const response = await axios.get(`https://saavn.dev/api/search/songs`, {
            params: { query: category }
        });

        if (!response.data.success) {
            return res.status(500).json({ success: false, message: 'Failed to fetch songs' });
        }

        const songs = response.data.data.map(song => ({
            id: song.id,
            name: song.name,
            artist: song.artists.primary[0]?.name || 'Unknown Artist',
            album: song.album.name || 'Unknown Album',
            duration: song.duration,
            image: song.image[0]?.url || 'No Image'
        }));

        res.status(200).json({ success: true, songs });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching songs', error: error.message });
    }
};

module.exports = {
    getCategorySongs
};
