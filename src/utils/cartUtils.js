// Función para obtener el carrito del localStorage
export const getCart = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

// Función para guardar el carrito en localStorage
export const saveCart = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

// Función para agregar un producto al carrito
export const addToCart = (product) => {
  const cart = getCart();
  const existingProduct = cart.find(item => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
  return cart;
};

// Función para remover un producto del carrito
export const removeFromCart = (productId) => {
  const cart = getCart();
  const updatedCart = cart.filter(item => item.id !== productId);
  saveCart(updatedCart);
  return updatedCart;
};

// Función para actualizar la cantidad de un producto
export const updateQuantity = (productId, quantity) => {
  const cart = getCart();
  const product = cart.find(item => item.id === productId);
  
  if (product) {
    product.quantity = quantity;
    if (quantity <= 0) {
      return removeFromCart(productId);
    }
  }
  
  saveCart(cart);
  return cart;
};

// Función para obtener el total del carrito
export const getCartTotal = () => {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

// Función para limpiar el carrito
export const clearCart = () => {
  localStorage.removeItem('cart');
  return [];
};
