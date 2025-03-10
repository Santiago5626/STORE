import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from '../components/ProductList';
import '../components/styles.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Shop = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="bg-light d-flex flex-column min-vh-100">
      <Navbar />
      
      <main className="main-content">
        {/* Lista de productos */}
        <section className="py-12 bg-light">
          <ProductList searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Shop;
