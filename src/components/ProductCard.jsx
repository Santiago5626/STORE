import { Button } from 'react-bootstrap';
import { addToCart, getCart } from '../utils/cartUtils';
import './styles.css';

const ProductCard = ({ product }) => {
  const handleAddToCart = () => {
    const updatedCart = addToCart(product);
    
    // Mostrar información del producto agregado
    console.log('%cProducto agregado al carrito:', 'color: #28a745; font-weight: bold');
    console.table({
      Título: product.title,
      Precio: `$${product.price.toFixed(2)} USD`,
      Categoría: product.category,
      Cantidad: 1
    });

    // Mostrar resumen del carrito
    const cartItems = JSON.parse(localStorage.getItem('cart'));
    console.log('%cResumen del carrito:', 'color: #007bff; font-weight: bold');
    console.table(cartItems.map(item => ({
      Producto: item.title,
      Precio: `$${item.price.toFixed(2)} USD`,
      Cantidad: item.quantity,
      Subtotal: `$${(item.price * item.quantity).toFixed(2)} USD`
    })));

    // Mostrar total
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    console.log('%cTotal del carrito: $' + total.toFixed(2) + ' USD', 
      'color: #17a2b8; font-weight: bold; font-size: 14px');

    // Disparar evento para actualizar el contador del carrito
    window.dispatchEvent(new Event('cartUpdated'));
  };

  return (
    <div className="product-card">
      <div className="position-relative">
        <img
          src={product.image}
          alt={product.title}
          className="card-img-top product-card-image"
        />
        <span className="badge bg-primary product-card-category">
          {product.category}
        </span>
      </div>
      <div className="card-body">
        <h5 className="card-title text-truncate">{product.title}</h5> 
        <p className="card-text product-card-price">${product.price.toFixed(2)} USD</p>
        <Button 
          variant="primary" 
          className="product-card-button"
          onClick={handleAddToCart}
        >
          <span className="material-icons">add_shopping_cart</span>
          Agregar al carrito
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
