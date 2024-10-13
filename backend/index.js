const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const homeRoutes = require('./routes/homeRoutes');
const playlistRoutes = require('./routes/playlistRoutes');
const searchRoutes = require('./routes/searchRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const songRoutes = require('./routes/songRoutes');
const userRoutes =require('./routes/userRoutes');


const cors= require('cors');
const cookieParser = require('cookie-parser');


const app = express();
app.use(cors());
app.use(cookieParser());
const PORT =process.env.PORT;

app.use(express.json());
app.use('/api/auth',authRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/song', songRoutes);
app.use('/api/user', userRoutes);

// MongoDB connection 
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});