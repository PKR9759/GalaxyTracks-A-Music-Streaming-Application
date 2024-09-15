
const axios = require('axios');

exports.getSongDetails = async (req, res) => {
    try {
        const { songId } = req.params; 
        const response = await axios.get(`https://saavn.dev/api/songs/${songId}`);
        console.log(response)
        const song = response.data.data[0]; 

        if (!song) {
            return res.status(404).json({ success: false, message: 'Song not found' });
        }

       
        return res.json({
            success: true,
            data: {
                id: song.id,
                name: song.name,
                duration: song.duration,
                artist: song.artists.primary.map(artist => artist.name).join(', '),
                image: song.image?.[0]?.url || '',
                url: song.url
            }
        });
    } catch (error) {
        console.error('Error fetching song details:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};
