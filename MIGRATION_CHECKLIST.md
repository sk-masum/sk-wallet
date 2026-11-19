# Prisma to Drizzle Migration Checklist

## ✅ Completed Tasks

### Infrastructure & Configuration
- [x] Install `drizzle-orm` and `@libsql/client` packages
- [x] Create `web/src/db/schema/index.ts` with complete schema
- [x] Create `web/src/db/client.ts` with Drizzle client
- [x] Create `drizzle.config.ts` configuration file
- [x] Update `package.json` dependencies (removed Prisma, added Drizzle)
- [x] Update `package.json` scripts (db:* commands instead of prisma:*)

### Authentication & Core
- [x] Migrate `web/src/lib/auth/index.ts`
- [x] Migrate `web/src/lib/auth/server.ts`
- [x] Update `web/src/app/api/shared/owned-route.ts` context types

### API Routes - Card Operations
- [x] Migrate `web/src/app/api/card/route.ts`
- [x] Migrate `web/src/app/api/card/[id]/route.ts`
- [x] Migrate `web/src/app/api/card-provider/route.ts`
- [x] Migrate `web/src/app/api/card/shared.ts`

### API Routes - Credentials
- [x] Migrate `web/src/app/api/credential/route.ts`
- [x] Migrate `web/src/app/api/credential/[id]/route.ts`
- [x] Migrate `web/src/app/api/credential/[id]/secret/route.ts`

### API Routes - Documents
- [x] Migrate `web/src/app/api/document/route.ts`
- [x] Migrate `web/src/app/api/document/[id]/route.ts`

### API Routes - Dashboard
- [x] Migrate `web/src/app/api/dashboard/route.ts`
- [x] Migrate `web/src/app/api/dashboard/favorite/route.ts`
- [x] Migrate `web/src/app/api/dashboard/alerts/route.ts`

### API Routes - Auth
- [x] Migrate `web/src/app/api/auth/register/route.ts`

## 📋 Testing Checklist

### Pre-deployment Tests
- [ ] Install dependencies: `npm install`
- [ ] Run linter: `npm run lint`
- [ ] Generate schema: `npm run db:generate`
- [ ] Apply migrations: `npm run db:push`
- [ ] Start dev server: `npm run dev`
- [ ] Run tests: `npm test`

### Manual Testing (After Starting Dev Server)

#### User Authentication
- [ ] User registration works
- [ ] User login works
- [ ] Session persists across page refreshes
- [ ] Logout works

#### Card Operations
- [ ] Create a card
- [ ] Read card list
- [ ] Update a card
- [ ] Delete a card
- [ ] Card filtering works

#### Credential Operations
- [ ] Create credential
- [ ] List credentials
- [ ] Update credential
- [ ] Delete credential
- [ ] Secret viewing works

#### Document Operations
- [ ] Upload document
- [ ] List documents
- [ ] Update document
- [ ] Delete document

#### Dashboard
- [ ] Dashboard loads
- [ ] Alerts display correctly
- [ ] Favorites toggle works
- [ ] Dashboard data refreshes

## 🧹 Cleanup

- [ ] Delete `/web/src/lib/prisma.ts` (deprecated)
- [ ] Delete `/prisma` directory (original Prisma files)
- [ ] Remove `@prisma/client` from anywhere it might be imported
- [ ] Remove Prisma environment variables if not needed

## 📚 Documentation

- [x] Create `MIGRATION_GUIDE.md`
- [x] Create `MIGRATION_CHECKLIST.md` (this file)
- [x] Create migration summary documentation

## 🚀 Deployment Readiness

- [ ] All tests passing
- [ ] No TypeScript errors: `tsc --noEmit`
- [ ] No ESLint errors: `npm run lint`
- [ ] Database migrations applied
- [ ] Environment variables configured
- [ ] Review git diff for unexpected changes

## 📝 Notes

**Migration Pattern Summary:**
- Prisma: `prisma.table.method()` → Drizzle: `db.queryMethod().from(table)`
- Context type changed from `prisma` to `db` throughout codebase
- Error handling simplified (no more Prisma-specific error classes)
- Raw SQL queries converted to Drizzle query builder

**Database Connection:**
- Uses `@libsql/client` for SQLite compatibility
- Supports local files and Turso cloud databases
- Configuration in `drizzle.config.ts`

**Key Imports to Use:**
```typescript
import { db } from '@/db/client';
import { table } from '@/db/schema';
import { eq, and, or, desc, asc } from 'drizzle-orm';
```

---

**Last Updated**: 2024
**Migration Status**: COMPLETE
**Ready for Testing**: YES
