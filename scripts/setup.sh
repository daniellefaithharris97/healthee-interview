#!/bin/bash
# setup.sh - Initialize new project from template

PROJECT_NAME=$1

if [ -z "$PROJECT_NAME" ]; then
    echo "Usage: ./setup.sh PROJECT_NAME"
    exit 1
fi

# Update placeholders in all files
find . -name "*.yaml" -exec sed -i "s/APP_NAME/$PROJECT_NAME/g" {} \;
find . -name "*.yml" -exec sed -i "s/APP_NAME/$PROJECT_NAME/g" {} \;

echo "✅ Project $PROJECT_NAME setup complete!"
echo "Next steps:"
echo "1. Update k8s/secret.yaml with your API keys"
echo "2. Run: npm install"
echo "3. Run: npm start"

