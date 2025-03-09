import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';

const App = () => {
  return (
    <Routes>
      {/* Ruta principal */}
      <Route path="/" element={<Home />} />

      {/* Ruta para la tienda */}
      <Route path="/shop" element={<Shop />} />
    </Routes>
  );
};

export default App;
