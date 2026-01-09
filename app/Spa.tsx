'use client';

import React from 'react';
// import { HashRouter, Routes, Route } from 'react-router-dom';
// import HomeV5 from '../pages/HomeV5';
// import NewsPage from '../pages/NewsPage';
// import NewsSinglePage from '../pages/NewsSinglePage'; 
// import TeamPage from '../pages/TeamPage';
// import SchoolPage from '../pages/SchoolPage';
// import ClubPage from '../pages/ClubPage';
// import SponsorsPage from '../pages/SponsorsPage';

const Spa: React.FC = () => {
  return (
    <div className="antialiased">
      {/* 
        Ova komponenta je privremeno onemogućena jer prelazimo na Next.js App Router.
        Stare rute su zamijenjene strukturom u 'app/' mapi.
      */}
      <div className="p-4 text-center text-gray-500">
        SPA Router Disabled (Next.js Migration)
      </div>
    </div>
  );
};

export default Spa;