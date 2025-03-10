import { useEffect, useState, useMemo } from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ searchQuery, setSearchQuery }) => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); 

  const uniqueCategories = useMemo(() => {
    const categoriesSet = new Set(products.map(product => product.category));
    return Array.from(categoriesSet);
  }, [products]);

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(savedProducts); // Mostrar los productos guardados en el localStorage
  }, []); // Solo se ejecuta una vez cuando se monta el componente

  // Filtrar productos basados en la búsqueda y la categoría seleccionada
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mt-5">
      <div className="d-flex align-items-center mb-4">
        <input
          type="text"
          className="form-control me-2 w-50" 
          placeholder="Buscar productos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
        
        <select
          className="form-select w-auto" 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)} 
        >
          <option value="">Todas las categorías</option>
          {uniqueCategories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Mostrar productos filtrados */}
      <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
        {filteredProducts.map((product) => (
          <div className="col" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
