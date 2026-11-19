# Turso + NextAuth.js Migration Guide

This guide walks you through migrating from Supabase (PostgreSQL + Supabase Auth) to Turso (SQLite) with NextAuth.js.

## What's Changed

### Database
- **Before**: Supabase PostgreSQL with multi-schema setup (auth + public)
- **After**: Turso SQLite with single schema (no schema prefixes)

### Authentication
- **Before**: Supabase Auth (managed service)
- **After**: NextAuth.js with credentials provider (managed by your app)

### Schema
- **Removed**: All Supabase auth tables (users, sessions, identities, etc.)
- **Added**: NextAuth.js tables (User, Account, Session, VerificationToken)
- **Kept**: All application tables (card, credential_record, document_record, etc.)

## Setup Instructions

### Phase 1: Turso Setup (5 min)

#### 1.1 Create Turso Account
1. Go to https://app.turso.io
2. Sign up with GitHub/Google/email
3. Create organization (or use default)

#### 1.2 Create Database
```bash
# Install Turso CLI (if not installed)
brew install turso  # macOS
# or visit https://docs.turso.io/cli/installation

# Login to Turso
turso auth login

# Create database
turso db create sk-wallet

# Get connection details
turso db show sk-wallet --url
# Output: libsql://sk-wallet-username.turso.io

# Create auth token
turso db tokens create sk-wallet
# Output: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### 1.3 Update Environment
```bash
# In web/.env.local or prisma/.env, set:
DATABASE_URL="libsql://sk-wallet-username.turso.io?authToken=your-token"
NEXTAUTH_SECRET=$(openssl rand -base64 32)
NEXTAUTH_URL="http://localhost:3000"
```

### Phase 2: Create Database Schema (5 min)

```bash
# Generate Prisma client from new schema
npm run prisma:generate

# Push schema to Turso
npm run prisma:push

# Verify setup
npm run prisma:validate
npm run prisma:studio
```

The `prisma:studio` command opens Prisma Studio in your browser. You should see these tables:
- User, Account, Session, VerificationToken (NextAuth.js)
- card, card_provider
- credential_record
- document_record, document_file, document_access_audit
- dashboard_favorite

### Phase 3: Migrate Data (10-30 min)

If you're migrating existing data from Supabase:

#### 3.1 Export from Supabase
```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link project
supabase link --project-ref your-project-ref

# Export database
supabase db pull

# This creates a migrations/ folder with schema
# and allows data export
```

#### 3.2 Convert and Import Data
Create a script to export data from Supabase and import to Turso:

```typescript
// scripts/migrate-supabase-to-turso.ts
import { createClient } from '@supabase/supabase-js';
import { getRequiredPrismaClient } from '../web/src/lib/prisma';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

const prisma = getRequiredPrismaClient();

async function migrateUsers() {
  // Note: Supabase auth users won't have passwords
  // You'll need to either:
  // 1. Reset passwords for users (require them to set new ones)
  // 2. Use OAuth providers in NextAuth
  
  // Get Supabase users (requires admin token)
  // This is a placeholder - actual implementation depends on your setup
  console.log('User migration requires manual password reset or OAuth setup');
}

async function migrateApplicationData() {
  // Export cards
  const { data: cards } = await supabase
    .from('card')
    .select('*');
  
  if (cards) {
    for (const card of cards) {
      // Update owner_id to match new User IDs from NextAuth
      // await prisma.card.create({ data: card });
    }
  }
  
  // Similar for credential_record, document_record, etc.
}

// Run migration
migrateUsers();
migrateApplicationData();
```

**Important**: Since Supabase Auth doesn't expose passwords, existing users need to:
- Reset their password via email link, OR
- Use OAuth providers if configured

### Phase 4: Update Application Code

#### 4.1 Check Your Auth Pages
Look at `/web/src/app/auth/page.tsx`:

Old code (Supabase):
```typescript
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

export default function AuthPage() {
  const handleSignIn = async (email: string, password: string) => {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signInWithPassword({ email, password });
  };
}
```

New code (NextAuth.js):
```typescript
'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const router = useRouter();
  
  const handleSignIn = async (email: string, password: string) => {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    
    if (result?.error) {
      console.error('Sign in failed:', result.error);
    } else {
      router.push('/');
    }
  };
}
```

#### 4.2 Update Protected Routes
If you have API routes that need authentication:

Old (Supabase):
```typescript
import { getRouteSupabaseContext } from '@/lib/supabase/route-auth';

export async function GET() {
  const { user, unauthorizedResponse } = await getRouteSupabaseContext();
  
  if (!user) return unauthorizedResponse;
  
  // Your logic here
}
```

New (NextAuth.js):
```typescript
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Your logic here (session.user.id is the user ID)
}
```

#### 4.3 Update Protected Pages
Old (Supabase):
```typescript
import { getServerSupabaseUser } from '@/lib/supabase/server-auth';

export default async function Page() {
  const { user } = await getServerSupabaseUser();
  
  if (!user) return <div>Not authenticated</div>;
  
  return <div>Hello {user.email}</div>;
}
```

New (NextAuth.js):
```typescript
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/auth');
  }
  
  return <div>Hello {session.user.email}</div>;
}
```

#### 4.4 Update Client-Side Auth
Old (Supabase):
```typescript
'use client';

import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';

export default function Component() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);
}
```

New (NextAuth.js):
```typescript
'use client';

import { useSession, signOut } from 'next-auth/react';

export default function Component() {
  const { data: session, status } = useSession();
  
  if (status === 'loading') return <div>Loading...</div>;
  if (!session) return <div>Not authenticated</div>;
  
  return <div>Hello {session.user.email}</div>;
}
```

#### 4.5 Clean Up Supabase Imports
Search for and remove imports from `@supabase/supabase-js`:
```bash
grep -r "@supabase" web/src --include="*.ts" --include="*.tsx"
```

Remove files:
```bash
rm -rf web/src/lib/supabase/
```

### Phase 5: User Password Management

#### 5.1 For New Users
When users sign up, hash their password before saving:

```typescript
import { hash } from 'bcryptjs';

const hashedPassword = await hash(password, 10);
await prisma.user.create({
  data: {
    email,
    password: hashedPassword,
  },
});
```

#### 5.2 For Existing Users (Supabase Migration)
Existing users from Supabase don't have accessible passwords. Options:

**Option A: Require Password Reset** (Recommended)
1. Create a migration route: `/api/auth/set-password`
2. Send email to users asking them to set a password
3. Users click link and set new password
4. New password is hashed and stored

**Option B: OAuth Providers**
1. Add GitHub/Google OAuth to NextAuth
2. Users can sign in with existing providers
3. No password needed

**Option C: Temporary Passwords**
1. Generate random temporary password
2. Send via email
3. Users must change on first login

### Phase 6: Testing

#### 6.1 Local Testing
```bash
# Start dev server
npm run dev

# In another terminal, open Prisma Studio
npm run prisma:studio

# Test auth flow:
# 1. Go to http://localhost:3000/auth
# 2. Sign up new user
# 3. Sign in
# 4. Verify redirect to home page
# 5. Check session in browser console: 
#    Open DevTools → Application → Cookies → __Secure-next-auth.session-token
```

#### 6.2 Verify All Features
- [ ] Sign up works
- [ ] Sign in works
- [ ] Sign out works
- [ ] Protected routes redirect to auth
- [ ] Cards CRUD operations
- [ ] Credentials CRUD operations
- [ ] Documents CRUD operations
- [ ] Dashboard favorites work
- [ ] Session persists on page reload

### Phase 7: Production Deployment (Vercel)

#### 7.1 Update Vercel Environment Variables
```bash
# In Vercel dashboard > Settings > Environment Variables:

# Delete Supabase variables:
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY

# Add new variables:
DATABASE_URL=libsql://sk-wallet-username.turso.io?authToken=your-token
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32
NEXTAUTH_URL=https://yourapp.vercel.app
```

Generate NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

#### 7.2 Deploy
```bash
git add .
git commit -m "Migrate from Supabase to Turso + NextAuth.js"
git push origin main

# Vercel automatically deploys
# Monitor deployment in Vercel dashboard
```

#### 7.3 Verify Production
- [ ] Sign in at https://yourapp.vercel.app
- [ ] Verify all features work
- [ ] Check server logs for errors

### Phase 8: Decommission Supabase (Optional)

Once everything is working in production:

1. Keep Supabase around for 1-2 weeks as backup
2. Verify no one is using old URLs
3. Download backups for record
4. Delete Supabase project
5. Remove Supabase dependencies:

```bash
npm uninstall @supabase/supabase-js @supabase/ssr
```

## Troubleshooting

### "DATABASE_URL is not configured"
- Verify `DATABASE_URL` is set in environment
- For local: check `web/.env.local` and `prisma/.env`
- For Vercel: check Environment Variables in dashboard

### "Unauthorized" errors after sign in
- Verify `NEXTAUTH_SECRET` is set and same across deployments
- Verify `NEXTAUTH_URL` matches your app URL
- Clear browser cookies and try again

### Sign in works but session is lost on page reload
- Verify JWT strategy is configured (it is by default)
- Check browser console for errors
- Verify cookies are enabled

### "Invalid password" after migration
- Users from Supabase don't have accessible passwords
- They need to use password reset or OAuth
- Provide reset link at `/api/auth/forgot-password` (you'll need to implement)

### Database queries fail in API routes
- Verify `DATABASE_URL` in Prisma env
- Check Turso database is running: `turso db show sk-wallet`
- Verify auth token is correct and not expired

## Performance Tips

SQLite (via Turso) has some considerations:

1. **Write Latency**: Single-writer architecture means writes serialize
2. **Connection Pooling**: Turso handles via libsql protocol
3. **For High Traffic**: Consider read replicas (Turso feature)
4. **Indexes**: Already optimized in schema
5. **Backups**: Turso provides automatic backups

For typical SaaS apps, Turso performance is excellent.

## Next Steps

1. Follow the setup instructions above
2. Test thoroughly locally
3. Deploy to staging environment
4. Run production tests
5. Monitor logs and metrics
6. Keep Supabase for 1-2 weeks as backup
7. Decommission Supabase when confident

## Support

- Turso Docs: https://docs.turso.io
- NextAuth.js Docs: https://next-auth.js.org
- Prisma Docs: https://www.prisma.io/docs
