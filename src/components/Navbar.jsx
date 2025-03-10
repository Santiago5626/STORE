import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCart } from '../utils/cartUtils';
import CartModal from './CartModal';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const updateCartCount = () => {
      const cart = getCart();
      const count = cart.reduce((total, item) => total + item.quantity, 0);
      setCartCount(count);
    };

    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  const handleUserTypeSelect = (type) => {
    if (type === 'admin') {
      navigate('/admin');
    } else {
      navigate('/');
    }
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        <a className="navbar-brand" href="#">E-Shop</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link to="/shop" className="nav-link">Productos</Link>
            </li>
            <li className="nav-item dropdown">
              <ul className="dropdown-menu">
                <li><Link to="/shop" className="dropdown-item">Electrónicos</Link></li>
                <li><Link to="/shop" className="dropdown-item">Hogar</Link></li>
                <li><Link to="/shop" className="dropdown-item">Deportes</Link></li>
                <li><Link to="/shop" className="dropdown-item">Tecnología</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to="/shop" className="nav-link">Ofertas</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Ayuda</a>
            </li>
          </ul>
          <div className="d-flex ms-3">
            <a className="nav-link" href="#"><i className="fas fa-search"></i></a>
            <div className="position-relative d-inline-block">
              <a 
                className="nav-link" 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  setShowCartModal(true);
                }}
              >
                <i className="fas fa-shopping-cart cart-icon"></i>
                {cartCount > 0 && (
                  <span className="position-absolute top-0 end-0 translate-middle badge rounded-pill bg-primary cart-badge">
                    {cartCount}
                  </span>
                )}
              </a>
              <CartModal 
                show={showCartModal} 
                onHide={() => setShowCartModal(false)} 
              />
            </div>
            <div className="position-relative" ref={dropdownRef}>
              <a 
                className="nav-link" 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  setShowDropdown(!showDropdown);
                }}
              >
                <i className="fas fa-user"></i>
              </a>
              {showDropdown && (
                <div 
                className="position-absolute bg-white shadow rounded p-2" 
                style={{ right: 0, top: '100%', width: '130px', zIndex: 1000 }}
              >
                <button 
                  className="btn btn-light btn-sm w-100 text-start" 
                  onClick={() => handleUserTypeSelect('admin')}
                >
                  Admin
                </button>
                <button 
                  className="btn btn-light btn-sm w-100 text-start mt-1" 
                  onClick={() => handleUserTypeSelect('invitado')}
                >
                  Invitado
                </button>
              </div>
              
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
