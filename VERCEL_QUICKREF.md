# Vercel Deployment Quick Reference

## 🚀 5-Minute Setup

```bash
# 1. Check readiness (1 min)
bash check-vercel-ready.sh

# 2. Generate secrets (1 min)
openssl rand -base64 32  # NEXTAUTH_SECRET
openssl rand -base64 32  # NEXT_PUBLIC_CARD_TOKEN_SECRET

# 3. Run automated setup (2 min)
bash vercel-setup.sh

# 4. Deploy (1 min)
git push origin main
```

## 📋 Required Environment Variables

| Variable                        | Value                                       | Where           |
| ------------------------------- | ------------------------------------------- | --------------- |
| `NEXT_PUBLIC_DATABASE_URL`      | `libsql://your-db.turso.io?authToken=token` | Vercel Env Vars |
| `NEXTAUTH_SECRET`               | 32+ char random string                      | Vercel Env Vars |
| `NEXTAUTH_URL`                  | `https://your-domain.vercel.app`            | Vercel Env Vars |
| `NEXT_PUBLIC_CARD_TOKEN_SECRET` | 32+ char random string                      | Vercel Env Vars |

## 🔑 Generate Secrets

```bash
openssl rand -base64 32
```

Copy output to Vercel environment variables.

## 📦 Setup Checklist

- [ ] Turso database created
- [ ] Auth token generated
- [ ] GitHub repo connected to Vercel
- [ ] `check-vercel-ready.sh` passes
- [ ] `npm run db:push` succeeds
- [ ] Environment variables added to Vercel
- [ ] `NEXTAUTH_URL` matches deployment domain
- [ ] Build passes: `npm run build`

## 🚢 Deployment Commands

```bash
# View deployment status
vercel status

# Deploy to staging
vercel deploy

# Deploy to production
vercel deploy --prod

# View logs
vercel logs --prod

# View environment variables
vercel env ls --prod

# Check environment variables
vercel env pull

# Redeploy (useful for fixing env var issues)
vercel redeploy --prod
```

## 🔗 Important URLs

| Resource         | URL                            |
| ---------------- | ------------------------------ |
| Vercel Dashboard | https://vercel.com/dashboard   |
| Turso Console    | https://app.turso.io           |
| Your App         | https://your-domain.vercel.app |
| NextAuth Docs    | https://next-auth.js.org       |
| Turso Docs       | https://docs.turso.io          |

## ⚠️ Common Mistakes

| Mistake                                       | Fix                                    |
| --------------------------------------------- | -------------------------------------- |
| Missing authToken in NEXT_PUBLIC_DATABASE_URL | Add `?authToken=YOUR_TOKEN`            |
| NEXTAUTH_URL doesn't match domain             | Update to actual deployment URL        |
| Environment vars not set                      | Add all 4 vars in Vercel               |
| Build fails locally                           | Run `npm run build` to debug           |
| Database schema mismatch                      | Run `npm run db:push` before deploying |

## 🐛 Quick Troubleshooting

| Issue              | Command                          |
| ------------------ | -------------------------------- |
| Check logs         | `vercel logs --prod`             |
| Test build locally | `npm run vercel-build`           |
| Pull prod config   | `vercel env pull`                |
| Test with prod env | `vercel env pull && npm run dev` |
| View env variables | `vercel env ls --prod`           |
| Redeploy           | `vercel redeploy --prod`         |

## 📱 Test Checklist After Deploy

- [ ] App loads: https://your-domain.vercel.app
- [ ] Sign up works
- [ ] Login works
- [ ] Create card works
- [ ] API endpoints work
- [ ] No console errors
- [ ] No 500 errors in logs

## 📚 Full Guides

- Detailed setup: [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)
- Troubleshooting: [VERCEL_TROUBLESHOOTING.md](./VERCEL_TROUBLESHOOTING.md)
- Full README: [VERCEL_README.md](./VERCEL_README.md)

## 🆘 If Stuck

1. Run: `bash check-vercel-ready.sh`
2. Check: `vercel logs --prod`
3. Read: [VERCEL_TROUBLESHOOTING.md](./VERCEL_TROUBLESHOOTING.md)
4. Try: `vercel redeploy --prod`

---

**Keep this open while deploying! 👉**
