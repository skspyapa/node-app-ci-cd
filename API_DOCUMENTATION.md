# E-Commerce Backend API

A simple Node.js/Express REST API backend for an e-commerce application with mocked data, comprehensive test coverage, and Docker support.

## Features

- ✅ RESTful API endpoints for Products, Orders, Users, and Shopping Cart
- ✅ Mocked data storage (in-memory)
- ✅ Comprehensive test cases using Jest and Supertest
- ✅ Docker containerization with multi-stage build
- ✅ CI/CD pipeline with Jenkinsfile
- ✅ Error handling and validation
- ✅ Health check endpoint
- ✅ CORS support

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Testing**: Jest, Supertest
- **Containerization**: Docker
- **CI/CD**: Jenkins
- **Package Manager**: npm

## Project Structure

```
node-app-ci-cd/
├── src/
│   ├── __tests__/
│   │   ├── cart.test.js
│   │   ├── health.test.js
│   │   ├── orders.test.js
│   │   ├── products.test.js
│   │   └── users.test.js
│   ├── routes/
│   │   ├── cart.js
│   │   ├── orders.js
│   │   ├── products.js
│   │   └── users.js
│   ├── services/
│   │   ├── ecommerceService.js
│   │   └── mockData.js
│   ├── app.js
│   └── index.js
├── Dockerfile
├── Jenkinsfile
├── docker-compose.yml
├── jest.config.js
├── package.json
├── .env
├── .gitignore
└── .dockerignore
```

## API Endpoints

### Health Check
- `GET /health` - Returns application health status

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID
- `GET /api/orders/user/:userId` - Get orders by user ID
- `POST /api/orders` - Create new order
- `PATCH /api/orders/:id/status` - Update order status

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user

### Cart
- `GET /api/cart/:userId` - Get user cart
- `POST /api/cart/:userId/items` - Add item to cart
- `DELETE /api/cart/:userId/items/:productId` - Remove item from cart
- `DELETE /api/cart/:userId` - Clear cart

## Installation

### Prerequisites
- Node.js 18 or higher
- npm 8 or higher
- Docker (optional, for containerization)

### Local Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd node-app-ci-cd
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment file**
```bash
cp .env .env.local
```

4. **Start the application**
```bash
npm start
```

The API will be available at `http://localhost:3000`

## Development

### Run in development mode with auto-reload
```bash
npm run dev
```

### Run tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm run test:watch
```

### Run linter
```bash
npm run lint
```

## Docker

### Build Docker Image
```bash
docker build -t ecommerce-backend:latest .
```

### Run with Docker
```bash
docker run -p 3000:3000 ecommerce-backend:latest
```

### Run with Docker Compose
```bash
docker-compose up
```

### Stop Docker Compose
```bash
docker-compose down
```

## Testing

The project includes comprehensive test coverage for all API endpoints:

- **Products API**: 6 test suites
- **Users API**: 5 test suites
- **Orders API**: 6 test suites
- **Cart API**: 6 test suites
- **Health Check & Error Handling**: 2 test suites

### Run all tests
```bash
npm test
```

### Run tests with coverage report
```bash
npm test -- --coverage
```

### Run specific test file
```bash
npm test -- products.test.js
```

### View coverage report
```bash
npm test -- --coverage
open coverage/lcov-report/index.html
```

## CI/CD Pipeline

The project includes a Jenkinsfile with the following stages:

1. **Checkout** - Clone repository
2. **Install Dependencies** - npm ci
3. **Lint** - ESLint code quality checks
4. **Unit Tests** - Jest test suite with coverage
5. **Build Docker Image** - Multi-stage Docker build
6. **Push Docker Image** - Push to registry (main branch only)
7. **Security Scan** - npm audit

### Jenkinsfile Parameters
- `IMAGE_TAG` - Docker image tag (default: `latest`)

### Environment Variables
- `DOCKER_REGISTRY` - Docker registry URL
- `DOCKER_IMAGE` - Docker image name
- `NODE_ENV` - Node environment

## Sample Requests

### Create Product
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Monitor",
    "description": "4K Monitor",
    "price": 399.99,
    "stock": 30,
    "category": "Electronics"
  }'
```

### Create User
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "name": "John Doe",
    "address": "123 Main St"
  }'
```

### Create Order
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user-id-here",
    "items": [
      { "productId": "product-id-here", "quantity": 2 }
    ],
    "totalAmount": 799.98
  }'
```

### Add to Cart
```bash
curl -X POST http://localhost:3000/api/cart/user-id/items \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "product-id-here",
    "quantity": 1
  }'
```

## Error Handling

The API includes comprehensive error handling:

- **400 Bad Request** - Missing or invalid request parameters
- **404 Not Found** - Resource not found
- **409 Conflict** - Duplicate resource (e.g., duplicate email)
- **500 Internal Server Error** - Server error

## Configuration

### Environment Variables
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/test/production)

## License

ISC

## Author

skspyapa
