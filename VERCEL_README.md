# SK Wallet Vercel Deployment Guide

A comprehensive guide to deploying SK Wallet with Drizzle ORM, Turso database, and NextAuth on Vercel.

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Prerequisites](#prerequisites)
- [Step-by-Step Setup](#step-by-step-setup)
- [Environment Variables](#environment-variables)
- [Verification](#verification)
- [Deployment](#deployment)
- [Post-Deployment](#post-deployment)
- [Troubleshooting](#troubleshooting)

## 🚀 Quick Start

### For the Impatient

```bash
# 1. Check if everything is ready
bash check-vercel-ready.sh

# 2. Run the automated setup
bash vercel-setup.sh

# 3. Deploy
git push origin main
```

## 📦 Prerequisites

Before deploying, ensure you have:

- [ ] **Vercel Account**: https://vercel.com
- [ ] **Turso Account**: https://turso.io
- [ ] **GitHub Repository**: Connected to Vercel
- [ ] **Node.js 18+**: Locally installed
- [ ] **Turso Database**: Created with valid auth token
- [ ] **Domain** (optional): For custom domain

## 🔧 Step-by-Step Setup

### Step 1: Create Turso Database

**On turso.io:**

1. Go to [app.turso.io](https://app.turso.io)
2. Click "Create Database"
3. Choose your region (closest to users recommended)
4. Copy the connection string
5. Generate an auth token and append to connection string

**Result should look like:**

```
libsql://your-db-name-username.aws-ap-northeast-1.turso.io?authToken=your-long-token-string
```

### Step 2: Verify Local Setup

```bash
# Install dependencies
npm install

# Check if everything is ready
bash check-vercel-ready.sh

# Should show: "All checks passed! Ready for Vercel deployment."
```

### Step 3: Push Database Schema

```bash
npm run db:push
```

This synchronizes your Drizzle schema with Turso database.

### Step 4: Generate Secrets

```bash
# NEXTAUTH_SECRET - copy the output
openssl rand -base64 32

# NEXT_PUBLIC_CARD_TOKEN_SECRET - copy the output
openssl rand -base64 32
```

Save both values - you'll need them for Vercel environment variables.

### Step 5: Connect to Vercel

**Option A: Via Vercel Dashboard**

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Select "Next.js" framework
4. Configure build settings (auto-detected)
5. Add environment variables (see below)
6. Deploy

**Option B: Via CLI**

```bash
npm install -g vercel
vercel link
```

### Step 6: Add Environment Variables

**In Vercel Dashboard → Settings → Environment Variables:**

```
NEXT_PUBLIC_DATABASE_URL=libsql://your-db-name.turso.io?authToken=YOUR_TOKEN
NEXTAUTH_SECRET=your-generated-secret-here
NEXTAUTH_URL=https://your-deployment-url.vercel.app
NEXT_PUBLIC_CARD_TOKEN_SECRET=your-generated-secret-here
```

**Add for each environment:**

- Production
- Preview
- Development

### Step 7: Deploy

```bash
git push origin main
# Vercel will automatically build and deploy
```

Or manually:

```bash
vercel deploy --prod
```

## 🔐 Environment Variables

### Database Configuration

| Variable                   | Purpose                   | Example                                     |
| -------------------------- | ------------------------- | ------------------------------------------- |
| `NEXT_PUBLIC_DATABASE_URL` | Turso database connection | `libsql://db-name.turso.io?authToken=token` |

**⚠️ CRITICAL:** Include `?authToken=` in the URL for production!

### Authentication

| Variable          | Purpose                    | Generate                     |
| ----------------- | -------------------------- | ---------------------------- |
| `NEXTAUTH_SECRET` | Encrypts sessions & tokens | `openssl rand -base64 32`    |
| `NEXTAUTH_URL`    | Your app's public URL      | `https://yourapp.vercel.app` |

**⚠️ MUST MATCH:** `NEXTAUTH_URL` must match your actual deployment URL

### Application

| Variable                        | Purpose            | Generate                  |
| ------------------------------- | ------------------ | ------------------------- |
| `NEXT_PUBLIC_CARD_TOKEN_SECRET` | Encrypts card data | `openssl rand -base64 32` |

### Local vs Production

**Local (.env.local):**

```
NEXT_PUBLIC_DATABASE_URL=file:./dev.db
NEXTAUTH_URL=http://localhost:3000
```

**Production (Vercel):**

```
NEXT_PUBLIC_DATABASE_URL=libsql://your-prod-db.turso.io?authToken=token
NEXTAUTH_URL=https://your-domain.com
```

## ✅ Verification

### Check Deployment

```bash
# View deployment logs
vercel logs --prod

# Check environment variables
vercel env ls --prod

# Monitor performance
# https://vercel.com/dashboard → your-project → Analytics
```

### Test Functionality

1. **Open your app:** https://your-domain.vercel.app
2. **Register new user:** Click "Sign Up"
3. **Login:** Use registered credentials
4. **Create a card:** Test full workflow
5. **Check API:** Browser DevTools → Network tab

### Verify Database Connection

```bash
# Local test with production env
vercel env pull
npm run dev

# Or access Turso console
# https://app.turso.io → your-database → Console
```

## 📤 Deployment

### Automatic Deployment

Vercel automatically deploys when you push to main:

```bash
git add .
git commit -m "feat: ready for production"
git push origin main
```

### Manual Deployment

```bash
# Deploy to staging (preview)
vercel deploy

# Deploy to production
vercel deploy --prod

# Promote preview to production
vercel promote <deployment-url>
```

### Pre-Deployment Checklist

- [ ] All environment variables set in Vercel
- [ ] Database schema pushed: `npm run db:push`
- [ ] Local build passes: `npm run build`
- [ ] Tests pass: `npm run test`
- [ ] Git repository clean
- [ ] No sensitive data in code

## 🎯 Post-Deployment

### First Time

1. **Monitor logs** for first 5 minutes:

   ```bash
   vercel logs --prod --follow
   ```

2. **Test all features:**
   - User registration
   - User login
   - Card creation
   - Card viewing
   - API endpoints

3. **Check performance:**
   - Vercel Analytics dashboard
   - Database query times in Turso

### Ongoing

1. **Set up monitoring:**
   - Vercel Error Tracking (optional)
   - Sentry integration (optional)
   - Database monitoring (Turso dashboard)

2. **Plan backups:**
   - Turso provides automatic backups
   - GitHub is your code backup

3. **Schedule updates:**
   - Monthly security updates
   - Dependency updates

## 🐛 Troubleshooting

### Database Connection Fails

**Error:** `NEXT_PUBLIC_DATABASE_URL is not configured`

**Solution:**

1. Verify variable is set in Vercel
2. Check it includes `?authToken=`
3. Redeploy: `vercel redeploy --prod`

See [VERCEL_TROUBLESHOOTING.md](./VERCEL_TROUBLESHOOTING.md) for more issues.

### Authentication Not Working

**Error:** `NEXTAUTH_URL does not match`

**Solution:**

1. Update `NEXTAUTH_URL` to match deployment URL
2. Clear browser cookies
3. Redeploy: `vercel redeploy --prod`

### Build Fails

**Error:** `Command failed: npm run vercel-build`

**Solution:**

1. Check full logs in Vercel dashboard
2. Test locally: `npm run vercel-build`
3. Fix errors and redeploy

See [VERCEL_TROUBLESHOOTING.md](./VERCEL_TROUBLESHOOTING.md) for detailed solutions.

## 🔗 Resources

- [Vercel Deployment Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Turso Documentation](https://docs.turso.io)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Drizzle ORM Documentation](https://orm.drizzle.team)

## 📞 Support

For issues:

1. Check [VERCEL_TROUBLESHOOTING.md](./VERCEL_TROUBLESHOOTING.md)
2. Review Vercel logs: `vercel logs --prod`
3. Check Turso status: https://status.turso.io/
4. Create GitHub issue in this repository

## ✨ Success Indicators

Your deployment is successful when:

- ✅ App loads without errors
- ✅ User can register
- ✅ User can login
- ✅ User can create cards
- ✅ No 500 errors in logs
- ✅ Database queries complete in <100ms
- ✅ Static assets load quickly

---

**Last Updated:** November 2024

**Version:** 1.0.0

**Status:** Production Ready ✨
