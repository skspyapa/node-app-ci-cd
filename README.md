# E-Commerce Backend API - CI/CD Demo

A production-ready Node.js e-commerce backend application demonstrating modern CI/CD practices with comprehensive testing, containerization, and automated deployment.

## 🎯 Overview

This project showcases:
- **RESTful API** with mocked e-commerce data (Products, Orders, Users, Cart)
- **Comprehensive Testing** with 25+ test cases achieving 70%+ code coverage
- **Containerization** with multi-stage Docker builds
- **CI/CD Pipeline** using Jenkins for automated build, test, and deployment
- **Production-Ready** with health checks, error handling, and security scans

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm 8+
- Docker (optional)

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Run with coverage
npm test -- --coverage
```

Server starts at `http://localhost:3000`

### Docker
```bash
# Build and run with Docker
docker-compose up

# Or build manually
docker build -t ecommerce-backend .
docker run -p 3000:3000 ecommerce-backend
```

## 📁 Project Structure

```
src/
├── __tests__/              # Test suites
│   ├── cart.test.js       # Cart API tests (6 tests)
│   ├── orders.test.js     # Orders API tests (6 tests)
│   ├── products.test.js   # Products API tests (6 tests)
│   ├── users.test.js      # Users API tests (5 tests)
│   └── health.test.js     # Health & error tests (2 tests)
├── routes/                # API endpoints
│   ├── cart.js
│   ├── orders.js
│   ├── products.js
│   └── users.js
├── services/              # Business logic
│   ├── ecommerceService.js
│   └── mockData.js
├── app.js                 # Express app setup
└── index.js              # Server entry point
```

## 🔌 API Endpoints

### Health
- `GET /health` - Application status

### Products
- `GET /api/products` - List all
- `GET /api/products/:id` - Get by ID
- `POST /api/products` - Create
- `PUT /api/products/:id` - Update
- `DELETE /api/products/:id` - Delete

### Users
- `GET /api/users` - List all
- `GET /api/users/:id` - Get by ID
- `POST /api/users` - Create
- `PUT /api/users/:id` - Update

### Orders
- `GET /api/orders` - List all
- `GET /api/orders/:id` - Get by ID
- `GET /api/orders/user/:userId` - Get by user
- `POST /api/orders` - Create
- `PATCH /api/orders/:id/status` - Update status

### Cart
- `GET /api/cart/:userId` - Get cart
- `POST /api/cart/:userId/items` - Add item
- `DELETE /api/cart/:userId/items/:productId` - Remove item
- `DELETE /api/cart/:userId` - Clear cart

## ✅ Testing

**Test Coverage**: 25+ test cases across 5 test suites

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# With coverage
npm test -- --coverage
```

### Test Suites
- ✅ Products API (6 tests)
- ✅ Users API (5 tests)
- ✅ Orders API (6 tests)
- ✅ Cart API (6 tests)
- ✅ Health & Error Handling (2 tests)

## 🐳 Docker & Deployment

### Multi-Stage Build
The Dockerfile uses a multi-stage build to:
1. Build stage: Install dependencies
2. Runtime stage: Copy only production dependencies

### Docker Compose
```bash
docker-compose up
docker-compose down
```

### Health Check
Container includes built-in health check that monitors `/health` endpoint every 30 seconds.

## 🔄 CI/CD Pipeline (Jenkins)

### Pipeline Stages
1. **Checkout** - Clone repository
2. **Install Dependencies** - npm ci
3. **Lint** - ESLint checks
4. **Unit Tests** - Jest with coverage
5. **Build Docker Image** - Multi-stage build
6. **Push Image** - To Docker registry (main branch)
7. **Security Scan** - npm audit

### Jenkins Configuration
```groovy
Parameters:
  - IMAGE_TAG (default: 'latest')

Environment:
  - DOCKER_REGISTRY: docker.io
  - NODE_ENV: test
```

## 📊 Code Quality

- **Coverage Threshold**: 70% (branches, functions, lines, statements)
- **Linting**: ESLint
- **Security**: npm audit
- **Tests**: Jest + Supertest

## 🛠️ Development

### Available Scripts
```bash
npm start          # Production start
npm run dev        # Development with nodemon
npm test           # Run tests with coverage
npm run test:watch # Watch mode
npm run lint       # Run ESLint
```

### Environment Variables
```
PORT=3000
NODE_ENV=development
```

## 📝 Sample API Calls

### Create Product
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "price": 999.99,
    "stock": 50,
    "category": "Electronics"
  }'
```

### Create User
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "name": "John Doe"
  }'
```

### Add to Cart
```bash
curl -X POST http://localhost:3000/api/cart/user-123/items \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "prod-456",
    "quantity": 2
  }'
```

## 📚 Documentation

- [API Documentation](./API_DOCUMENTATION.md) - Detailed API reference
- [Jenkinsfile](./Jenkinsfile) - CI/CD pipeline configuration
- [Dockerfile](./Dockerfile) - Container configuration

## 🔒 Security

- Input validation on all endpoints
- Error handling without sensitive data exposure
- npm audit for dependency vulnerabilities
- Docker security best practices

## 📦 Dependencies

**Production**
- express: Web framework
- uuid: ID generation
- cors: Cross-origin support
- dotenv: Environment variables

**Development**
- jest: Testing framework
- supertest: HTTP assertion
- nodemon: Development reload
- eslint: Code linting

## 📄 License

ISC

---

**For detailed API documentation, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)**
