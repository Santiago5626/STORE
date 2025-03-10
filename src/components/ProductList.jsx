import { useEffect, useState, useMemo } from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ searchQuery, setSearchQuery }) => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); 
  const [loading, setLoading] = useState(true);

  const uniqueCategories = useMemo(() => {
    const categoriesSet = new Set(products.map(product => product.category));
    return Array.from(categoriesSet);
  }, [products]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const apiProducts = await response.json();
        const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
        const allProducts = [...apiProducts, ...savedProducts];
        setProducts(allProducts);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
        const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
        setProducts(savedProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

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
