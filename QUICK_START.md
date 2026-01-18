# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start the Server
```bash
npm start
```
Server runs on `http://localhost:3000`

### Step 3: Test an Endpoint
```bash
curl http://localhost:3000/health
```

---

## 📝 Common Tasks

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Run All Tests
```bash
npm test
```

### Run Tests with Coverage Report
```bash
npm test -- --coverage
```

### Build Docker Image
```bash
docker build -t ecommerce-backend .
```

### Run with Docker
```bash
docker run -p 3000:3000 ecommerce-backend
```

### Run with Docker Compose
```bash
docker-compose up
```

---

## 🔌 Try API Endpoints

### Get All Products
```bash
curl http://localhost:3000/api/products
```

### Create a Product
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Monitor",
    "description": "4K Monitor",
    "price": 399.99,
    "stock": 25,
    "category": "Electronics"
  }'
```

### Get All Users
```bash
curl http://localhost:3000/api/users
```

### Create a User
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice@example.com",
    "name": "Alice Johnson",
    "address": "789 Elm Street"
  }'
```

### Add Item to Cart
```bash
curl -X POST http://localhost:3000/api/cart/user-123/items \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "PRODUCT_ID_HERE",
    "quantity": 2
  }'
```

---

## 📚 Project Files Overview

| File | Purpose |
|------|---------|
| `package.json` | Project dependencies and scripts |
| `Dockerfile` | Container image definition |
| `Jenkinsfile` | CI/CD pipeline configuration |
| `docker-compose.yml` | Multi-container orchestration |
| `jest.config.js` | Test configuration |
| `.env` | Environment variables |
| `src/app.js` | Express app configuration |
| `src/routes/` | API endpoint implementations |
| `src/services/` | Business logic and data service |
| `src/__tests__/` | Test suites |

---

## 🧪 Testing Details

### Test Files
- `products.test.js` - 6 test cases
- `users.test.js` - 5 test cases
- `orders.test.js` - 6 test cases
- `cart.test.js` - 6 test cases
- `health.test.js` - 2 test cases

**Total: 25+ test cases**

### Coverage Requirements
- Branches: 70%
- Functions: 70%
- Lines: 70%
- Statements: 70%

---

## 🔄 CI/CD Pipeline

The Jenkinsfile automates:
1. ✅ Dependency installation
2. ✅ Code linting
3. ✅ Test execution
4. ✅ Docker image building
5. ✅ Image push to registry (main branch)
6. ✅ Security scanning

---

## 📖 More Documentation

- [README.md](./README.md) - Project overview and features
- [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - Complete API reference
- [TEST_COVERAGE.md](./TEST_COVERAGE.md) - Detailed test report

---

## 🆘 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000 (macOS/Linux)
lsof -ti:3000 | xargs kill -9

# Windows PowerShell
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Dependencies Installation Failed
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules
npm install
```

### Docker Build Issues
```bash
# Clear Docker cache
docker system prune -a
docker build --no-cache -t ecommerce-backend .
```

### Tests Failing
```bash
# Run with verbose output
npm test -- --verbose

# Run specific test file
npm test -- products.test.js

# Watch mode for debugging
npm run test:watch
```

---

## 📞 Support

For issues or questions, check:
1. Test output - `npm test`
2. Error logs - Check console output
3. Documentation - Read API_DOCUMENTATION.md
4. Code - Check implementation in `src/routes/`

---

**Enjoy! Happy coding! 🎉**
