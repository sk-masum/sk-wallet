# Vercel Deployment Checklist - SK Wallet

Complete this checklist to ensure a smooth deployment to Vercel.

## Pre-Deployment (Local Setup)

### Environment & Dependencies

- [ ] Node.js 18+ installed (`node -v`)
- [ ] npm 8+ installed (`npm -v`)
- [ ] All dependencies installed (`npm install`)
- [ ] Git repository initialized and clean
- [ ] GitHub account with repository access

### Configuration Files

- [ ] `vercel.json` exists and configured
- [ ] `drizzle.config.ts` exists
- [ ] `tsconfig.base.json` has path aliases
- [ ] `.gitignore` includes `node_modules` and `.env.local`
- [ ] `package.json` has `vercel-build` and `vercel-dev` scripts

### Code Quality

- [ ] No TypeScript errors: `npm run build`
- [ ] Linting passes: `npm run lint`
- [ ] No hardcoded secrets in code
- [ ] All imports resolve correctly
- [ ] No console.error or warnings in critical paths

### Database Setup (Turso)

- [ ] Turso account created
- [ ] Database created in Turso
- [ ] Connection string copied (libsql://...)
- [ ] Auth token generated and appended
- [ ] Schema pushed to Turso: `npm run db:push`
- [ ] Schema verified in Turso dashboard
- [ ] Test connection works locally

### Secrets Generation

- [ ] `NEXTAUTH_SECRET` generated: `openssl rand -base64 32`
- [ ] `NEXT_PUBLIC_CARD_TOKEN_SECRET` generated: `openssl rand -base64 32`
- [ ] Both secrets saved securely (password manager or similar)
- [ ] Secrets NOT committed to git

### Local Testing

- [ ] App builds locally: `npm run build`
- [ ] Dev server starts: `npm run dev`
- [ ] Can register new user
- [ ] Can login with credentials
- [ ] Can create/view cards
- [ ] No 500 errors
- [ ] Database queries working
- [ ] NextAuth flow works

### Readiness Check

- [ ] Run: `bash check-vercel-ready.sh`
- [ ] All checks pass (green ✓)
- [ ] No critical issues (red ✗)
- [ ] Warnings acknowledged and acceptable

## Vercel Setup

### Vercel Account

- [ ] Vercel account created
- [ ] GitHub connected to Vercel
- [ ] Team created (optional)
- [ ] Billing set up

### Project Connection

- [ ] Repository imported to Vercel
- [ ] Framework detected as Next.js
- [ ] Project name set
- [ ] Build command verified: `npm run vercel-build`
- [ ] Output directory verified

### Environment Variables (All Environments)

**Set in Vercel Dashboard → Settings → Environment Variables:**

#### Production Environment

- [ ] `NEXT_PUBLIC_DATABASE_URL=libsql://your-db.turso.io?authToken=token`
  - Includes `?authToken=` parameter
  - Correct region selected
- [ ] `NEXTAUTH_SECRET=<generated-secret>`
  - 32+ characters
  - Random string
- [ ] `NEXTAUTH_URL=https://your-prod-domain.com`
  - HTTPS only
  - No trailing slash
  - Matches actual domain
- [ ] `NEXT_PUBLIC_CARD_TOKEN_SECRET=<generated-secret>`
  - 32+ characters
  - Random string

#### Preview Environment

- [ ] `NEXT_PUBLIC_DATABASE_URL=` (can be same as prod or separate staging db)
- [ ] `NEXTAUTH_SECRET=` (can be same as prod)
- [ ] `NEXTAUTH_URL=https://your-project-git-branch.vercel.app`
  - Use Vercel preview domain
  - Matches the deployment URL
- [ ] `NEXT_PUBLIC_CARD_TOKEN_SECRET=` (can be same as prod)

#### Development Environment

- [ ] `NEXT_PUBLIC_DATABASE_URL=file:./dev.db` (local SQLite)
- [ ] `NEXTAUTH_SECRET=` (can be same as prod)
- [ ] `NEXTAUTH_URL=http://localhost:3000`
  - HTTP for local
  - Port 3000
- [ ] `NEXT_PUBLIC_CARD_TOKEN_SECRET=` (can be same as prod)

### Domain Configuration

- [ ] Custom domain added (if applicable)
- [ ] DNS records updated
- [ ] HTTPS certificate active
- [ ] `NEXTAUTH_URL` updated to custom domain
- [ ] Redeploy triggered after domain change

## Deployment

### Pre-Deployment Tasks

- [ ] Database schema is current: `npm run db:push`
- [ ] No uncommitted changes in git
- [ ] Latest code pushed to main branch
- [ ] All environment variables set in Vercel
- [ ] `NEXTAUTH_URL` matches deployment domain
- [ ] No secrets in environment (use Vercel env vars)

### Initial Deployment

- [ ] Push to main: `git push origin main`
- [ ] Watch Vercel dashboard for build status
- [ ] Build completes without errors
- [ ] Deployment shows as "Ready"
- [ ] No warnings in deployment
- [ ] Check live URL loads successfully

### Monitor Deployment

- [ ] View logs: `vercel logs --prod`
- [ ] No error messages
- [ ] No 5xx errors
- [ ] Response times reasonable (<1s)
- [ ] All environment variables loaded

## Post-Deployment Testing

### Application Functionality

- [ ] App loads without errors
- [ ] All pages accessible
- [ ] Navigation works
- [ ] Responsive design correct
- [ ] No console errors (F12)

### Authentication

- [ ] Sign up page loads
- [ ] Can register new account
- [ ] Email field validates
- [ ] Password field validates
- [ ] Submit registration works
- [ ] Redirect after signup works
- [ ] Login page loads
- [ ] Can login with credentials
- [ ] Session created correctly
- [ ] Logout works
- [ ] Protected routes require auth

### Cards Feature

- [ ] Can navigate to create card
- [ ] Form validates inputs
- [ ] Can submit card creation
- [ ] Card appears in list
- [ ] Can view card details
- [ ] Can edit card
- [ ] Can delete card
- [ ] Provider selection works
- [ ] New provider creation works

### API Endpoints

- [ ] `POST /api/card` creates card
- [ ] `GET /api/card` lists cards
- [ ] `GET /api/card/[id]` gets single card
- [ ] `PUT /api/card/[id]` updates card
- [ ] `DELETE /api/card/[id]` deletes card
- [ ] Error responses are meaningful
- [ ] No 500 errors

### Database

- [ ] Data persists across refreshes
- [ ] Can query in Turso console
- [ ] No connection errors
- [ ] Response times acceptable

### Performance

- [ ] Page load time <3s
- [ ] API response time <1s
- [ ] No timeout errors
- [ ] Check Vercel analytics

### Security

- [ ] Cookies set with secure flag
- [ ] Sensitive data not in logs
- [ ] CORS headers correct
- [ ] No sensitive URLs exposed
- [ ] Password hashing verified

## Monitoring & Maintenance

### Vercel Dashboard

- [ ] Set up error tracking (optional)
- [ ] Monitor deployments
- [ ] Check analytics
- [ ] Set up alerts (optional)
- [ ] Review deployment history

### Turso Dashboard

- [ ] Monitor database usage
- [ ] Check query performance
- [ ] Review connection count
- [ ] Set up alerts (optional)

### Ongoing Tasks

- [ ] Check logs weekly
- [ ] Review error tracking
- [ ] Update dependencies monthly
- [ ] Rotate secrets quarterly
- [ ] Review and update documentation

## Rollback Procedure

If deployment has critical issues:

1. [ ] Go to Vercel project → Deployments
2. [ ] Find previous successful deployment
3. [ ] Click three dots → Promote to Production
4. [ ] Verify rollback successful
5. [ ] Investigate and fix issue
6. [ ] Deploy fix to staging first
7. [ ] Deploy to production after verification

## Troubleshooting Quick Links

If you encounter issues:

- **Build Fails**: Check [VERCEL_TROUBLESHOOTING.md](./VERCEL_TROUBLESHOOTING.md) → Build Failures
- **Database Error**: Check [VERCEL_TROUBLESHOOTING.md](./VERCEL_TROUBLESHOOTING.md) → Database Connection Errors
- **Auth Issues**: Check [VERCEL_TROUBLESHOOTING.md](./VERCEL_TROUBLESHOOTING.md) → NextAuth Configuration Issues
- **Performance**: Check [VERCEL_TROUBLESHOOTING.md](./VERCEL_TROUBLESHOOTING.md) → Performance Issues
- **Quick Reference**: See [VERCEL_QUICKREF.md](./VERCEL_QUICKREF.md)

## Sign-Off

**Deployment Date**: **\*\***\_**\*\***

**Deployed By**: **\*\***\_**\*\***

**Verified By**: **\*\***\_**\*\***

**Production URL**: **\*\***\_**\*\***

**Notes**:

---

---

## Post-Launch Monitoring (First Week)

- [ ] Day 1: Monitor for crashes
- [ ] Day 1-3: Monitor error logs daily
- [ ] Day 1-7: Monitor performance metrics
- [ ] Week 1: Collect user feedback
- [ ] Week 1: Review analytics

---

**Deployment Guide Version**: 1.0.0

**Last Updated**: November 2024

**Status**: Ready for Production ✨
