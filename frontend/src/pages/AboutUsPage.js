import React from 'react';
import Navbar from '../components/Navbar'; // Import Navbar
import Footer from '../components/Footer'; // Import Footer

const AboutUsPage = () => {
    return (
        <div className="bg-black min-h-screen text-white">
            <Navbar />
            <div className="pt-24 pb-16 px-4">
                <h1 className="text-3xl font-bold text-center mb-8">About Us</h1>
                <p className="text-lg text-center mb-8">
                    Welcome to our music streaming application <strong>GalaxyTracks</strong>! We are passionate about bringing you the best music experience.
                </p>
                <div className="flex flex-col items-center space-y-8">
                    <div className="bg-[#1F1F1F] p-6 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105">
                        <h2 className="text-2xl font-semibold mb-2">Kuldip Rupsangbhai Parmar</h2>
                        <p className="text-gray-400">
                            Co-Founder & CEO
                        </p>
                        <p className="mt-2">
                            Kuldip is an avid music lover and a visionary entrepreneur. His passion for music and technology drives the mission of our platform.
                        </p>
                    </div>
                    <div className="bg-[#1F1F1F] p-6 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105">
                        <h2 className="text-2xl font-semibold mb-2">Vandit Muniya</h2>
                        <p className="text-gray-400">
                            Co-Founder & CTO
                        </p>
                        <p className="mt-2">
                            Vandit is a tech enthusiast and skilled developer. He is committed to creating a seamless and engaging user experience for all music lovers.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AboutUsPage;
