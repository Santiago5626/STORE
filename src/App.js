import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Admin from './pages/Admin';
import ProductManagement from './pages/ProductManagement'; // Importar el nuevo componente

const App = () => {
  return (
    <Routes>
      {/* Ruta principal */}
      <Route path="/" element={<Home />} />

      {/* Ruta para la tienda */}
      <Route path="/shop" element={<Shop />} />

      {/* Ruta para el admin */}
      <Route path="/admin" element={<Admin />} />

      {/* Ruta para la gestión de productos */}
      <Route path="/product-management" element={<ProductManagement />} />
    </Routes>
  );
};

export default App;
