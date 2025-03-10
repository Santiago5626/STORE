import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddProductModal = ({ show, onHide, onAddProduct }) => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState(null); // Guardar la URL de la imagen
  const [categories, setCategories] = useState([]); // Lista de categorías

  // Cargar productos desde localStorage y extraer categorías únicas
  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('products')) || []; // Asegúrate de que el localStorage contiene 'products'
    
    const categoriesSet = new Set(savedProducts.map(product => product.category)); // Extraer categorías únicas
    setCategories(Array.from(categoriesSet)); // Convertir el Set en un array

    if (categoriesSet.size > 0) {
      setProductCategory(Array.from(categoriesSet)[0]); // Establecer la primera categoría como predeterminada
    }
  }, []);

  const handleAddProduct = () => {
    const newProduct = {
      title: productName,
      price: parseFloat(productPrice),
      category: productCategory,
      description: productDescription,
      image: productImage, // Aquí ya guardamos la URL de datos de la imagen
    };
    
    // Obtener los productos existentes en localStorage
    const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
    
    // Agregar el nuevo producto al array de productos
    savedProducts.push(newProduct);
    
    // Guardar todos los productos en el localStorage
    localStorage.setItem('products', JSON.stringify(savedProducts));
    
    onAddProduct(newProduct);  // Actualizar el estado en el componente principal
    onHide();  // Cerrar el modal después de agregar el producto
  };

  // Función para manejar la subida de imagen
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductImage(reader.result); // Establecer la URL de datos en el estado
      };
      reader.readAsDataURL(file); // Leer el archivo como una URL de datos
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
