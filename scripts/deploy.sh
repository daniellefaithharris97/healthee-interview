#!/bin/bash
# deploy.sh - Deploy to Kubernetes

PROJECT_NAME=$1

if [ -z "$PROJECT_NAME" ]; then
    echo "Usage: ./deploy.sh PROJECT_NAME"
    exit 1
fi

# Build Docker image
docker build -t $PROJECT_NAME:latest .

# Deploy to Kubernetes
kubectl apply -f k8s/

echo "✅ Deployed $PROJECT_NAME to Kubernetes!"
echo "Check status: kubectl get pods -n $PROJECT_NAME-prod"

