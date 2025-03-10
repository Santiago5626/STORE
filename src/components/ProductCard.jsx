import { Button } from 'react-bootstrap';
import { addToCart, getCart } from '../utils/cartUtils';
import './styles.css';

const ProductCard = ({ product }) => {

  // Función para agregar el producto al carrito
  const handleAddToCart = () => {
    const cartItems = getCart(); // Obtener carrito actual desde localStorage
    const productIndex = cartItems.findIndex(item => item.id === product.id);

    if (productIndex === -1) {
      // Si el producto no está en el carrito, agregarlo con cantidad 1
      cartItems.push({ ...product, quantity: 1 });
    } else {
      // Si el producto ya está en el carrito, incrementar la cantidad
      cartItems[productIndex].quantity += 1;
    }

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));

    // Disparar evento para actualizar el contador del carrito
    window.dispatchEvent(new Event('cartUpdated'));

    // Mostrar el resumen del carrito en consola
    console.log('%cResumen del carrito:', 'color: #007bff; font-weight: bold');
    console.table(cartItems.map(item => ({
      Producto: item.title,
      Precio: `$${item.price.toFixed(2)} USD`,
      Cantidad: item.quantity,
      Subtotal: `$${(item.price * item.quantity).toFixed(2)} USD`
    })));

    // Mostrar total del carrito en consola
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    console.log('%cTotal del carrito: $' + total.toFixed(2) + ' USD', 
      'color: #17a2b8; font-weight: bold; font-size: 14px');
  };

  return (
    <div className="product-card">
      <div className="position-relative">
        <img
          src={product.image || 'default-image-url.jpg'}  // Usar imagen por defecto si no se encuentra imagen
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
