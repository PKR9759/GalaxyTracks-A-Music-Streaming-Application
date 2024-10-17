const axios = require('axios');

exports.getSongDetails = async (req, res) => {
    
    try {
        const { songId } = req.params;  // Extract song ID from request params
        const response = await axios.get(`https://saavn.dev/api/songs/${songId}`); // External API call to fetch song details
        
        const song = response.data.data[0];  // Get the first song from the response

        // If no song is found
        if (!song) {
            return res.status(404).json({ success: false, message: 'Song not found' });
        }

        // Structure the response data as required by the frontend
        return res.json({
            success: true,
            song: {
                id: song.id,
                name: song.name,
                duration: song.duration || 0,  // Fallback to 0 if duration is missing
                artist: song.artists?.primary.map(artist => artist.name).join(', ') || 'Unknown Artist',
                image: song.image?.[0]?.url || '/default-image.jpg',  // Provide default image if not available
                url: song.url,  // URL for audio playback
                language: song.language || 'Unknown',  // Default value if language is not available
                hasLyrics: song.hasLyrics || false,  // Whether the song has lyrics
            }
        });
    } catch (error) {
        console.error('Error fetching song details:', error.message);
        return res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};
