const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const homeRoutes = require('./routes/homeRoutes');
const playlistRoutes = require('./routes/playlistRoutes');

const cors= require('cors');

const app = express();
app.use(cors());
const PORT =8000;

app.use(express.json());
app.use('/api/auth',authRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/playlists', playlistRoutes);


// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
