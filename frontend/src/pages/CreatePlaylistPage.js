import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import BASE_URL from '../apiConfig'; // Base URL for your API
import { toast } from 'react-toastify';

const CreatePlaylist = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      if (!token) {
        toast.error('You are not logged in');
        return;
      }

      // Send the token in the headers along with the playlist data
      const response = await axios.post(
        `${BASE_URL}/playlists/create`,
        { name, description },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success('Playlist created successfully!');
      setName(''); // Reset the form
      setDescription('');

      // Redirect to the Playlists page after successful creation
      navigate('/playlists');
    } catch (error) {
      toast.error('Error creating playlist: ' + (error.response?.data?.message || 'Server error'));
    }
  };

  return (
    <div className="bg-black min-h-screen p-8 flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-[#1F1F1F] p-6 rounded-lg w-full max-w-md border border-gray-600 mb-4">
        <h2 className="text-2xl font-semibold text-white mb-6">Create New Playlist</h2>

        <div className="mb-4">
          <label className="block text-white font-semibold mb-2">Playlist Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 bg-black text-white border border-gray-600 rounded-lg focus:outline-none"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-white font-semibold mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 bg-black text-white border border-gray-600 rounded-lg focus:outline-none"
            rows="4"
          />
        </div>

        <button type="submit" className="w-full py-3 bg-[#333] text-white font-bold rounded-lg border border-gray-600 hover:bg-[#555]">
          Create Playlist
        </button>
      </form>

      {/* Go Back Button */}
      <button
        onClick={() => navigate('/playlists')}
        className="py-2 px-4 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-500"
      >
        Go Back
      </button>
    </div>
  );
};

export default CreatePlaylist;
