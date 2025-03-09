import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from '../components/ProductList';
import '../components/styles.css';
import { Link } from 'react-router-dom'; 

const Shop = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Definir el estado searchQuery

  return (
    <div className="bg-light">
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <a className="nav-link" href="#">E-Shop</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link to="/shop" className="nav-link">Tienda</Link>
              </li>
              <li className="nav-item"><a className="nav-link" href="#">Acerca de</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Contacto</a></li>
            </ul>
            <div className="d-flex ms-3">
              <a className="nav-link" href="#" aria-hidden="true"><i className="fas fa-search"></i></a>
              <a className="nav-link" href="#" aria-hidden="true"><i className="fas fa-shopping-cart"></i></a>
              <a className="nav-link" href="#" aria-hidden="true"><i className="fas fa-user"></i></a>
            </div>
          </div>
        </div>
      </nav>

      {/* Lista de productos */}
      <section className="py-12 bg-light">
        <ProductList searchQuery={searchQuery} setSearchQuery={setSearchQuery} /> {/* Pasar searchQuery y setSearchQuery a ProductList */}
      </section>

      {/* Sección de boletín */}
      <section className="newsletter bg-primary py-12">
        <div className="container text-center text-white">
          <h2 className="display-4 mb-4">Suscríbete a Nuestro Boletín</h2>
          <p className="lead mb-6">Recibe las últimas actualizaciones sobre nuevos productos y ventas próximas</p>
          <form className="d-flex justify-content-center">
            <input type="email" className="form-control me-2" placeholder="Introduce tu correo electrónico" required />
            <button className="btn btn-light" type="submit">Suscribirse</button>
          </form>
        </div>
      </section>

      {/* Pie de página */}
      <footer className="bg-dark text-white py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 mb-4 mb-lg-0">
              <h3 className="h4">E-Shop</h3>
              <p>Tu tienda todo en uno para las últimas tendencias de moda.</p>
            </div>
            <div className="col-lg-4 mb-4 mb-lg-0">
              <h4>Enlaces rápidos</h4>
              <ul className="list-unstyled">
                <li><a href="#" className="text-white">Inicio</a></li>
                <li><a href="#" className="text-white">Tienda</a></li>
                <li><a href="#" className="text-white">Acerca de</a></li>
                <li><a href="#" className="text-white">Contacto</a></li>
              </ul>
            </div>
            <div className="col-lg-4">
              <h4>Síguenos</h4>
              <ul className="list-unstyled">
                <li><a href="#" className="text-white"><i className="fab fa-facebook"></i> Facebook</a></li>
                <li><a href="#" className="text-white"><i className="fab fa-twitter"></i> Twitter</a></li>
                <li><a href="#" className="text-white"><i className="fab fa-instagram"></i> Instagram</a></li>
                <li><a href="#" className="text-white"><i className="fab fa-pinterest"></i> Pinterest</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Shop;
