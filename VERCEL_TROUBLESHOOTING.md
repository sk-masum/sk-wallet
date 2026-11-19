# Vercel Deployment Troubleshooting Guide

## Common Issues and Solutions

### 1. Database Connection Errors

#### Error: `NEXT_PUBLIC_DATABASE_URL is not configured`

**Symptoms:**

- Build fails with "NEXT_PUBLIC_DATABASE_URL is not configured"
- Pages won't load in production
- Error in Vercel logs

**Solutions:**

1. Check Vercel dashboard → Settings → Environment Variables
2. Verify `NEXT_PUBLIC_DATABASE_URL` is set for the current environment
3. Ensure it includes the authToken: `libsql://...?authToken=...`
4. Redeploy after adding variable: `vercel redeploy --prod`

#### Error: `unable to open database file`

**Symptoms:**

- "unable to open database file" in logs
- Database queries return empty results

**Solutions:**

1. Verify Turso database is running
2. Check Turso status: https://status.turso.io/
3. Test connection locally: `npm run db:push`
4. Verify authToken is correct and not expired
5. Check database region matches your deployment region

#### Error: `Unauthorized: invalid token`

**Symptoms:**

- "Unauthorized: invalid token" in Turso errors
- 401 response from database

**Solutions:**

1. Regenerate Turso auth token
2. Update `NEXT_PUBLIC_DATABASE_URL` with new token
3. Set in Vercel environment variables
4. Redeploy: `vercel redeploy --prod`

---

### 2. NextAuth Configuration Issues

#### Error: `NEXTAUTH_SECRET is not configured`

**Symptoms:**

- "Session not found" errors
- Cannot log in
- JWT errors in console

**Solutions:**

1. Generate a new secret: `openssl rand -base64 32`
2. Add to Vercel environment variables: `NEXTAUTH_SECRET`
3. Must be 32+ characters
4. Redeploy after setting

#### Error: `NEXTAUTH_URL does not match request URL`

**Symptoms:**

- NextAuth callback errors
- Redirect loops
- 401 Unauthorized after login

**Solutions:**

1. Check your Vercel domain
2. Update `NEXTAUTH_URL` to match:
   - For Vercel preview: `https://your-project-git-branch.vercel.app`
   - For production: `https://your-custom-domain.com`
3. Ensure HTTPS is used (Vercel provides this)
4. Clear browser cookies and try again

#### Error: Credentials provider not working

**Symptoms:**

- Login page shows but credentials are rejected
- "No user found with this email" error
- Registration works but login doesn't

**Solutions:**

1. Verify user was created: Check database manually
   ```bash
   sqlite3 dev.db "SELECT * FROM User LIMIT 1;"
   ```
2. Ensure password was hashed during registration
3. Check bcryptjs is installed: `npm ls bcryptjs`
4. Verify NextAuth config in `/lib/auth/index.ts`

---

### 3. Build Failures

#### Error: `Command "npm run vercel-build" exited with 1`

**Symptoms:**

- Build fails in Vercel
- Works locally with `npm run build`
- TypeScript or ESLint errors

**Solutions:**

1. Check full error logs in Vercel dashboard
2. Run locally: `npm run vercel-build` (builds exactly as Vercel would)
3. Fix any TypeScript errors: `npm run build`
4. Clear cache: `vercel env pull` and redeploy

#### Error: Module not found errors

**Symptoms:**

- "Cannot find module '@/db/client'"
- "Cannot resolve import"

**Solutions:**

1. Verify import paths are correct
2. Check `tsconfig.base.json` has correct path aliases
3. Run locally: `npm install`
4. Clear Vercel cache and redeploy

#### Error: `ENOSPC: no space left on device`

**Symptoms:**

- Seemingly random build failures
- Disk space errors in logs

**Solutions:**

1. Clear Vercel cache: Visit project settings → Deployments → {latest} → More → Clear Cache
2. Reduce node_modules size
3. Remove unused dependencies

---

### 4. Environment Variable Issues

#### Variables not loading in production

**Symptoms:**

- Works in preview but not in production
- Environment variables are undefined

**Solutions:**

1. Verify variables are added for Production environment
2. Set for all environments (Development, Preview, Production)
3. Redeploy: `vercel redeploy --prod`
4. Use `vercel env ls --prod` to list production variables

#### Secrets exposed in logs

**Symptoms:**

- API keys visible in Vercel logs
- Tokens in error messages

**Solutions:**

1. Never log sensitive variables
2. Use `.env.local` for local development (in `.gitignore`)
3. Use Vercel environment variables for secrets
4. Sanitize error messages before returning to client

---

### 5. Database Schema Issues

#### Error: `Table 'card' does not exist`

**Symptoms:**

- API endpoints return "table not found"
- 500 errors on data operations

**Solutions:**

1. Push schema to production Turso:
   ```bash
   npm run db:push
   ```
2. Verify schema matches: `npx drizzle-kit pull`
3. Check Turso database is correctly configured
4. Inspect database in Turso dashboard

#### Schema mismatch after update

**Symptoms:**

- Changes work locally but fail in production
- Column not found errors after deployment

**Solutions:**

1. Test schema changes locally first
2. Push schema before deploying code: `npm run db:push`
3. Wait for schema migration to complete
4. Then deploy to Vercel

---

### 6. Performance Issues

#### Slow database queries

**Symptoms:**

- API endpoints take 10+ seconds
- Timeouts in browser
- High database latency

**Solutions:**

1. Check Turso region matches deployment region
2. Add database indexes for frequently queried columns
3. Use pagination for large data sets
4. Monitor Turso dashboard for connection issues

#### High memory usage

**Symptoms:**

- Functions timeout
- Memory limit exceeded errors
- Slow response times

**Solutions:**

1. Optimize database queries
2. Reduce data fetching scope
3. Use streaming for large responses
4. Consider Edge Functions for lightweight tasks

---

### 7. Security Issues

#### CORS errors from browser

**Symptoms:**

- "Access to XMLHttpRequest blocked by CORS policy"
- API calls fail from frontend

**Solutions:**

1. Ensure API routes are in `/api` directory
2. Set proper CORS headers if needed
3. Use NextAuth for authentication (handles CORS)
4. Verify request origin matches NEXTAUTH_URL

#### Session cookies not persisting

**Symptoms:**

- User logged out after refresh
- Cookies not set properly

**Solutions:**

1. Verify `NEXTAUTH_SECRET` is set for the Production environment and stays the same across redeployments.
2. Ensure `NEXTAUTH_URL` matches the public HTTPS origin used to sign in. If `AUTH_URL` or `AUTH_SECRET` is set, it takes precedence over the corresponding `NEXTAUTH_` variable.
3. Check browser cookie settings (not in private/incognito)
4. After changing environment variables, redeploy and sign in again. On HTTPS, the sign-in response should set a `__Secure-authjs.session-token` cookie.

---

## Debugging Steps

### 1. Check Vercel Logs

```bash
vercel logs --prod
```

### 2. Local Reproduction

```bash
# Pull production environment
vercel env pull

# Run with production env
npm run build
npm start
```

### 3. Database Inspection

```bash
# Using Turso CLI
turso db shell sk-wallet-prod

# Or via app.turso.io dashboard
```

### 4. Check NextAuth

```bash
# Test auth endpoint
curl -v https://your-domain/api/auth/signin
```

---

## Prevention

1. **Test before deploying:**

   ```bash
   npm run build
   npm run test
   vercel --prod (stage first)
   ```

2. **Use environment-specific configs:**
   - Development: Local SQLite
   - Staging: Separate Turso database
   - Production: Production Turso database

3. **Monitor production:**
   - Set up error tracking (Sentry)
   - Monitor database metrics (Turso dashboard)
   - Review Vercel analytics

4. **Plan deployments:**
   - Deploy schema changes first
   - Test in preview environment
   - Gradual rollout for major changes

---

## Getting Help

1. **Check logs:**
   - Vercel: `vercel logs --prod`
   - Turso: Dashboard → Database → Logs

2. **Review documentation:**
   - [Vercel Docs](https://vercel.com/docs)
   - [Turso Docs](https://docs.turso.io)
   - [NextAuth Docs](https://next-auth.js.org)

3. **Community support:**
   - GitHub issues in this repo
   - Stack Overflow tagged with `vercel` `nextauth` `drizzle-orm`
   - Discord communities for each platform
