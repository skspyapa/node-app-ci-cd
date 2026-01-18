const request = require('supertest');
const app = require('../../app');

describe('Orders API', () => {
  describe('GET /api/orders', () => {
    it('should return all orders', async () => {
      const response = await request(app)
        .get('/api/orders')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('GET /api/orders/:id', () => {
    it('should return an order by ID', async () => {
      const orders = await request(app).get('/api/orders');
      const orderId = orders.body.data[0].id;

      const response = await request(app)
        .get(`/api/orders/${orderId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(orderId);
      expect(response.body.data.status).toBeDefined();
      expect(response.body.data.totalAmount).toBeDefined();
    });

    it('should return 404 for non-existent order', async () => {
      const response = await request(app)
        .get('/api/orders/non-existent-id')
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Order not found');
    });
  });

  describe('GET /api/orders/user/:userId', () => {
    it('should return orders for a user', async () => {
      const users = await request(app).get('/api/users');
      const userId = users.body.data[0].id;

      const response = await request(app)
        .get(`/api/orders/user/${userId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('POST /api/orders', () => {
    it('should create a new order', async () => {
      const users = await request(app).get('/api/users');
      const userId = users.body.data[0].id;

      const newOrder = {
        userId,
        items: [
          { productId: 'prod-1', quantity: 2 },
          { productId: 'prod-2', quantity: 1 }
        ],
        totalAmount: 199.98
      };

      const response = await request(app)
        .post('/api/orders')
        .send(newOrder)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.userId).toBe(userId);
      expect(response.body.data.status).toBe('pending');
      expect(response.body.data.items).toEqual(newOrder.items);
    });

    it('should return 400 for missing required fields', async () => {
      const response = await request(app)
        .post('/api/orders')
        .send({ userId: 'user-1' })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('Missing required fields');
    });

    it('should return 400 if items is not an array', async () => {
      const response = await request(app)
        .post('/api/orders')
        .send({
          userId: 'user-1',
          items: 'not-an-array',
          totalAmount: 100
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('PATCH /api/orders/:id/status', () => {
    it('should update order status', async () => {
      const orders = await request(app).get('/api/orders');
      const orderId = orders.body.data[0].id;

      const response = await request(app)
        .patch(`/api/orders/${orderId}/status`)
        .send({ status: 'confirmed' })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.status).toBe('confirmed');
    });

    it('should return 400 for missing status', async () => {
      const orders = await request(app).get('/api/orders');
      const orderId = orders.body.data[0].id;

      const response = await request(app)
        .patch(`/api/orders/${orderId}/status`)
        .send({})
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    it('should return 404 for non-existent order', async () => {
      const response = await request(app)
        .patch('/api/orders/non-existent-id/status')
        .send({ status: 'shipped' })
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });
});
