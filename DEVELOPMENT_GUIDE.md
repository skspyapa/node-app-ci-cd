# Development Guide

## 🛠️ Development Environment Setup

### Prerequisites
- Node.js 18.0.0 or higher
- npm 8.0.0 or higher
- Git
- Docker (optional)
- Docker Compose (optional)

### Installation

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
cp .env.example .env
```

4. **Verify installation**
```bash
npm --version
node --version
```

---

## 🚀 Running the Application

### Development Mode (with auto-reload)
```bash
npm run dev
```
Server starts at `http://localhost:3000` and auto-reloads on file changes.

### Production Mode
```bash
npm start
```

### Test the Application
```bash
curl http://localhost:3000/health
```

---

## 🧪 Testing

### Run All Tests
```bash
npm test
```

### Run Tests with Coverage Report
```bash
npm test -- --coverage
```

### Watch Mode (Auto-rerun tests on file change)
```bash
npm run test:watch
```

### Run Specific Test File
```bash
npm test -- products.test.js
npm test -- users.test.js
npm test -- orders.test.js
npm test -- cart.test.js
```

### Run Tests with Verbose Output
```bash
npm test -- --verbose
```

### Generate Coverage Report
```bash
npm test -- --coverage
open coverage/lcov-report/index.html
```

---

## 📁 Project Structure Explained

```
src/
├── app.js                    # Express app configuration
├── index.js                  # Server entry point
├── routes/                   # API route handlers
│   ├── products.js          # Products API endpoints
│   ├── users.js             # Users API endpoints
│   ├── orders.js            # Orders API endpoints
│   └── cart.js              # Cart API endpoints
├── services/                # Business logic
│   ├── ecommerceService.js  # Core service functions
│   └── mockData.js          # Mock data storage
└── __tests__/               # Test suites
    ├── products.test.js
    ├── users.test.js
    ├── orders.test.js
    ├── cart.test.js
    └── health.test.js
```

---

## 🔌 API Development

### Adding a New Endpoint

1. **Create route in `src/routes/`**
```javascript
// src/routes/newfeature.js
const express = require('express');
const router = express.Router();
const ecommerceService = require('../services/ecommerceService');

router.get('/', (req, res) => {
  try {
    // Your logic here
    res.status(200).json({ success: true, data: [] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
```

2. **Register route in `src/app.js`**
```javascript
const newFeatureRouter = require('./routes/newfeature');
app.use('/api/newfeature', newFeatureRouter);
```

3. **Write tests in `src/__tests__/newfeature.test.js`**
```javascript
const request = require('supertest');
const app = require('../../app');

describe('New Feature API', () => {
  it('should return data', async () => {
    const response = await request(app)
      .get('/api/newfeature')
      .expect(200);
    
    expect(response.body.success).toBe(true);
  });
});
```

---

## 🔍 Code Quality

### Run Linter
```bash
npm run lint
```

### Fix Linting Issues
```bash
npm run lint -- --fix
```

### Common Code Patterns

#### Error Handling
```javascript
try {
  // Your code
  res.status(200).json({ success: true, data: result });
} catch (error) {
  res.status(500).json({ success: false, error: error.message });
}
```

#### Validation
```javascript
if (!email || !name) {
  return res.status(400).json({
    success: false,
    error: 'Missing required fields: email, name'
  });
}
```

#### Resource Not Found
```javascript
const resource = service.getById(id);
if (!resource) {
  return res.status(404).json({
    success: false,
    error: 'Resource not found'
  });
}
```

---

## 🧩 Service Layer Development

### Adding Service Functions

1. **Add to `src/services/ecommerceService.js`**
```javascript
const myFunction = (param) => {
  // Implementation
  return result;
};

module.exports = {
  // ... existing exports
  myFunction
};
```

2. **Use in routes**
```javascript
const result = ecommerceService.myFunction(param);
```

3. **Test in unit tests**
```javascript
test('should do something', () => {
  const result = service.myFunction(param);
  expect(result).toBeDefined();
});
```

---

## 🐛 Debugging

### Enable Verbose Logging
```javascript
// Add to src/app.js
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
```

### Use Node Inspector
```bash
node --inspect src/index.js
```
Then open `chrome://inspect` in Chrome.

### Debug Tests
```bash
node --inspect-brk node_modules/.bin/jest --runInBand
```

### Console Logging
```javascript
console.log('Variable:', variable);
console.error('Error:', error);
```

---

## 📦 Dependency Management

### Install New Package
```bash
npm install package-name
```

### Install Dev Package
```bash
npm install --save-dev package-name
```

### Update Packages
```bash
npm update
```

### Check for Vulnerabilities
```bash
npm audit
```

### Fix Vulnerabilities
```bash
npm audit fix
```

---

## 🐳 Docker Development

### Build Docker Image
```bash
docker build -t ecommerce-backend:dev .
```

### Run Docker Container
```bash
docker run -p 3000:3000 ecommerce-backend:dev
```

### Run with Docker Compose
```bash
docker-compose up
```

### Stop Docker Compose
```bash
docker-compose down
```

### View Logs
```bash
docker-compose logs -f app
```

### Rebuild Without Cache
```bash
docker-compose down
docker-compose up --build --no-cache
```

---

## 🔄 Git Workflow

### Create Feature Branch
```bash
git checkout -b feature/new-feature
```

### Stage Changes
```bash
git add .
```

### Commit Changes
```bash
git commit -m "feat: add new feature"
```

### Push to Remote
```bash
git push origin feature/new-feature
```

### Create Pull Request
- Use GitHub/GitLab interface
- Request review
- Pass all checks before merge

### Merge to Main
```bash
git checkout main
git pull origin main
git merge feature/new-feature
git push origin main
```

---

## 📝 Commit Message Conventions

Use semantic commit messages:

```
feat: add new feature
fix: fix bug in component
docs: update documentation
test: add test cases
refactor: refactor code
chore: update dependencies
```

Example:
```bash
git commit -m "feat: add product filtering endpoint"
git commit -m "fix: handle null values in cart service"
git commit -m "test: add test cases for orders API"
```

---

## 🚀 Deployment

### Deploy with Docker
```bash
docker build -t ecommerce-backend:latest .
docker tag ecommerce-backend:latest myregistry/ecommerce-backend:latest
docker push myregistry/ecommerce-backend:latest
```

### Deploy with Jenkins
1. Push to main branch
2. Jenkinsfile triggers automatically
3. Pipeline builds and tests
4. Docker image created and pushed
5. Ready for production deployment

---

## 📊 Performance Tips

### Optimize Database Queries (when using real DB)
- Use indexes on frequently queried fields
- Use connection pooling
- Cache frequently accessed data

### Code Optimization
- Use async/await for non-blocking operations
- Minimize nested loops
- Use efficient data structures

### Memory Management
- Clear unused variables
- Use streams for large data
- Implement pagination

---

## 🔐 Security Best Practices

### Input Validation
```javascript
if (!validateInput(data)) {
  return res.status(400).json({ error: 'Invalid input' });
}
```

### Error Messages
- Don't expose internal errors to users
- Log detailed errors internally
- Return generic error messages

### Dependencies
```bash
npm audit
npm update
```

### Environment Variables
- Never commit `.env` file
- Use `.env.example` for documentation
- Rotate secrets regularly

---

## 📚 Resources

### Official Documentation
- [Express.js](https://expressjs.com/)
- [Jest](https://jestjs.io/)
- [Node.js](https://nodejs.org/)
- [Docker](https://docs.docker.com/)

### Learning Resources
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [Jest Testing](https://jestjs.io/docs/getting-started)
- [Express Patterns](https://expressjs.com/en/starter/best-practice-performance.html)

---

## 🆘 Troubleshooting

### Port 3000 Already in Use
```bash
# Find process
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Tests Failing
```bash
# Clear cache
npm test -- --clearCache

# Run in watch mode to debug
npm run test:watch
```

### Docker Build Failures
```bash
# Check Docker version
docker --version

# Clear cache
docker system prune -a

# Rebuild without cache
docker build --no-cache -t ecommerce-backend .
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

---

## 💡 Best Practices

1. **Always write tests** - Add tests when adding features
2. **Follow conventions** - Use semantic commit messages
3. **Use meaningful names** - Variable and function names should be clear
4. **Add comments** - Explain complex logic
5. **Keep functions small** - Single responsibility principle
6. **Handle errors** - Comprehensive error handling
7. **Validate input** - Never trust user input
8. **Use async/await** - More readable than callbacks
9. **Avoid code duplication** - Use helper functions
10. **Regular updates** - Keep dependencies updated

---

**Happy coding! 🚀**
