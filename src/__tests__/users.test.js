const request = require('supertest');
const app = require('../../app');

describe('Users API', () => {
  describe('GET /api/users', () => {
    it('should return all users', async () => {
      const response = await request(app)
        .get('/api/users')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.count).toBeGreaterThan(0);
    });
  });

  describe('GET /api/users/:id', () => {
    it('should return a user by ID', async () => {
      const users = await request(app).get('/api/users');
      const userId = users.body.data[0].id;

      const response = await request(app)
        .get(`/api/users/${userId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(userId);
      expect(response.body.data.email).toBeDefined();
      expect(response.body.data.name).toBeDefined();
    });

    it('should return 404 for non-existent user', async () => {
      const response = await request(app)
        .get('/api/users/non-existent-id')
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('User not found');
    });
  });

  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const newUser = {
        email: 'newuser@example.com',
        name: 'New User',
        address: '789 Pine St'
      };

      const response = await request(app)
        .post('/api/users')
        .send(newUser)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.email).toBe(newUser.email);
      expect(response.body.data.name).toBe(newUser.name);
      expect(response.body.data.createdAt).toBeDefined();
    });

    it('should return 400 for missing required fields', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({ email: 'test@example.com' })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('Missing required fields');
    });

    it('should return 409 for duplicate email', async () => {
      const newUser = {
        email: 'duplicate@example.com',
        name: 'Duplicate User'
      };

      await request(app)
        .post('/api/users')
        .send(newUser)
        .expect(201);

      const response = await request(app)
        .post('/api/users')
        .send(newUser)
        .expect(409);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('already exists');
    });
  });

  describe('PUT /api/users/:id', () => {
    it('should update a user', async () => {
      const users = await request(app).get('/api/users');
      const userId = users.body.data[0].id;

      const response = await request(app)
        .put(`/api/users/${userId}`)
        .send({ address: 'Updated Address' })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.address).toBe('Updated Address');
    });

    it('should return 404 for non-existent user', async () => {
      const response = await request(app)
        .put('/api/users/non-existent-id')
        .send({ name: 'Updated Name' })
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });
});
