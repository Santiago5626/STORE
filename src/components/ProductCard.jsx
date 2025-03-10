import { Button } from 'react-bootstrap';
import { addToCart, getCart } from '../utils/cartUtils';
import { useState } from 'react';
import './styles.css';

const ProductCard = ({ product, isManagementView, onEdit, onDelete }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const MAX_DESCRIPTION_LENGTH = 100;

  const truncatedDescription = product.description?.length > MAX_DESCRIPTION_LENGTH 
    ? `${product.description.substring(0, MAX_DESCRIPTION_LENGTH)}...` 
    : product.description;

  const handleAddToCart = () => {
    const cartItems = getCart();
    const productIndex = cartItems.findIndex(item => item.id === product.id);

    if (productIndex === -1) {
      cartItems.push({ ...product, quantity: 1 });
    } else {
      cartItems[productIndex].quantity += 1;
    }

    localStorage.setItem('cart', JSON.stringify(cartItems));
    window.dispatchEvent(new Event('cartUpdated'));

    console.log('%cResumen del carrito:', 'color: #007bff; font-weight: bold');
    console.table(cartItems.map(item => ({
      Producto: item.title,
      Precio: `$${item.price.toFixed(2)} USD`,
      Cantidad: item.quantity,
      Subtotal: `$${(item.price * item.quantity).toFixed(2)} USD`
    })));

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    console.log('%cTotal del carrito: $' + total.toFixed(2) + ' USD', 
      'color: #17a2b8; font-weight: bold; font-size: 14px');
  };

  return (
    <div className="product-card">
      <div className="position-relative">
        <img
          src={product.image || 'default-image-url.jpg'}
          alt={product.title}
          className="card-img-top product-card-image"
        />
        <span className="badge bg-primary product-card-category">
          {product.category}
        </span>
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-truncate">{product.title}</h5>
        <div className="description-container mb-3">
          <p className="card-text description-text mb-1">
            {showFullDescription ? product.description : truncatedDescription}
          </p>
          {product.description?.length > MAX_DESCRIPTION_LENGTH && (
            <button 
              className="btn btn-link btn-sm p-0 text-primary"
              onClick={() => setShowFullDescription(!showFullDescription)}
            >
              {showFullDescription ? 'Ver menos' : 'Ver más'}
            </button>
          )}
        </div>
        <p className="card-text product-card-price mt-auto">${product.price.toFixed(2)} USD</p>
        
        {isManagementView ? (
          <div className="d-flex flex-column gap-2">
            <Button 
              variant="outline-primary"
              className="w-100"
              onClick={() => onEdit(product)}
            >
              <i className="bi bi-pencil"></i> Editar
            </Button>
            <Button 
              variant="outline-danger"
              className="w-100"
              onClick={() => onDelete(product.id)}
            >
              <i className="bi bi-trash"></i> Eliminar
            </Button>
          </div>
        ) : (
          <Button 
            variant="primary" 
            className="product-card-button"
            onClick={handleAddToCart}
          >
            <span className="material-icons">add_shopping_cart</span>
            Agregar al carrito
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
