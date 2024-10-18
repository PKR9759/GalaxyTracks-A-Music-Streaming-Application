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
import { PlayerProvider } from './contexts/PlayerContext';
import AudioPlayer from './components/AudioPlayer';
import AuthProvider from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import NotFoundPage from './pages/NotFoundPage'; 

function App() {
  return (
    <Router>
      <AuthProvider>
        <PlayerProvider>
          <div className="bg-black min-h-screen text-white flex flex-col">
            <div className="flex-grow overflow-y-auto"> {/* Content area */}
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/" element={<Navigate to="/home" />} />
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/player/:songId" element={<PlayerPage />} />
                  <Route path="/playlist/:playlistId" element={<PlaylistPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/sparks" element={<SparksPage />} />
                  <Route path="/playlists" element={<PlaylistsPage />} />
                  <Route path="/createPlaylist" element={<CreatePlaylistPage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/about" element={<AboutUsPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
            </div>
            <AudioPlayer /> {/* Fixed audio player */}
          </div>
        </PlayerProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
