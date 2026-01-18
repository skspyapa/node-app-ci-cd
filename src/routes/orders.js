const express = require('express');
const router = express.Router();
const ecommerceService = require('../services/ecommerceService');

// Get all orders
router.get('/', (req, res) => {
  try {
    const orders = ecommerceService.getAllOrders();
    res.status(200).json({
      success: true,
      data: orders,
      count: orders.length
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get order by ID
router.get('/:id', (req, res) => {
  try {
    const order = ecommerceService.getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get orders by user ID
router.get('/user/:userId', (req, res) => {
  try {
    const orders = ecommerceService.getOrdersByUserId(req.params.userId);
    res.status(200).json({
      success: true,
      data: orders,
      count: orders.length
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create order
router.post('/', (req, res) => {
  try {
    const { userId, items, totalAmount } = req.body;
    
    if (!userId || !items || !Array.isArray(items) || totalAmount === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: userId, items (array), totalAmount'
      });
    }

    const order = ecommerceService.createOrder(userId, items, totalAmount);
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update order status
router.patch('/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({
        success: false,
        error: 'Missing required field: status'
      });
    }

    const order = ecommerceService.updateOrderStatus(req.params.id, status);
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
