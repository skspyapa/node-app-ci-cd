const express = require('express');
const router = express.Router();
const ecommerceService = require('../services/ecommerceService');

// Get cart for user
router.get('/:userId', (req, res) => {
  try {
    const cart = ecommerceService.getCart(req.params.userId);
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Add item to cart
router.post('/:userId/items', (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    if (!productId || !quantity) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: productId, quantity'
      });
    }

    const product = ecommerceService.getProductById(productId);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    const cart = ecommerceService.addToCart(req.params.userId, productId, quantity);
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Remove item from cart
router.delete('/:userId/items/:productId', (req, res) => {
  try {
    const cart = ecommerceService.removeFromCart(req.params.userId, req.params.productId);
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Clear cart
router.delete('/:userId', (req, res) => {
  try {
    const cart = ecommerceService.clearCart(req.params.userId);
    res.status(200).json({ success: true, data: cart, message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
