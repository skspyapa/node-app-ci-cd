# Deployment Guide

## 🚀 Deployment Options

This application can be deployed using several methods. Choose based on your infrastructure.

---

## 1. Docker Deployment

### Local Docker

#### Build Image
```bash
docker build -t ecommerce-backend:1.0.0 .
```

#### Run Container
```bash
docker run -d \
  --name ecommerce-backend \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e PORT=3000 \
  ecommerce-backend:1.0.0
```

#### Verify Deployment
```bash
curl http://localhost:3000/health
```

#### View Logs
```bash
docker logs -f ecommerce-backend
```

#### Stop Container
```bash
docker stop ecommerce-backend
docker rm ecommerce-backend
```

---

## 2. Docker Compose Deployment

### Single Machine Deployment

#### Create `docker-compose.yml`
```yaml
version: '3.8'
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: ecommerce-backend
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 5s
    restart: unless-stopped
```

#### Deploy
```bash
docker-compose up -d
```

#### Monitor
```bash
docker-compose logs -f app
```

#### Shutdown
```bash
docker-compose down
```

---

## 3. Kubernetes Deployment

### Create Kubernetes Manifests

#### `deployment.yaml`
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ecommerce-backend
  labels:
    app: ecommerce-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: ecommerce-backend
  template:
    metadata:
      labels:
        app: ecommerce-backend
    spec:
      containers:
      - name: app
        image: docker.io/skspyapa/ecommerce-backend:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: PORT
          value: "3000"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 10
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
        resources:
          requests:
            memory: "256Mi"
            cpu: "100m"
          limits:
            memory: "512Mi"
            cpu: "500m"
```

#### `service.yaml`
```yaml
apiVersion: v1
kind: Service
metadata:
  name: ecommerce-backend-service
spec:
  selector:
    app: ecommerce-backend
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
  type: LoadBalancer
```

#### Deploy to Kubernetes
```bash
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml

# Check deployment
kubectl get deployments
kubectl get services
kubectl get pods

# View logs
kubectl logs -f deployment/ecommerce-backend

# Scale deployment
kubectl scale deployment ecommerce-backend --replicas=5
```

---

## 4. Cloud Platform Deployment

### AWS ECS

```bash
# Push to ECR
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin 123456789.dkr.ecr.us-east-1.amazonaws.com

docker tag ecommerce-backend:latest \
  123456789.dkr.ecr.us-east-1.amazonaws.com/ecommerce-backend:latest

docker push 123456789.dkr.ecr.us-east-1.amazonaws.com/ecommerce-backend:latest

# Create task definition and service
aws ecs create-task-definition --cli-input-json file://task-definition.json
aws ecs create-service --cluster production --service-name ecommerce-backend \
  --task-definition ecommerce-backend --desired-count 3
```

### Heroku

```bash
# Login
heroku login

# Create app
heroku create ecommerce-backend

# Push code
git push heroku main

# View logs
heroku logs --tail

# Scale dynos
heroku ps:scale web=2
```

### Google Cloud Run

```bash
# Build and push
gcloud builds submit --tag gcr.io/PROJECT_ID/ecommerce-backend

# Deploy
gcloud run deploy ecommerce-backend \
  --image gcr.io/PROJECT_ID/ecommerce-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Azure Container Instances

```bash
az container create \
  --resource-group myResourceGroup \
  --name ecommerce-backend \
  --image docker.io/skspyapa/ecommerce-backend:latest \
  --ports 3000 \
  --cpu 1 --memory 1
```

---

## 5. Traditional Server Deployment

### Node.js with PM2

```bash
# Install Node.js and npm
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone repository
git clone <repository-url>
cd node-app-ci-cd

# Install dependencies
npm install

# Install PM2 globally
sudo npm install -g pm2

# Start application
pm2 start src/index.js --name "ecommerce-backend"

# Save startup configuration
pm2 startup
pm2 save

# Monitor
pm2 monit
pm2 logs ecommerce-backend
```

### Nginx Reverse Proxy

```nginx
# /etc/nginx/sites-available/ecommerce-backend
upstream backend {
  server localhost:3000;
}

server {
  listen 80;
  server_name api.example.com;

  location / {
    proxy_pass http://backend;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}
```

### SSL/TLS with Certbot

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot certonly --nginx -d api.example.com
sudo certbot renew --dry-run
```

---

## 6. CI/CD Integration

### Jenkins Pipeline Deployment

The `Jenkinsfile` automates the entire deployment process:

1. **Checkout** - Clone repository
2. **Install** - npm ci
3. **Test** - npm test with coverage
4. **Build** - docker build
5. **Push** - docker push to registry
6. **Deploy** - (Custom deployment step)

### Additional Deployment Step

```groovy
stage('Deploy') {
    when {
        branch 'main'
    }
    steps {
        echo 'Deploying application...'
        script {
            sh '''
                # Example: Deploy to Docker Compose
                ssh user@server "cd /opt/ecommerce && \
                  docker-compose pull && \
                  docker-compose up -d"
            '''
        }
    }
}
```

---

## 7. Environment Configuration

### Production Environment Variables

```env
PORT=3000
NODE_ENV=production
LOG_LEVEL=info
```

### Sensitive Data Management

```bash
# Use AWS Secrets Manager
aws secretsmanager get-secret-value --secret-id ecommerce/prod

# Use HashiCorp Vault
vault kv get secret/ecommerce/prod

# Use GitHub Secrets (for CI/CD)
# Set in repository settings
```

---

## 8. Monitoring & Logging

### Application Monitoring

```bash
# PM2 Monitoring
pm2 monit

# Docker Container Stats
docker stats ecommerce-backend

# Kubernetes Pod Monitoring
kubectl top pods
```

### Logging Solutions

#### ELK Stack
```yaml
# Docker Compose with ELK
version: '3'
services:
  app:
    image: ecommerce-backend:latest
    logging:
      driver: "json-file"
      options:
        labels: "service=ecommerce"
  
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.0.0
  
  kibana:
    image: docker.elastic.co/kibana/kibana:8.0.0
```

#### CloudWatch (AWS)
```javascript
// In your app
const CloudWatch = require('aws-sdk/clients/cloudwatch');
const cloudwatch = new CloudWatch();

cloudwatch.putMetricData({
  Namespace: 'EcommerceBackend',
  MetricData: [{
    MetricName: 'RequestCount',
    Value: 1,
    Unit: 'Count'
  }]
});
```

---

## 9. Backup & Recovery

### Database Backup (when using real DB)
```bash
# MongoDB
mongodump --db ecommerce --out /backups/

# PostgreSQL
pg_dump dbname > backup.sql

# MySQL
mysqldump -u user -p database > backup.sql
```

### Container Image Backup
```bash
# Save Docker image
docker save ecommerce-backend:latest | gzip > backup.tar.gz

# Restore Docker image
gunzip -c backup.tar.gz | docker load
```

---

## 10. Scaling Strategies

### Horizontal Scaling (Multiple Instances)

```docker
# Docker Compose with multiple replicas
version: '3'
services:
  app:
    image: ecommerce-backend:latest
    deploy:
      replicas: 5
```

### Load Balancing

```nginx
upstream backend {
  server app1:3000;
  server app2:3000;
  server app3:3000;
}

server {
  listen 80;
  location / {
    proxy_pass http://backend;
  }
}
```

### Kubernetes HPA (Horizontal Pod Autoscaler)

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: ecommerce-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: ecommerce-backend
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

---

## 11. Troubleshooting Deployment

### Health Check Failed
```bash
# Test health endpoint
curl -v http://localhost:3000/health

# Check container logs
docker logs ecommerce-backend

# Verify port mapping
docker port ecommerce-backend
```

### High Memory Usage
```bash
# Check memory consumption
docker stats

# Increase memory limit
docker run -m 1G ecommerce-backend
```

### Connection Issues
```bash
# Test network connectivity
docker network ls
docker inspect network-name

# Check firewall rules
sudo ufw status
```

---

## 12. Rollback Strategy

### Docker Image Rollback
```bash
# List images
docker image ls

# Use previous image
docker run -p 3000:3000 ecommerce-backend:previous-version
```

### Git Rollback
```bash
# Revert commit
git revert <commit-hash>
git push origin main

# Or reset to previous version
git reset --hard <commit-hash>
git push --force origin main
```

### Kubernetes Rollback
```bash
# View rollout history
kubectl rollout history deployment/ecommerce-backend

# Rollback to previous version
kubectl rollout undo deployment/ecommerce-backend

# Rollback to specific version
kubectl rollout undo deployment/ecommerce-backend --to-revision=2
```

---

## 📋 Pre-Deployment Checklist

- ✅ Run full test suite: `npm test`
- ✅ Code review completed
- ✅ Environment variables configured
- ✅ Secrets configured in deployment system
- ✅ SSL/TLS certificates ready
- ✅ Database migrations completed (if applicable)
- ✅ Backup strategy in place
- ✅ Monitoring and logging configured
- ✅ Health checks verified
- ✅ Load balancing configured
- ✅ Rollback plan documented

---

## 📞 Support

For deployment issues:
1. Check logs: `docker logs` or `kubectl logs`
2. Verify health: `curl /health`
3. Test connectivity: `curl endpoints`
4. Review environment variables
5. Consult cloud provider documentation

---

**Deployment ready! 🎉**
