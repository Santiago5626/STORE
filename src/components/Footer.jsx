import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaPinterest } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white py-4">
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-3 col-md-6">
            <h4 className="mb-3 footer-title">Enlaces Rápidos</h4>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-white text-decoration-none d-inline-block footer-link">Inicio</Link>
              </li>
              <li className="mb-2">
                <Link to="/shop" className="text-white text-decoration-none d-inline-block footer-link">Tienda</Link>
              </li>
              <li className="mb-2">
                <Link to="/shop" className="text-white text-decoration-none d-inline-block footer-link">Ofertas</Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-6">
            <h4 className="mb-3 footer-title">Síguenos</h4>
            <div className="d-flex gap-3 mb-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon bg-white bg-opacity-10 rounded-circle p-2">
                <FaFacebook size={24} className="text-white" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon bg-white bg-opacity-10 rounded-circle p-2">
                <FaTwitter size={24} className="text-white" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon bg-white bg-opacity-10 rounded-circle p-2">
                <FaInstagram size={24} className="text-white" />
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="social-icon bg-white bg-opacity-10 rounded-circle p-2">
                <FaPinterest size={24} className="text-white" />
              </a>
            </div>
            <div>
              <div className="input-group">
                <input type="email" className="form-control bg-white bg-opacity-10 border-0" placeholder="Tu email" />
                <button className="btn btn-primary">Suscribir</button>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-muted mt-4 pt-3 border-top border-secondary">
          <p className="mb-0">&copy; {new Date().getFullYear()} Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
