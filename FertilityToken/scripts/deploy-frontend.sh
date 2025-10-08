#!/bin/bash

# Deploy Frontend (Angular) to Vercel
# This script helps deploy the Angular frontend

echo "🚀 Deploying FertilityToken Frontend"
echo "====================================="

cd frontend-web

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "Vercel CLI not found. Installing..."
    npm install -g vercel
fi

echo ""
echo "📝 Before deploying, make sure you have:"
echo "1. Updated environment variables in src/environments/environment.prod.ts"
echo "2. Built the application successfully"
echo "3. Tested the production build"
echo ""
read -p "Continue with deployment? (y/n): " confirm

if [ "$confirm" != "y" ]; then
    echo "Deployment cancelled"
    exit 0
fi

echo ""
echo "Building Angular application..."
npm run build

echo ""
echo "Deploying to Vercel..."
vercel --prod

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Configure custom domain in Vercel dashboard"
echo "2. Set environment variables in Vercel dashboard"
echo "3. Enable automatic deployments from Git"
echo ""
echo "Environment variables to set in Vercel:"
echo "- NEXT_PUBLIC_API_URL=your_backend_url"
echo ""

cd ..

