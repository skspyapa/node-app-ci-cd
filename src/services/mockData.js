const { v4: uuidv4 } = require('uuid');

// Mock data store
let products = [
  {
    id: uuidv4(),
    name: 'Laptop',
    description: 'High-performance laptop',
    price: 999.99,
    stock: 50,
    category: 'Electronics'
  },
  {
    id: uuidv4(),
    name: 'Smartphone',
    description: 'Latest smartphone',
    price: 699.99,
    stock: 100,
    category: 'Electronics'
  },
  {
    id: uuidv4(),
    name: 'Headphones',
    description: 'Wireless headphones',
    price: 149.99,
    stock: 200,
    category: 'Audio'
  }
];

let orders = [
  {
    id: uuidv4(),
    userId: uuidv4(),
    items: [],
    status: 'pending',
    totalAmount: 0,
    createdAt: new Date().toISOString()
  }
];

let users = [
  {
    id: uuidv4(),
    email: 'john@example.com',
    name: 'John Doe',
    address: '123 Main St',
    createdAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    email: 'jane@example.com',
    name: 'Jane Smith',
    address: '456 Oak Ave',
    createdAt: new Date().toISOString()
  }
];

let carts = {};

module.exports = {
  products,
  orders,
  users,
  carts
};
