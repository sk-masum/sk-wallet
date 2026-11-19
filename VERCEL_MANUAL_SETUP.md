# Manual Vercel Deployment Setup

If the automated scripts don't work (e.g., Vercel CLI not available), follow these manual steps.

## 🚀 Manual Deployment in 10 Steps

### Step 1: Create Vercel Account

- Go to https://vercel.com
- Sign up with GitHub
- Authorize GitHub access

### Step 2: Create Project on Vercel

1. Click "Add New..." → "Project"
2. Select your repository (sk-wallet)
3. Click "Import"
4. Click "Continue" (framework auto-detected as Next.js)

### Step 3: Configure Build Settings

Leave these as auto-detected:

- **Framework Preset**: Next.js
- **Build Command**: `npm run vercel-build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### Step 4: Generate Secrets (Local Terminal)

Open your terminal and run:

```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32
# Save the output

# Generate NEXT_PUBLIC_CARD_TOKEN_SECRET
openssl rand -base64 32
# Save the output
```

Save both outputs - you'll need them in Step 5.

### Step 5: Add Environment Variables in Vercel Dashboard

**In Vercel Project Dashboard:**

1. Click **Settings** → **Environment Variables**

2. Add each variable and select which environments to apply:

#### Variable 1: NEXT_PUBLIC_DATABASE_URL

```
NEXT_PUBLIC_DATABASE_URL=libsql://your-db-name-username.aws-ap-northeast-1.turso.io?authToken=YOUR_AUTH_TOKEN
```

- Get this from https://app.turso.io
- **IMPORTANT**: Include the `?authToken=` parameter
- Apply to: **Production**, **Preview**, **Development**

#### Variable 2: NEXTAUTH_SECRET

```
NEXTAUTH_SECRET=<paste-your-generated-secret-here>
```

- Use the value from Step 4
- Must be 32+ characters
- Apply to: **Production**, **Preview**, **Development**

#### Variable 3: NEXTAUTH_URL

```
NEXTAUTH_URL=https://your-project-name.vercel.app
```

- Replace `your-project-name` with your actual Vercel project name
- **For Production only**: Use your custom domain if you have one
- Apply to: **Production**, **Preview**, **Development**

#### Variable 4: NEXT_PUBLIC_CARD_TOKEN_SECRET

```
NEXT_PUBLIC_CARD_TOKEN_SECRET=<paste-your-generated-secret-here>
```

- Use the value from Step 4
- Must be 32+ characters
- Apply to: **Production**, **Preview**, **Development**

### Step 6: Verify All Variables

After adding all 4 variables:

1. Click on each variable to verify the value
2. Ensure each is applied to the correct environments
3. Close settings panel

### Step 7: Push Database Schema (Local Terminal)

Before deploying, sync your database schema:

```bash
npm run db:push
```

This creates all necessary tables in Turso.

### Step 8: Deploy to Vercel

**Option A: Automatic (Recommended)**

```bash
git add .
git commit -m "feat: ready for production deployment"
git push origin main
```

Vercel will automatically build and deploy.

**Option B: Manual Redeploy**

1. In Vercel dashboard, go to **Deployments**
2. Find the latest failed deployment
3. Click three dots → **Redeploy**

### Step 9: Monitor Deployment

1. Watch the **Deployments** tab in Vercel
2. Wait for build to complete (usually 2-3 minutes)
3. Check for any build errors
4. Once deployed, click the preview URL

### Step 10: Test Your App

1. Click the preview URL to open your app
2. Test these features:
   - **Sign up**: Create a new account
   - **Sign in**: Login with your account
   - **Create card**: Add a new payment card
   - **View card**: See your card in the list
   - **API**: Check browser DevTools for API calls

---

## 🔍 Verification Checklist

After deployment, verify:

- [ ] App loads without errors
- [ ] No red errors in Vercel logs
- [ ] User registration works
- [ ] User login works
- [ ] Cards can be created
- [ ] Cards persist (reload page and they're still there)
- [ ] Database connection is working
- [ ] No 500 errors

---

## 🐛 If Build Fails

### Check Logs

1. In Vercel dashboard, go to **Deployments**
2. Click the failed deployment
3. Click **View Function Logs** or **View Build Logs**
4. Look for error messages

### Common Build Errors

**Error: "Cannot find module..."**

- Solution: Run `npm install` locally and push
- Or: Clear Vercel cache (Settings → Redeploy)

**Error: "NEXT_PUBLIC_DATABASE_URL is not configured"**

- Solution: Verify NEXT_PUBLIC_DATABASE_URL is set in Environment Variables
- Redeploy after adding variable

**Error: "NextAuth errors"**

- Solution: Check NEXTAUTH_SECRET and NEXTAUTH_URL are set
- NEXTAUTH_URL must match deployment domain

**Error: "npm ERR! 404"**

- Solution: Check if all dependencies are installed locally
- Run `npm install` and `npm run build` locally

---

## 🌐 If You Have a Custom Domain

1. Go to Vercel project **Settings** → **Domains**
2. Add your custom domain
3. Follow DNS setup instructions
4. Update `NEXTAUTH_URL` environment variable:
   ```
   NEXTAUTH_URL=https://your-custom-domain.com
   ```
5. Redeploy after changing NEXTAUTH_URL

---

## 📊 Monitor Your App

After successful deployment:

### View Logs

1. In Vercel dashboard: **Deployments** → Latest → **View Function Logs**
2. Or via CLI: `vercel logs --prod`

### Check Analytics

1. In Vercel dashboard: **Analytics** tab
2. See response times, edge locations, errors

### Database Status

1. Go to https://app.turso.io
2. Select your database
3. Check query performance and usage

---

## 🔄 Redeploy After Changes

If you make code changes:

```bash
# Push to GitHub
git add .
git commit -m "your message"
git push origin main

# Vercel will automatically redeploy
```

Or manually redeploy in Vercel dashboard:

1. Go to **Deployments**
2. Click three dots on latest deployment
3. Select **Redeploy**

---

## 🚀 Useful Links

- **Your Vercel Project**: https://vercel.com/dashboard
- **Your App**: https://your-project-name.vercel.app
- **Turso Dashboard**: https://app.turso.io
- **Vercel Docs**: https://vercel.com/docs
- **NextAuth Docs**: https://next-auth.js.org

---

## 💡 Tips

1. **Keep NEXTAUTH_SECRET secret** - Never share it
2. **Keep NEXT_PUBLIC_DATABASE_URL secret** - Never commit it to git
3. **Test locally first** - Run `npm run dev` before deploying
4. **Monitor logs daily** - Check for errors after deployment
5. **Keep dependencies updated** - Run `npm update` monthly

---

## ✅ Success Indicators

Your deployment is successful when:

- ✅ App loads at https://your-domain.vercel.app
- ✅ Sign up page works
- ✅ Login page works
- ✅ Can create and view cards
- ✅ Database queries are fast (<100ms)
- ✅ No error pages (5xx errors)
- ✅ Logs show no errors

**Congratulations! Your app is now live on Vercel! 🎉**
