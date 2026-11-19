# Vercel Deployment Guide for Drizzle + Turso + NextAuth Setup

This guide walks you through deploying the SK Wallet application to Vercel with Drizzle ORM, Turso database, and NextAuth.

## Prerequisites

- Vercel account (https://vercel.com)
- Turso account and database (https://turso.io)
- GitHub repository connected to Vercel

## Step 1: Turso Database Setup

### Create a Turso Database

1. Go to [app.turso.io](https://app.turso.io)
2. Create a new database or use an existing one
3. Copy your database connection string (looks like: `libsql://your-db-name-username.aws-ap-northeast-1.turso.io`)

### Generate Turso Auth Token

1. In Turso dashboard, go to **Tokens**
2. Create a new token with read/write access
3. Format your DATABASE_URL:
   ```
   libsql://your-db-name-username.aws-ap-northeast-1.turso.io?authToken=YOUR_TOKEN
   ```

## Step 2: Environment Variables Setup

### In Vercel Dashboard

1. Go to your project settings → **Environment Variables**
2. Add the following variables:

#### Database Configuration
```
DATABASE_URL=libsql://your-db-name-username.aws-ap-northeast-1.turso.io?authToken=YOUR_AUTH_TOKEN
```

#### NextAuth Configuration
```
NEXTAUTH_SECRET=generate-with: openssl rand -base64 32
NEXTAUTH_URL=https://your-domain.vercel.app
```

Generate a secure `NEXTAUTH_SECRET`:
```bash
openssl rand -base64 32
```

#### Application Secrets
```
CARD_TOKEN_SECRET=your-long-random-secret-key-min-32-chars
```

### Environment Variables by Stage

Create environment-specific variables:

**Production**
- `NEXTAUTH_URL=https://your-production-domain.com`
- `DATABASE_URL=libsql://your-prod-db...`
- `NODE_ENV=production`

**Preview (Staging)**
- `NEXTAUTH_URL=https://your-preview-domain.vercel.app`
- `DATABASE_URL=libsql://your-staging-db...` (optional, can use same as prod)
- `NODE_ENV=production`

**Development**
- Keep local `.env.local` with localhost settings

## Step 3: Database Migration on Deploy

### Option A: Automatic Migration (Recommended)

Create `.vercel/hooks/postBuild.sh` to run migrations after build:

```bash
#!/bin/bash
npm run db:push
```

However, this may not work with Vercel's read-only file system. Instead, use Option B.

### Option B: Pre-deployment Manual Steps

1. Before deploying a schema change:
   ```bash
   npm run db:push
   ```
2. This ensures your Turso database schema is up-to-date
3. Deploy to Vercel (schema will already be applied)

## Step 4: Build Configuration

The `vercel.json` is already configured:

```json
{
  "framework": "nextjs",
  "installCommand": "npm install",
  "buildCommand": "npm run vercel-build",
  "devCommand": "npm run vercel-dev"
}
```

**Build commands in package.json:**
- `vercel-build`: `next build web` (Builds Next.js app)
- `vercel-dev`: `next dev web` (Dev server)
- `start`: `nx start web` (Production server)

## Step 5: Configure Vercel.json (Already Done)

Your `vercel.json` is correctly configured. The key settings are:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "nextjs",
  "installCommand": "npm install",
  "buildCommand": "npm run vercel-build",
  "devCommand": "npm run vercel-dev"
}
```

## Step 6: Deploy

### Via Git Push
```bash
git push origin main
```
Vercel will automatically build and deploy.

### Via Vercel CLI
```bash
npm install -g vercel
vercel --prod
```

## Deployment Checklist

- [ ] Turso database created and credentials copied
- [ ] All environment variables added to Vercel
- [ ] `NEXTAUTH_URL` updated to production domain
- [ ] `NEXTAUTH_SECRET` generated and set
- [ ] `DATABASE_URL` configured with Turso credentials
- [ ] `CARD_TOKEN_SECRET` set to a secure value
- [ ] Database schema pushed with `npm run db:push`
- [ ] Git repository connected to Vercel
- [ ] Build command verified: `npm run vercel-build`
- [ ] Test login/registration works in production

## Troubleshooting

### Database Connection Errors

**Error**: `DATABASE_URL is not configured`

**Solution**: 
- Verify `DATABASE_URL` is set in Vercel environment variables
- Check it includes the auth token: `?authToken=YOUR_TOKEN`
- Restart deployment: `vercel redeploy`

### NextAuth Errors

**Error**: `NEXTAUTH_SECRET is not configured`

**Solution**:
- Set `NEXTAUTH_SECRET` in Vercel environment variables
- Must be a long random string (32+ characters)
- Generate with: `openssl rand -base64 32`

**Error**: `NEXTAUTH_URL does not match`

**Solution**:
- Set `NEXTAUTH_URL` to your Vercel domain
- For example: `https://sk-wallet.vercel.app`
- Match the actual domain your app is deployed to

### Build Failures

**Error**: `Command "npm run vercel-build" exited with 1`

**Solution**:
- Check build logs in Vercel dashboard
- Verify all dependencies are installed: `npm install`
- Ensure TypeScript compiles locally: `npm run build`
- Check for missing environment variables

### Database Schema Issues

**Error**: `Table not found` or schema mismatch

**Solution**:
- Run locally: `npm run db:push`
- This syncs your schema with Turso database
- Then deploy to Vercel

## Monitoring & Logging

### View Production Logs

```bash
vercel logs --prod
```

### Monitor Database

Turso dashboard shows:
- Database usage
- Query statistics
- Connection metrics

### Monitor Application

Vercel dashboard shows:
- Build history
- Deployment status
- Edge function performance
- Error tracking with Sentry (optional)

## Security Best Practices

1. **Never commit secrets** to git
   - Use `.env.local` for local development
   - Use Vercel environment variables for production

2. **Rotate tokens regularly**
   - Turso auth tokens can expire
   - Set up reminders to rotate

3. **Use separate databases**
   - Development database (file-based SQLite)
   - Staging database (Turso)
   - Production database (Turso)

4. **Enable HTTPS**
   - Vercel provides HTTPS by default
   - Configure custom domain in Vercel settings

5. **Set up Web Analytics**
   - Vercel Web Analytics is built-in
   - Track performance metrics

## Performance Optimization

### Database Connection Pooling

Turso handles connection pooling automatically. No additional configuration needed.

### Edge Functions

Vercel Edge Functions can be used for:
- Authentication middleware
- Rate limiting
- Request filtering

Requires Next.js 13+ (you have Next.js 16.1.6)

### Caching Strategy

```typescript
// In route handlers
export const revalidate = 60; // Revalidate every 60 seconds
export const dynamic = 'force-dynamic'; // For real-time data
```

## Domain Configuration

1. Go to Vercel project settings → **Domains**
2. Add your custom domain
3. Update `NEXTAUTH_URL` environment variable
4. Update DNS records as instructed

## Backup & Disaster Recovery

### Database Backups

Turso provides:
- Automatic backups
- Point-in-time recovery (check Turso pricing)

### Code Backup

- GitHub repository is your backup
- Enable branch protection
- Require PR reviews before merging

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Turso Documentation](https://docs.turso.io)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Drizzle ORM Documentation](https://orm.drizzle.team)

## Support

For issues:
1. Check Vercel build logs
2. Check application logs: `vercel logs --prod`
3. Check Turso status page
4. Review GitHub issues in the repository
