const request = require('supertest');
const app = require('../../app');

describe('Products API', () => {
  describe('GET /api/products', () => {
    it('should return all products', async () => {
      const response = await request(app)
        .get('/api/products')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.count).toBeGreaterThan(0);
    });
  });

  describe('GET /api/products/:id', () => {
    it('should return a product by ID', async () => {
      const products = await request(app).get('/api/products');
      const productId = products.body.data[0].id;

      const response = await request(app)
        .get(`/api/products/${productId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(productId);
      expect(response.body.data.name).toBeDefined();
      expect(response.body.data.price).toBeDefined();
    });

    it('should return 404 for non-existent product', async () => {
      const response = await request(app)
        .get('/api/products/non-existent-id')
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Product not found');
    });
  });

  describe('POST /api/products', () => {
    it('should create a new product', async () => {
      const newProduct = {
        name: 'Test Product',
        description: 'A test product',
        price: 99.99,
        stock: 10,
        category: 'Test'
      };

      const response = await request(app)
        .post('/api/products')
        .send(newProduct)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.name).toBe(newProduct.name);
      expect(response.body.data.price).toBe(newProduct.price);
    });

    it('should return 400 for missing required fields', async () => {
      const response = await request(app)
        .post('/api/products')
        .send({ name: 'Test' })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('Missing required fields');
    });
  });

  describe('PUT /api/products/:id', () => {
    it('should update a product', async () => {
      const products = await request(app).get('/api/products');
      const productId = products.body.data[0].id;

      const response = await request(app)
        .put(`/api/products/${productId}`)
        .send({ price: 199.99 })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.price).toBe(199.99);
    });

    it('should return 404 for non-existent product', async () => {
      const response = await request(app)
        .put('/api/products/non-existent-id')
        .send({ price: 99.99 })
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });

  describe('DELETE /api/products/:id', () => {
    it('should delete a product', async () => {
      const newProduct = {
        name: 'Product to Delete',
        description: 'Delete test',
        price: 49.99,
        stock: 5,
        category: 'Test'
      };

      const createResponse = await request(app)
        .post('/api/products')
        .send(newProduct);

      const productId = createResponse.body.data.id;

      const response = await request(app)
        .delete(`/api/products/${productId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Product deleted');
    });

    it('should return 404 when deleting non-existent product', async () => {
      const response = await request(app)
        .delete('/api/products/non-existent-id')
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });
});
