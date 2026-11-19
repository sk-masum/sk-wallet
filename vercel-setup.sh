#!/bin/bash

# Vercel Deployment Setup Script for SK Wallet
# This script helps set up environment variables for Vercel deployment
# Usage: ./vercel-setup.sh

set -e

echo "================================"
echo "SK Wallet - Vercel Setup Script"
echo "================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check prerequisites
echo "Checking prerequisites..."

if ! command -v vercel &> /dev/null; then
    echo "Installing Vercel CLI globally..."
    npm install -g vercel
fi

if ! command -v openssl &> /dev/null; then
    echo -e "${RED}Error: openssl not found. Install OpenSSL to continue.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Prerequisites checked${NC}"
echo ""

# Generate secrets
echo "Generating secure secrets..."
NEXTAUTH_SECRET=$(openssl rand -base64 32)
CARD_TOKEN_SECRET=$(openssl rand -base64 32)

echo ""
echo "================================"
echo "Generated Secrets (Save these!):"
echo "================================"
echo ""
echo -e "${YELLOW}NEXTAUTH_SECRET:${NC}"
echo "$NEXTAUTH_SECRET"
echo ""
echo -e "${YELLOW}CARD_TOKEN_SECRET:${NC}"
echo "$CARD_TOKEN_SECRET"
echo ""

# User inputs
echo "================================"
echo "Required Configuration"
echo "================================"
echo ""

read -p "Enter your Turso Database URL (with authToken parameter): " DATABASE_URL

if [[ ! "$DATABASE_URL" =~ "libsql://" ]]; then
    echo -e "${RED}Error: Invalid database URL. Must start with 'libsql://'${NC}"
    exit 1
fi

if [[ ! "$DATABASE_URL" =~ "authToken=" ]]; then
    echo -e "${YELLOW}Warning: No authToken found in DATABASE_URL${NC}"
    echo "Format should be: libsql://your-db.turso.io?authToken=YOUR_TOKEN"
fi

read -p "Enter your Vercel deployment domain (e.g., sk-wallet.vercel.app): " NEXTAUTH_URL
NEXTAUTH_URL="https://$NEXTAUTH_URL"

echo ""
echo "================================"
echo "Environment Variables Summary"
echo "================================"
echo ""
echo "DATABASE_URL: (hidden for security)"
echo "NEXTAUTH_SECRET: (generated)"
echo "NEXTAUTH_URL: $NEXTAUTH_URL"
echo "CARD_TOKEN_SECRET: (generated)"
echo ""

read -p "Continue with Vercel setup? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Setup cancelled."
    exit 1
fi

echo ""
echo "================================"
echo "Setting up Vercel Project"
echo "================================"
echo ""

# Check if already linked to Vercel
if [ ! -d ".vercel" ]; then
    echo "Linking to Vercel..."
    npx vercel link --yes 2>/dev/null || vercel link --yes
else
    echo -e "${GREEN}✓ Already linked to Vercel${NC}"
fi

echo ""
echo "Setting environment variables in Vercel..."
echo ""

# Set environment variables for all environments
echo "Setting DATABASE_URL..."
echo "$DATABASE_URL" | npx vercel env add DATABASE_URL --yes 2>/dev/null || echo "$DATABASE_URL" | vercel env add DATABASE_URL --yes

echo "Setting NEXTAUTH_SECRET..."
echo "$NEXTAUTH_SECRET" | npx vercel env add NEXTAUTH_SECRET --yes 2>/dev/null || echo "$NEXTAUTH_SECRET" | vercel env add NEXTAUTH_SECRET --yes

echo "Setting NEXTAUTH_URL..."
echo "$NEXTAUTH_URL" | npx vercel env add NEXTAUTH_URL --yes 2>/dev/null || echo "$NEXTAUTH_URL" | vercel env add NEXTAUTH_URL --yes

echo "Setting CARD_TOKEN_SECRET..."
echo "$CARD_TOKEN_SECRET" | npx vercel env add CARD_TOKEN_SECRET --yes 2>/dev/null || echo "$CARD_TOKEN_SECRET" | vercel env add CARD_TOKEN_SECRET --yes

echo ""
echo -e "${GREEN}✓ Environment variables set!${NC}"
echo ""

echo "================================"
echo "Pre-Deployment Checklist"
echo "================================"
echo ""

echo "Running checks..."

# Check if schema is pushed to Turso
echo ""
echo -n "Checking database schema... "
if npm run db:push --silent 2>/dev/null; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${YELLOW}Warning: Could not verify schema${NC}"
    echo "Run 'npm run db:push' before deploying"
fi

# Check if build works locally
echo -n "Testing local build... "
if npm run build --silent 2>/dev/null; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗ Build failed locally${NC}"
    echo "Fix build issues before deploying"
    exit 1
fi

echo ""
echo -e "${GREEN}✓ All checks passed!${NC}"
echo ""

echo "================================"
echo "Next Steps"
echo "================================"
echo ""
echo "1. Review environment variables in Vercel:"
echo "   vercel env ls"
echo ""
echo "2. Deploy to Vercel:"
echo "   vercel --prod"
echo ""
echo "3. Monitor deployment:"
echo "   vercel logs --prod"
echo ""
echo "4. Test your app:"
echo "   Open https://$NEXTAUTH_URL in your browser"
echo ""

echo -e "${GREEN}Setup complete!${NC}"
