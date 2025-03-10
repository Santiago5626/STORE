import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AddProductModal from '../components/AddProductModal';



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
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
        setError("Error al cargar los productos. Por favor, intente más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Agregar producto nuevo o actualizar existente
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

  // Manejar edición de producto
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
                <div className="card h-100 shadow-sm">
                  <div className="position-relative">
                    <img 
                      src={product.image} 
                      className="card-img-top p-3"
                      style={{ height: '180px', objectFit: 'contain', backgroundColor: '#f8f9fa' }}
                      alt={product.title}
                    />
                    <span className="position-absolute top-0 end-0 badge bg-primary m-3">
                      {product.category}
                    </span>
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.title}</h5>
                    <p 
                      className="card-text text-muted small mb-2"
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3, 
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        
                      }}
                    >
                      {product.description}
                    </p>
                    <p className="card-text text-primary fw-bold mb-3">
                      ${product.price.toFixed(2)}
                    </p>
                    <div className="d-flex flex-column gap-2">
                      <button 
                        className="btn btn-outline-primary w-100"
                        onClick={() => handleEdit(product)}
                      >
                        <i className="bi bi-pencil"></i> Editar
                      </button>
                      <button 
                        className="btn btn-outline-danger w-100"
                        onClick={() => handleDelete(product.id)}
                      >
                        <i className="bi bi-trash"></i> Eliminar
                      </button>
                    </div>
                  </div>
                </div>
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
