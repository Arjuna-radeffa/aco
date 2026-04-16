#!/bin/bash
# ACO Platform Deployment Script for Cloudflare Pages
# This script builds and deploys the frontend to aco.tigo.co.id

set -e  # Exit on error

echo ""
echo "========================================"
echo "ACO Platform Deployment Script"
echo "Domain: aco.tigo.co.id"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed!"
    echo "Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

# Check if in aco-frontend directory
if [ ! -f "package.json" ]; then
    echo "[ERROR] package.json not found!"
    echo "Please run this script from the aco-frontend directory"
    exit 1
fi

echo "[1/5] Checking Node.js version..."
NODE_VERSION=$(node --version)
echo "Found: $NODE_VERSION"
echo ""

echo "[2/5] Installing dependencies..."
npm install
echo "[OK] Dependencies installed"
echo ""

echo "[3/5] Building production bundle..."
npm run build
echo "[OK] Production build successful"
echo ""

echo "[4/5] Checking Wrangler CLI..."
if ! command -v wrangler &> /dev/null; then
    echo "[INFO] Installing Wrangler CLI globally..."
    npm install -g wrangler
fi
echo ""

echo "[5/5] Authenticating with Cloudflare..."
echo ""
echo "If this is your first time:"
echo "  - Browser will open to authenticate"
echo "  - Approve the API token access"
echo "  - You'll be redirected back to terminal"
echo ""
wrangler login

echo ""
echo "========================================"
echo "Ready to Deploy!"
echo "========================================"
echo ""
echo "Choose deployment method:"
echo ""
echo "Option A: Deploy using Wrangler CLI"
echo "   Command: wrangler pages deploy dist --project-name aco"
echo ""
echo "Option B: Deploy via Cloudflare Dashboard"
echo "   1. Go to https://dash.cloudflare.com"
echo "   2. Navigate to Pages"
echo "   3. Select 'aco' project"
echo "   4. Upload the 'dist' folder contents"
echo ""
echo "Option C: Git-based CI/CD (Recommended)"
echo "   1. Push code to GitHub"
echo "   2. Connect to Cloudflare Pages via GitHub"
echo "   3. Auto-deploy on push"
echo ""
read -p "Press Enter to continue..."
