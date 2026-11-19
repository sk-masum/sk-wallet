#!/bin/bash

# Vercel Deployment Validation Script
# Checks if everything is ready for Vercel deployment

set -e

echo ""
echo "╔════════════════════════════════════════════╗"
echo "║   SK Wallet - Vercel Readiness Check      ║"
echo "╚════════════════════════════════════════════╝"
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Counter for issues
ISSUES=0
WARNINGS=0

check_pass() {
    echo -e "${GREEN}✓${NC} $1"
}

check_fail() {
    echo -e "${RED}✗${NC} $1"
    ((ISSUES++))
}

check_warn() {
    echo -e "${YELLOW}⚠${NC} $1"
    ((WARNINGS++))
}

# Check 1: Node.js version
echo -e "${BLUE}1. Node.js Environment${NC}"
node_version=$(node -v)
npm_version=$(npm -v)
check_pass "Node.js: $node_version"
check_pass "npm: $npm_version"
echo ""

# Check 2: Dependencies
echo -e "${BLUE}2. Dependencies${NC}"
if [ -d "node_modules" ]; then
    check_pass "node_modules directory exists"
else
    check_fail "node_modules directory not found - run 'npm install'"
fi

# Check required packages
packages=("next" "drizzle-orm" "next-auth" "@libsql/client" "bcryptjs")
for package in "${packages[@]}"; do
    if npm list "$package" --silent 2>/dev/null | grep -q "$package"; then
        check_pass "$package is installed"
    else
        check_fail "$package is NOT installed - run 'npm install'"
    fi
done
echo ""

# Check 3: Configuration Files
echo -e "${BLUE}3. Configuration Files${NC}"
files=("vercel.json" "drizzle.config.ts" "web/.env.example" ".env.production.example")
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        check_pass "$file exists"
    else
        check_fail "$file NOT found"
    fi
done
echo ""

# Check 4: Environment Variables
echo -e "${BLUE}4. Environment Variables Setup${NC}"
if [ -f "web/.env.local" ]; then
    if grep -q "NEXT_PUBLIC_DATABASE_URL" web/.env.local; then
        check_pass "NEXT_PUBLIC_DATABASE_URL is configured in .env.local"
    else
        check_warn "NEXT_PUBLIC_DATABASE_URL not found in .env.local"
    fi
    
    if grep -q "NEXTAUTH_SECRET" web/.env.local; then
        check_pass "NEXTAUTH_SECRET is configured in .env.local"
    else
        check_warn "NEXTAUTH_SECRET not found in .env.local"
    fi
    
    if grep -q "NEXTAUTH_URL" web/.env.local; then
        check_pass "NEXTAUTH_URL is configured in .env.local"
    else
        check_warn "NEXTAUTH_URL not found in .env.local"
    fi
else
    check_warn ".env.local not found - local tests may fail"
fi
echo ""

# Check 5: Database Configuration
echo -e "${BLUE}5. Database Configuration${NC}"
if [ -f "drizzle.config.ts" ]; then
    if grep -q "dialect.*sqlite" drizzle.config.ts; then
        check_pass "Drizzle config set to SQLite dialect"
    else
        check_fail "Drizzle dialect not set to sqlite"
    fi
    
    if grep -q "schema.*db/schema" drizzle.config.ts; then
        check_pass "Drizzle schema path configured"
    else
        check_fail "Drizzle schema path not configured"
    fi
else
    check_fail "drizzle.config.ts not found"
fi

if [ -d "web/src/db/schema" ]; then
    if [ -f "web/src/db/schema/index.ts" ]; then
        check_pass "Database schema file exists"
    else
        check_fail "Database schema file not found"
    fi
else
    check_fail "Database schema directory not found"
fi
echo ""

# Check 6: NextAuth Setup
echo -e "${BLUE}6. NextAuth Configuration${NC}"
if [ -f "web/src/lib/auth/index.ts" ]; then
    check_pass "NextAuth config file exists"
    
    if grep -q "CredentialsProvider" web/src/lib/auth/index.ts; then
        check_pass "CredentialsProvider configured"
    else
        check_warn "CredentialsProvider not found in auth config"
    fi
else
    check_fail "NextAuth config file not found"
fi

if [ -f "web/src/app/api/auth"*"/route.ts" ] || find web/src/app/api/auth -name "route.ts" -type f | grep -q "nextauth"; then
    check_pass "NextAuth route handler exists"
else
    check_fail "NextAuth route handler not found"
fi
echo ""

# Check 7: Build System
echo -e "${BLUE}7. Build Configuration${NC}"
if grep -q "vercel-build" package.json; then
    check_pass "vercel-build command configured"
else
    check_fail "vercel-build command not found in package.json"
fi

if grep -q "vercel-dev" package.json; then
    check_pass "vercel-dev command configured"
else
    check_fail "vercel-dev command not found in package.json"
fi
echo ""

# Check 8: TypeScript
echo -e "${BLUE}8. TypeScript Configuration${NC}"
if [ -f "tsconfig.base.json" ]; then
    check_pass "TypeScript config exists"
    
    if grep -q '"paths"' tsconfig.base.json; then
        check_pass "Path aliases configured"
    else
        check_warn "Path aliases not found in tsconfig"
    fi
else
    check_fail "tsconfig.base.json not found"
fi
echo ""

# Check 9: Linting & Formatting
echo -e "${BLUE}9. Code Quality${NC}"
if [ -f "eslint.config.mjs" ]; then
    check_pass "ESLint configuration exists"
else
    check_warn "ESLint configuration not found"
fi

if [ -f ".prettierrc" ]; then
    check_pass "Prettier configuration exists"
else
    check_warn "Prettier configuration not found"
fi
echo ""

# Check 10: Git Configuration
echo -e "${BLUE}10. Git Setup${NC}"
if [ -d ".git" ]; then
    check_pass "Git repository initialized"
    
    if [ -f ".gitignore" ]; then
        check_pass ".gitignore exists"
        
        if grep -q "node_modules" .gitignore && grep -q ".env.local" .gitignore; then
            check_pass "Critical files in .gitignore"
        else
            check_warn "node_modules or .env.local not in .gitignore"
        fi
    else
        check_warn ".gitignore not found"
    fi
else
    check_warn "Not a git repository"
fi
echo ""

# Check 11: Ready for Build Test
echo -e "${BLUE}11. Build Test${NC}"
echo "Testing TypeScript compilation..."
if npm run build > /tmp/build_test.log 2>&1; then
    check_pass "TypeScript compilation successful"
else
    check_fail "TypeScript compilation failed"
    echo -e "${YELLOW}  Last 10 lines of error:${NC}"
    tail -10 /tmp/build_test.log | sed 's/^/  /'
fi
echo ""

# Check 12: Database Schema
echo -e "${BLUE}12. Database Schema${NC}"
if grep -q "export const.*sqliteTable" web/src/db/schema/index.ts; then
    check_pass "Database schema tables defined"
    
    table_count=$(grep -c "sqliteTable" web/src/db/schema/index.ts)
    check_pass "Found $table_count tables in schema"
else
    check_fail "No SQLite tables found in schema"
fi
echo ""

# Summary
echo "╔════════════════════════════════════════════╗"
echo "║            Readiness Summary               ║"
echo "╚════════════════════════════════════════════╝"
echo ""

if [ $ISSUES -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}✓ All checks passed! Ready for Vercel deployment.${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Connect repository to Vercel: https://vercel.com/new"
    echo "2. Add environment variables in Vercel dashboard"
    echo "3. Run database push: npm run db:push"
    echo "4. Deploy: git push origin main"
    exit 0
elif [ $ISSUES -eq 0 ]; then
    echo -e "${YELLOW}✓ Ready for deployment with $WARNINGS warnings${NC}"
    echo ""
    echo "Warnings should be addressed before production deployment"
    exit 0
else
    echo -e "${RED}✗ $ISSUES critical issue(s) found${NC}"
    echo ""
    echo "Please fix the above issues before deploying to Vercel"
    exit 1
fi
