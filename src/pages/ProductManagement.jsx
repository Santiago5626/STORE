import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/styles.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("No se pudieron obtener los productos.");
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
        setError("Error al cargar los productos. Por favor, intente más tarde.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleEdit = (id) => {
    console.log('Editar producto:', id);
    // Implementar lógica de edición
  };

  const handleDelete = (id) => {
    console.log('Eliminar producto:', id);
    // Implementar lógica de eliminación
  };

  const handleAdd = () => {
    console.log('Agregar nuevo producto');
    // Implementar lógica de agregación
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
              onClick={handleAdd}
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
                    <h5 className="card-title text-truncate">{product.title}</h5>
                    <p className="card-text text-muted small mb-2">{product.description}</p>
                    <p className="card-text text-primary fw-bold mb-3">
                      ${product.price.toFixed(2)}
                    </p>
                    <div className="mt-auto d-flex gap-2">
                      <button 
                        className="btn btn-outline-primary flex-grow-1 d-flex align-items-center justify-content-center"
                        onClick={() => handleEdit(product.id)}
                      >
                        <i className="bi bi-pencil me-2"></i>
                        Editar
                      </button>
                      <button 
                        className="btn btn-outline-danger flex-grow-1 d-flex align-items-center justify-content-center"
                        onClick={() => handleDelete(product.id)}
                      >
                        <i className="bi bi-trash me-2"></i>
                        Eliminar
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
    </div>
  );
};

export default ProductManagement;
