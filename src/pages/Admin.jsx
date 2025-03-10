import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/styles.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';


const Admin = () => {
  return (
    <div className="bg-light d-flex flex-column min-vh-100">
      <Navbar />
      
      <main className="main-content">
        {/* Panel de Administración */}
      <div className="container py-5">
        <h1 className="mb-4">Panel de Administración</h1>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Gestionar Productos</h5>
                <p className="card-text">Añadir, editar o eliminar productos de la tienda.</p>
                <Link to="/product-management" className="btn btn-primary">Gestionar</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Gestionar Pedidos</h5>
                <p className="card-text">Ver y gestionar los pedidos de los clientes.</p>
                <button className="btn btn-primary">Gestionar</button>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Gestionar Usuarios</h5>
                <p className="card-text">Administrar usuarios y permisos.</p>
                <button className="btn btn-primary">Gestionar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
