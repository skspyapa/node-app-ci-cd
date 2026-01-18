const express = require('express');
const router = express.Router();
const ecommerceService = require('../services/ecommerceService');

// Get all products
router.get('/', (req, res) => {
  try {
    const products = ecommerceService.getAllProducts();
    res.status(200).json({
      success: true,
      data: products,
      count: products.length
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get product by ID
router.get('/:id', (req, res) => {
  try {
    const product = ecommerceService.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create product
router.post('/', (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;
    
    if (!name || !price || stock === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, price, stock'
      });
    }

    const product = ecommerceService.createProduct({
      name,
      description,
      price,
      stock,
      category
    });
    
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update product
router.put('/:id', (req, res) => {
  try {
    const product = ecommerceService.updateProduct(req.params.id, req.body);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete product
router.delete('/:id', (req, res) => {
  try {
    const product = ecommerceService.deleteProduct(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    res.status(200).json({ success: true, message: 'Product deleted', data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
