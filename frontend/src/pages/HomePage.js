import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';  // Import Footer component
import { Link } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../apiConfig';

const HomePage = () => {
    const [history, setHistory] = useState([]);
    const [latestSongs, setLatestSongs] = useState([]);
    const [error, setError] = useState(null);
    
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            const fetchHomePageData = async () => {
                try {
                    const response = await axios.get(`${BASE_URL}/home`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    const { historySongs, latestReleases } = response.data.data;
                    setHistory(historySongs);
                    setLatestSongs(latestReleases);
                } catch (err) {
                    console.error('Error fetching home page data:', err);
                    setError('Failed to load data');
                }
            };
            fetchHomePageData();
        }
    }, [navigate]);

    return (
        <div className="bg-black min-h-screen text-white">
            <Navbar />

            <div className="pt-20 px-4 space-y-10">
                {/* Recently Played Section */}
                <section>
                    <h2 className="text-3xl font-bold text-white mb-4">Recently Played</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {history.map((song, index) => (
                            <div 
                                key={index} 
                                className="relative p-2 bg-gray-900 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-0 text-white"
                                style={{ border: '1px solid #444', backgroundColor: '#1f1f1f' }} 
                            >
                                <Link 
                                    to={`/player/${song.id}`} 
                                    className="relative block text-center no-underline text-white hover:text-gray-300 focus:outline-none focus:ring-0"
                                >
                                    <div className="bg-gray-700 h-24 w-24 mb-2 rounded-md flex items-center justify-center mx-auto">
                                        <img src={song.image} alt={`${song.name} Album Art`} className="h-full w-full object-cover rounded-md" />
                                    </div>
                                    <p className="text-white text-sm">{song.name}</p>
                                    <p className="text-gray-300 text-xs">{song.artist}</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Latest Songs Section */}
                <section>
                    <h2 className="text-3xl font-bold text-white mb-4">Latest Songs</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {latestSongs.map((song, index) => (
                            <div 
                                key={index} 
                                className="relative p-2 bg-gray-900 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-0 text-white"
                                style={{ border: '1px solid #444', backgroundColor: '#1f1f1f' }} 
                            >
                                <Link 
                                    to={`/player/${song.id}`} 
                                    className="relative block text-center no-underline text-white hover:text-gray-300 focus:outline-none focus:ring-0"
                                >
                                    <div className="bg-gray-700 h-24 w-24 mb-2 rounded-md flex items-center justify-center mx-auto">
                                        <img src={song.image} alt={`${song.name} Album Art`} className="h-full w-full object-cover rounded-md" />
                                    </div>
                                    <p className="text-white text-sm">{song.name}</p>
                                    <p className="text-gray-300 text-xs">{song.artist}</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>

                {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            </div>

            <Footer /> {/* Add Footer component */}
        </div>
    );
};

export default HomePage;
