const request = require('supertest');
const app = require('../app');

describe('Health Check', () => {
  it('should return OK status', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200);

    expect(response.body.status).toBe('OK');
    expect(response.body.timestamp).toBeDefined();
  });
});

describe('Error Handling', () => {
  it('should return 404 for non-existent route', async () => {
    const response = await request(app)
      .get('/api/non-existent')
      .expect(404);

    expect(response.body.error).toBe('Route not found');
  });
});
