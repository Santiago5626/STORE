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
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("No se pudieron obtener los productos.");
        }
        const data = await response.json();
        setProducts(data); // Guardar productos en el estado
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProducts();
  }, []); // Solo se ejecuta una vez cuando se monta el componente

  // Filtrar productos basados en la búsqueda y la categoría seleccionada
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory ? product.category === selectedCategory : true; // Filtrar por categoría seleccionada

    return matchesSearch && matchesCategory; // Retornar productos que coinciden con la búsqueda y la categoría
  });

  return (
    <div className="container mt-5">
      <div className="d-flex align-items-center mb-4">
        <input
          type="text"
          className="form-control me-2 w-50" 
          placeholder="Buscar productos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Actualizar el estado de búsqueda cuando el usuario escribe
        />
        
        <select
          className="form-select w-auto" 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)} // Actualizar el estado de categoría seleccionada
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
