import React from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import MusicPlayer from './components/MusicPlayer';
import HomePage from './pages/HomePage';
import PlaylistPage from './pages/PlaylistPage';
import ProfilePage from './pages/ProfilePage';
import SparksPage from './pages/SparksPage';
import PlaylistsPage from './pages/PlaylistsPage';
import CreatePlaylistPage from './pages/CreatePlaylistPage';

function App() {
  return (
    <Router>
      <div className="bg-black min-h-screen text-white">
        <Routes>

          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/player" element={<MusicPlayer />} />
          <Route path="/playlist" element={<PlaylistPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/sparks" element={<SparksPage />} />
          <Route path="/playlists" element={<PlaylistsPage />} />
          <Route path="/createPlaylist" element={<CreatePlaylistPage/>} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;
