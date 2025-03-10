import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AddProductModal from '../components/AddProductModal';
import ProductCard from '../components/ProductCard';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("No se pudieron obtener los productos.");
        }
        const apiProducts = await response.json();
        const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
        const allProducts = [...apiProducts, ...savedProducts];
        setProducts(allProducts);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
        const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
        if (savedProducts.length > 0) {
          setProducts(savedProducts);
        } else {
          setError("Error al cargar los productos. Por favor, intente más tarde.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSaveProduct = (product) => {
    if (selectedProduct) {
      setProducts(products.map(p => (p.id === product.id ? product : p)));
    } else {
      setProducts([...products, { ...product, id: Date.now() }]);
    }
    setModalOpen(false);
    setSelectedProduct(null);
  };

  const handleDelete = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  if (loading) {
    return (
      <div className="bg-light d-flex flex-column min-vh-100">
        <Navbar />
        <main className="main-content">
          <div className="container py-4 text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-light d-flex flex-column min-vh-100">
        <Navbar />
        <main className="main-content">
          <div className="container py-4">
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-light d-flex flex-column min-vh-100">
      <Navbar />
      <main className="main-content">
        <div className="container py-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="mb-0">Gestión de Productos</h1>
              <p className="text-muted mb-0">Administra el catálogo de productos</p>
            </div>
            <button 
              className="btn btn-primary d-flex align-items-center"
              onClick={() => { setModalOpen(true); setSelectedProduct(null); }}
            >
              <i className="bi bi-plus-circle me-2"></i>
              Agregar Producto
            </button>
          </div>

          <div className="row g-4">
            {products.map(product => (
              <div key={product.id} className="col-12 col-md-6 col-lg-4">
                <ProductCard 
                  product={product}
                  isManagementView={true}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />

      <AddProductModal 
        show={isModalOpen} 
        onHide={() => setModalOpen(false)} 
        onSaveProduct={handleSaveProduct} 
        productToEdit={selectedProduct} 
      />
    </div>
  );
};

export default ProductManagement;
