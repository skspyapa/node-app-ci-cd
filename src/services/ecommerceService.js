const { v4: uuidv4 } = require('uuid');
const { products, orders, users, carts } = require('./mockData');

// Product operations
const getAllProducts = () => products;

const getProductById = (id) => {
  return products.find(p => p.id === id);
};

const createProduct = (productData) => {
  const newProduct = {
    id: uuidv4(),
    ...productData,
    createdAt: new Date().toISOString()
  };
  products.push(newProduct);
  return newProduct;
};

const updateProduct = (id, updateData) => {
  const product = products.find(p => p.id === id);
  if (!product) return null;
  Object.assign(product, updateData);
  return product;
};

const deleteProduct = (id) => {
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return null;
  return products.splice(index, 1)[0];
};

// Order operations
const getAllOrders = () => orders;

const getOrderById = (id) => {
  return orders.find(o => o.id === id);
};

const getOrdersByUserId = (userId) => {
  return orders.filter(o => o.userId === userId);
};

const createOrder = (userId, items, totalAmount) => {
  const newOrder = {
    id: uuidv4(),
    userId,
    items,
    status: 'pending',
    totalAmount,
    createdAt: new Date().toISOString()
  };
  orders.push(newOrder);
  return newOrder;
};

const updateOrderStatus = (id, status) => {
  const order = orders.find(o => o.id === id);
  if (!order) return null;
  order.status = status;
  return order;
};

// User operations
const getAllUsers = () => users;

const getUserById = (id) => {
  return users.find(u => u.id === id);
};

const getUserByEmail = (email) => {
  return users.find(u => u.email === email);
};

const createUser = (userData) => {
  const newUser = {
    id: uuidv4(),
    ...userData,
    createdAt: new Date().toISOString()
  };
  users.push(newUser);
  return newUser;
};

const updateUser = (id, updateData) => {
  const user = users.find(u => u.id === id);
  if (!user) return null;
  Object.assign(user, updateData);
  return user;
};

// Cart operations
const getCart = (userId) => {
  if (!carts[userId]) {
    carts[userId] = {
      userId,
      items: [],
      createdAt: new Date().toISOString()
    };
  }
  return carts[userId];
};

const addToCart = (userId, productId, quantity) => {
  const cart = getCart(userId);
  const existingItem = cart.items.find(item => item.productId === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }
  return cart;
};

const removeFromCart = (userId, productId) => {
  const cart = getCart(userId);
  cart.items = cart.items.filter(item => item.productId !== productId);
  return cart;
};

const clearCart = (userId) => {
  if (carts[userId]) {
    carts[userId].items = [];
  }
  return carts[userId];
};

module.exports = {
  // Products
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  // Orders
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  createOrder,
  updateOrderStatus,
  // Users
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  // Cart
  getCart,
  addToCart,
  removeFromCart,
  clearCart
};
