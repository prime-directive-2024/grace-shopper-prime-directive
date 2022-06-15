import React from 'react';

import AlbumView from './components/AlbumView';
import Navbar from './components/Navbar';
import Routes from './Routes';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <AlbumView />
    </div>
  );
};

export default App;
