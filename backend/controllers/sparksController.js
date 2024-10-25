const ytSearch = require('yt-search');
const ytdl = require('@distube/ytdl-core');

const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

// Controller function to get a random .mp3 link for streaming music-related shorts
const streamSparkClip = async (req, res) => {
    try {
        // Define generic music-related search terms for short clips
        const searchTerms = [
            'trending music shorts',
            'popular music clips',
            'new music hits shorts',
            'music shorts 2024',
            'viral music clips',
            'top 10 songs shorts',
        ];

        // Pick a random term each time to keep results fresh
        const randomSearchTerm = getRandomItem(searchTerms);
        
        const searchResults = await ytSearch(randomSearchTerm);

        // Filter to get only videos under 60 seconds
        const shortVideos = searchResults.videos.filter(video => video.seconds <= 60);

        // Check if there are any short video results
        if (!shortVideos.length) {
            return res.status(404).json({ message: 'No short music clips found.' });
        }

        // Select a random short video
        const randomShortVideo = getRandomItem(shortVideos);

        // Set headers for streaming as audio
        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Content-Disposition', 'inline; filename="spark.mp3"');

        // Stream the audio to the client
        const audioStream = ytdl(randomShortVideo.url, {
            filter: 'audioonly',
            quality: 'highestaudio',
        });
        
        audioStream.pipe(res);

        audioStream.on('error', (err) => {
            console.error('Error streaming audio:', err);
            res.status(500).json({ message: 'Error streaming spark audio clip.' });
        });

    } catch (error) {
        console.error('Error fetching spark:', error);
        res.status(500).json({ message: 'Error fetching spark audio clip.' });
    }
};

module.exports = { streamSparkClip };
