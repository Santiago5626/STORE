import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/styles.css';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="bg-light d-flex flex-column min-vh-100">
      <Navbar />
      
      <main className="main-content">
        {/* Sección Principal */}
        <section className="hero bg-white py-12">
          <div className="container d-flex flex-column flex-lg-row align-items-center">
            <div className="col-lg-6 text-center text-lg-start">
              <h1 className="display-4 fw-bold text-dark mb-4">Tu Destino de Compras Online</h1>
              <p className="text-muted mb-4">
                Descubre una experiencia de compra única con los mejores productos al mejor precio. 
                Desde electrónicos hasta artículos para el hogar, encuentra todo lo que necesitas en un solo lugar.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
                <Link to="/shop" className="btn btn-primary btn-lg">Explorar Productos</Link>
                <Link to="/shop" className="btn btn-outline-primary btn-lg">Ver Ofertas</Link>
              </div>
            </div>
            <div className="col-lg-6 mt-4 mt-lg-0 text-center">
              <img src="https://img.freepik.com/free-vector/ecommerce-web-page-concept-illustration_114360-8204.jpg?w=740&t=st=1706651147~exp=1706651747~hmac=d2268716ef6e7c92cc53139c87f8a1e2f7a8c2f4f5c0c5f9f5c0c5f9f5c0c5f9" 
                alt="Concepto de comercio electrónico con ilustración moderna" 
                className="img-fluid rounded shadow-sm"/>
            </div>
          </div>

          {/* Nueva sección de características */}
          <div className="container mt-5 py-5">
            <div className="row g-4">
              <div className="col-md-4 text-center">
                <div className="p-4 bg-white rounded shadow-sm">
                  <i className="fas fa-shipping-fast text-primary mb-3" style={{ fontSize: '2rem' }}></i>
                  <h3 className="h5 mb-3">Envío Rápido</h3>
                  <p className="text-muted mb-0">Entrega garantizada a todo el país en 24-48 horas</p>
                </div>
              </div>
              <div className="col-md-4 text-center">
                <div className="p-4 bg-white rounded shadow-sm">
                  <i className="fas fa-shield-alt text-primary mb-3" style={{ fontSize: '2rem' }}></i>
                  <h3 className="h5 mb-3">Compra Segura</h3>
                  <p className="text-muted mb-0">Pago seguro y protección al comprador garantizada</p>
                </div>
              </div>
              <div className="col-md-4 text-center">
                <div className="p-4 bg-white rounded shadow-sm">
                  <i className="fas fa-headset text-primary mb-3" style={{ fontSize: '2rem' }}></i>
                  <h3 className="h5 mb-3">Soporte 24/7</h3>
                  <p className="text-muted mb-0">Atención al cliente disponible en todo momento</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};
export default Home;
