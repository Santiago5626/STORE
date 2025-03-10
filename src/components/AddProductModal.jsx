import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddProductModal = ({ show, onHide, onSaveProduct }) => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const apiCategories = await response.json();
        const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
        const localCategories = savedProducts.map(product => product.category);
        const allCategories = [...new Set([...apiCategories, ...localCategories])];
        
        setCategories(allCategories);
        
        if (allCategories.length > 0) {
          setProductCategory(allCategories[0]);
        }
      } catch (error) {
        console.error('Error al cargar las categorías:', error);
        const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
        const localCategories = [...new Set(savedProducts.map(product => product.category))];
        setCategories(localCategories);
        
        if (localCategories.length > 0) {
          setProductCategory(localCategories[0]);
        }
      }
    };

    fetchCategories();
  }, []);

  const handleAddProduct = () => {
    const newProduct = {
      title: productName,
      price: parseFloat(productPrice),
      category: productCategory,
      description: productDescription,
      image: productImage,
    };
    
    const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
    savedProducts.push(newProduct);
    localStorage.setItem('products', JSON.stringify(savedProducts));
    
    onSaveProduct(newProduct);
    onHide();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Agregar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => { e.preventDefault(); handleAddProduct(); }}>
          <Form.Group className="mb-3" controlId="productName">
            <Form.Label>Nombre del Producto</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre del producto"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="productPrice">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              placeholder="Precio del producto"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="productCategory">
            <Form.Label>Categoría</Form.Label>
            <Form.Control
              as="select"
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              required
            >
              {categories.length > 0 ? (
                categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))
              ) : (
                <option value="">No hay categorías disponibles</option>
              )}
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="productDescription">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Descripción del producto"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="productImage">
            <Form.Label>Imagen del Producto</Form.Label>
            <Form.Control
              type="file"
              onChange={handleImageUpload}
              required
            />
            {productImage && (
              <div className="mt-2">
                <p><strong>Archivo seleccionado:</strong> {productImage.name}</p>
                <img src={productImage} alt="Vista previa" className="img-thumbnail mt-2" style={{ width: '100px' }} />
              </div>
            )}
          </Form.Group>

          <Button variant="primary" type="submit">
            Agregar Producto
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddProductModal;
