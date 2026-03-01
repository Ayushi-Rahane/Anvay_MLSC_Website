import React from 'react';
import HeroSection from '../components/hero/HeroSection';
import CityMap from '../components/city/CityMap';
import Leaderboard from '../components/leaderboard/Leaderboard';
import BadgeLookup from '../components/badge/BadgeLookup';

const Home = () => {
    return (
        <div>
            <HeroSection />
            <CityMap />
            <Leaderboard />
            <BadgeLookup />
        </div>
    );
};

export default Home;
