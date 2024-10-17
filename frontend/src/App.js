import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import HomePage from './pages/HomePage';
import PlaylistPage from './pages/PlaylistPage';
import ProfilePage from './pages/ProfilePage';
import SparksPage from './pages/SparksPage';
import PlaylistsPage from './pages/PlaylistsPage';
import CreatePlaylistPage from './pages/CreatePlaylistPage';
import PlayerPage from './pages/PlayerPage';
import SearchPage from './pages/SearchPage';
import AboutUsPage from './pages/AboutUsPage'; 
import { PlayerProvider } from './contexts/PlayerContext';  // Remove `usePlayer` from here
import AudioPlayer from './components/AudioPlayer';

function App() {
  return (
    <PlayerProvider> {/* Wrap the app with PlayerProvider */}
      <Router>
        <div className="bg-black min-h-screen text-white">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/player/:songId" element={<PlayerPage />} />
            <Route path="/playlist/:playlistId" element={<PlaylistPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/sparks" element={<SparksPage />} />
            <Route path="/playlists" element={<PlaylistsPage />} />
            <Route path="/createPlaylist" element={<CreatePlaylistPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/about" element={<AboutUsPage />} />
          </Routes>
          
          {/* AudioPlayer will consume PlayerContext */}
          <AudioPlayer />
        </div>
      </Router>
    </PlayerProvider>
  );
}

export default App;
