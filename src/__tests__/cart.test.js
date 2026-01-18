const request = require('supertest');
const app = require('../../app');

describe('Cart API', () => {
  describe('GET /api/cart/:userId', () => {
    it('should return cart for a user', async () => {
      const userId = 'test-user-123';

      const response = await request(app)
        .get(`/api/cart/${userId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.userId).toBe(userId);
      expect(Array.isArray(response.body.data.items)).toBe(true);
    });
  });

  describe('POST /api/cart/:userId/items', () => {
    it('should add item to cart', async () => {
      const products = await request(app).get('/api/products');
      const productId = products.body.data[0].id;
      const userId = 'test-user-456';

      const response = await request(app)
        .post(`/api/cart/${userId}/items`)
        .send({ productId, quantity: 2 })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.items).toHaveLength(1);
      expect(response.body.data.items[0].productId).toBe(productId);
      expect(response.body.data.items[0].quantity).toBe(2);
    });

    it('should increase quantity if item already in cart', async () => {
      const products = await request(app).get('/api/products');
      const productId = products.body.data[0].id;
      const userId = 'test-user-789';

      await request(app)
        .post(`/api/cart/${userId}/items`)
        .send({ productId, quantity: 1 });

      const response = await request(app)
        .post(`/api/cart/${userId}/items`)
        .send({ productId, quantity: 2 })
        .expect(200);

      expect(response.body.data.items[0].quantity).toBe(3);
    });

    it('should return 400 for missing required fields', async () => {
      const response = await request(app)
        .post('/api/cart/test-user/items')
        .send({ productId: 'prod-1' })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('Missing required fields');
    });

    it('should return 404 for non-existent product', async () => {
      const response = await request(app)
        .post('/api/cart/test-user/items')
        .send({ productId: 'non-existent-product', quantity: 1 })
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Product not found');
    });
  });

  describe('DELETE /api/cart/:userId/items/:productId', () => {
    it('should remove item from cart', async () => {
      const products = await request(app).get('/api/products');
      const productId = products.body.data[0].id;
      const userId = 'test-user-delete';

      await request(app)
        .post(`/api/cart/${userId}/items`)
        .send({ productId, quantity: 1 });

      const response = await request(app)
        .delete(`/api/cart/${userId}/items/${productId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.items).toHaveLength(0);
    });
  });

  describe('DELETE /api/cart/:userId', () => {
    it('should clear cart', async () => {
      const products = await request(app).get('/api/products');
      const productId = products.body.data[0].id;
      const userId = 'test-user-clear';

      await request(app)
        .post(`/api/cart/${userId}/items`)
        .send({ productId, quantity: 1 });

      const response = await request(app)
        .delete(`/api/cart/${userId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Cart cleared');
      expect(response.body.data.items).toHaveLength(0);
    });
  });
});
