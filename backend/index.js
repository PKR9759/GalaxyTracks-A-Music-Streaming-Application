const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
// const musicRoutes = require('./routes/musicRoutes');
const spotifyRoutes = require('./routes/spotifyRoutes');
// app.use('/api/music', musicRoutes);
app.use('/api/spotify', spotifyRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
