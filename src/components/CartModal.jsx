import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { getCart, removeFromCart, updateQuantity, clearCart, getCartTotal } from '../utils/cartUtils';

const CartModal = ({ show, onHide }) => {
const cart = getCart();
const total = getCartTotal();

const handleRemoveItem = (productId) => {
    removeFromCart(productId);
    // Dispatch event to update cart count in navbar
    window.dispatchEvent(new Event('cartUpdated'));
};

const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity >= 1) {
    updateQuantity(productId, newQuantity);
      // Dispatch event to update cart count in navbar
    window.dispatchEvent(new Event('cartUpdated'));
    }
};

const handleClearCart = () => {
    clearCart();
    // Dispatch event to update cart count in navbar
    window.dispatchEvent(new Event('cartUpdated'));
    onHide();
};

return (
<Modal show={show} onHide={onHide} size="lg">
    <Modal.Header closeButton>
        <Modal.Title>Carrito de Compras</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        {cart.length === 0 ? (
        <p className="text-center">Tu carrito está vacío</p>
        ) : (
        <>
            {cart.map((item) => (
            <div key={item.id} className="cart-item d-flex align-items-center mb-3 p-2 border rounded">
                <img 
                src={item.image} 
                alt={item.name} 
                className="cart-item-image me-3"
                style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                />
                <div className="flex-grow-1">
                  <h6 className="mb-0">{item.name}</h6>
                  <p className="text-muted mb-0">Precio: ${item.price}</p>
                </div>
                <div className="d-flex align-items-center">
                  <Button 
                    variant="outline-secondary" 
                    size="sm"
                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </Button>
                  <span className="mx-2">{item.quantity}</span>
                  <Button 
                    variant="outline-secondary" 
                    size="sm"
                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </Button>
                  <Button 
                    variant="outline-danger" 
                    size="sm" 
                    className="ms-3"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </div>
              </div>
            ))}
            <div className="d-flex justify-content-between align-items-center mt-4">
              <h5 className="mb-0">Total: ${total.toFixed(2)}</h5>
              <Button 
                variant="outline-danger" 
                onClick={handleClearCart}
              >
                Limpiar Carrito
              </Button>
            </div>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
        {cart.length > 0 && (
          <Button variant="primary">
            Proceder al Pago
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default CartModal;
