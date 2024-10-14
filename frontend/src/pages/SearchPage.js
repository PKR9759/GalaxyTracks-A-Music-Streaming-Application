import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../apiConfig';
import Navbar from '../components/Navbar'; // Import Navbar
import Footer from '../components/Footer'; // Import Footer

const SearchPage = () => {
    const [query, setQuery] = useState('');  // Search query
    const [songs, setSongs] = useState([]);  // Search results
    const [loading, setLoading] = useState(false);  // Loading state
    const [error, setError] = useState(null);  // Error state
    const [page, setPage] = useState(0);  // Current page number
    const [hasMore, setHasMore] = useState(true);  // Check if more data is available
    const [isFetchingMore, setIsFetchingMore] = useState(false);  // Loading more state

    // Debounce and trigger search when query changes
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (query.trim()) {
                setSongs([]); // Clear previous search results
                setPage(0); // Reset to the first page for a new query
            } else {
                setSongs([]); // Clear results if input is empty
                setHasMore(true); // Reset hasMore to true when input is cleared
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn); // Cleanup timeout on unmount or new keystroke
    }, [query]);

    // Fetch songs based on query and page number
    const searchSongs = async (searchQuery, pageNumber) => {
        if (loading) return;  // Prevent duplicate requests

        setLoading(true);  // Set loading to true before fetching data
        setError(null);  // Clear any previous errors

        try {
            const response = await axios.get(`${BASE_URL}/search/${searchQuery}`, {
                params: { page:pageNumber }
            });

            if (response.data.success) {
                if (pageNumber === 0) {
                    setSongs(response.data.songs);  // Set new songs for the first page
                } else {
                    setSongs(prevSongs => [...prevSongs, ...response.data.songs]);  // Append songs for subsequent pages
                }

                // If no more songs are returned, set hasMore to false
                if (response.data.songs.length === 0) {
                    setHasMore(false);
                }
            } else {
                setError('No songs found');
            }
        } catch (err) {
            setError('Error searching for songs');
        } finally {
            setLoading(false);  // Reset loading state
            setIsFetchingMore(false);  // Reset the "fetching more" state
        }
    };

    // Effect to fetch songs when query changes and the page is reset
    useEffect(() => {
        if (query.trim() && page === 0) {
            searchSongs(query, page);  // Fetch results for the first page
        }
    }, [query, page]); // Fetch songs when the query or page changes

    // Infinite scroll handler
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop + 100 >=
                document.documentElement.scrollHeight &&
                hasMore &&
                !isFetchingMore
            ) {
                
                setIsFetchingMore(true);  // Prevent multiple triggers of the next page
                  // Load the next page
                setPage(prevPage => prevPage + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);  // Cleanup on unmount
    }, [hasMore, isFetchingMore]);

    // Effect to fetch more songs when the page changes
    useEffect(() => {
        if (page > 0) {  // Only fetch if page is greater than 0
            searchSongs(query, page);  // Fetch results for the current page
        }
    }, [page]); // Fetch songs when page changes

    return (
        <div className="bg-black min-h-screen text-white">
            <Navbar />
            <div className="pt-24 pb-16 px-4"> {/* Adjusted top padding */}
                <h1 className="text-3xl font-bold mb-6">Search for Songs</h1>

                {/* Search input */}
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)} // Update query on input change
                    placeholder="Search for songs..."
                    className="p-2 rounded-md bg-black text-white w-full border"
                />

                {/* Loading indicator */}
                {loading && page === 0 && <p className="mt-4 text-lg">Loading...</p>} {/* Show loading only for the first page */}

                {/* Error state */}
                {error && <p className="mt-4 text-red-500">{error}</p>}

                {/* Display search results */}
                <div className="space-y-4 mt-6">
                    {songs.length > 0 ? (
                        songs.map((song) => (
                            <div
                                key={song.id}
                                className="flex items-center p-3 bg-[#1F1F1F] rounded-lg shadow-md transition-transform duration-300 transform hover:scale-102 hover:translate-x-4 cursor-pointer"
                                onClick={() => window.location.href = `/player/${song.id}`}  // Redirect to player page with song ID
                            >
                                {/* Song image */}
                                <img
                                    src={song.image}
                                    alt={song.name}
                                    className="w-14 h-14 rounded-lg mr-4"
                                />

                                {/* Song details */}
                                <div>
                                    <h3 className="text-lg font-semibold">{song.name}</h3>
                                    <p className="text-gray-400">Artist: {song.artist}</p>
                                    <p className="text-gray-400">Album: {song.album}</p>
                                </div>
                            </div>
                        ))
                    ) : !loading && !error && query.trim() ? (
                        <p className="text-gray-400">No songs found</p>
                    ) : null}
                </div>

                {/* Show loading when fetching more data */}
                {isFetchingMore && <p className="mt-4 text-lg">Loading more...</p>}
            </div>
            <Footer />
        </div>
    );
};

export default SearchPage;
