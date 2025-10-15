# Project Template

A production-ready Node.js template with Docker and Kubernetes support.

## Quick Start

1. **Development:**
   ```bash
   npm install
   npm start
   ```

2. **Docker Testing:**
   ```bash
   docker build -t APP_NAME .
   docker run -p 3000:3000 -e OPENAI_API_KEY=your_key APP_NAME
   ```

3. **Kubernetes Deployment:**
   ```bash
   kubectl apply -f k8s/
   ```

## Features

- ✅ Docker containerization
- ✅ Kubernetes manifests
- ✅ Security best practices
- ✅ Health checks
- ✅ Non-root user
- ✅ Resource limits

## Setup for New Project

1. **Use this template** to create a new repository
2. **Update placeholders:**
   ```bash
   ./scripts/setup.sh YOUR_PROJECT_NAME
   ```
3. **Add your API keys** to `k8s/secret.yaml`
4. **Start developing!**

## File Structure

```
project-template/
├── Dockerfile              # Container definition
├── docker-compose.yml      # Local development
├── .dockerignore           # Docker ignore file
├── k8s/                    # Kubernetes manifests
│   ├── namespace.yaml
│   ├── secret.yaml
│   ├── configmap.yaml
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── ingress.yaml
│   └── hpa.yaml
├── scripts/
│   ├── setup.sh           # Initialize new project
│   └── deploy.sh          # Deploy to K8s
└── .env.example           # Environment variables template
```