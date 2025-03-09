import { Button } from 'react-bootstrap';
import './styles.css';

const ProductCard = ({ product }) => {
  return (
    <div className="card shadow-sm border-light rounded">
      <img
        src={product.image}
        alt={product.title}
        className="card-img-top img-fluid"  // Se eliminó la clase personalizada para la imagen
        style={{ objectFit: 'cover', height: '200px' }}

      />
      <div className="card-body">
        <h5 className="card-title text-truncate">{product.title}</h5> 
        <p className="card-text text-muted">{product.price} USD</p>
        <Button variant="primary" className="w-100 mt-3">
          <span className="material-icons">add_shopping_cart</span> Agregar al carrito
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
