const express = require('express');
const router = express.Router();
const ecommerceService = require('../services/ecommerceService');

// Get all users
router.get('/', (req, res) => {
  try {
    const users = ecommerceService.getAllUsers();
    res.status(200).json({
      success: true,
      data: users,
      count: users.length
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get user by ID
router.get('/:id', (req, res) => {
  try {
    const user = ecommerceService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create user
router.post('/', (req, res) => {
  try {
    const { email, name, address } = req.body;
    
    if (!email || !name) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: email, name'
      });
    }

    const existingUser = ecommerceService.getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: 'User with this email already exists'
      });
    }

    const user = ecommerceService.createUser({ email, name, address });
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update user
router.put('/:id', (req, res) => {
  try {
    const user = ecommerceService.updateUser(req.params.id, req.body);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
