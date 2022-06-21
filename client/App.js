/** @format */

import React from 'react';

import Navbar from './components/Navbar';
import Routes from './Routes';

const App = () => {
  if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
  }
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  );
};

export default App;
