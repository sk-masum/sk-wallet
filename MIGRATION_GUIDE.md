# Prisma to Drizzle ORM Migration Guide

## Overview

This project has been successfully migrated from Prisma ORM to Drizzle ORM. This guide explains what changed and how to work with the new setup.

## What's Changed

### Database ORM

- **Before**: Prisma ORM with client generation
- **After**: Drizzle ORM with direct schema definition

### Key Files

#### New Files

- `web/src/db/schema/index.ts` - Drizzle schema definition
- `web/src/db/client.ts` - Drizzle client singleton
- `drizzle.config.ts` - Drizzle Kit configuration

#### Updated Files

- All API routes in `web/src/app/api/**/*.ts`
- Authentication setup in `web/src/lib/auth/`
- Shared utilities updated to use Drizzle

#### Deprecated Files

- `web/src/lib/prisma.ts` - No longer used (can be deleted)
- `prisma/` directory - Original Prisma files (can be archived/deleted)

## Working with Drizzle

### Database Queries

#### Select

```typescript
import { db } from '@/db/client';
import { User } from '@/db/schema';
import { eq } from 'drizzle-orm';

// Select all
const users = await db.select().from(User);

// Select with where
const user = await db.select().from(User).where(eq(User.id, '123')).get();

// Select with where multiple conditions
const cards = await db
  .select()
  .from(card)
  .where(and(eq(card.owner_id, userId), eq(card.status, 'active')));
```

#### Insert

```typescript
import { db } from '@/db/client';
import { User } from '@/db/schema';

const newUser = await db.insert(User).values({ id: '123', email: 'user@example.com' }).returning();
```

#### Update

```typescript
import { db } from '@/db/client';
import { card } from '@/db/schema';
import { eq } from 'drizzle-orm';

await db.update(card).set({ card_name: 'New Name' }).where(eq(card.id, 1));
```

#### Delete

```typescript
import { db } from '@/db/client';
import { card } from '@/db/schema';
import { eq } from 'drizzle-orm';

await db.delete(card).where(eq(card.id, 1));
```

### Schema Definition

Schema is defined in `web/src/db/schema/index.ts`:

```typescript
export const card = sqliteTable(
  'card',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    card_name: text('card_name'),
    // ... other columns
  },
  (table) => ({
    // Indexes
    ownerIdIdx: index('card_owner_id_idx').on(table.owner_id),
  }),
);
```

## Development Workflow

### Initialize Database

```bash
# Generate TypeScript types from schema
npm run db:generate

# Apply migrations to your database
npm run db:push

# View database in browser UI
npm run db:studio
```

### Common Tasks

#### Add a new table

1. Add table definition to `web/src/db/schema/index.ts`
2. Run `npm run db:generate` to create migration
3. Run `npm run db:push` to apply migration

#### Add a column

1. Update table definition in `web/src/db/schema/index.ts`
2. Run `npm run db:generate`
3. Run `npm run db:push`

#### Query data

- Import the schema: `import { card } from '@/db/schema'`
- Use Drizzle query builder with operators from `drizzle-orm`

## Important Differences from Prisma

### No Generated Types

Drizzle generates types automatically from schema definition. No separate type generation step needed.

### Query Builder Pattern

```typescript
// Prisma
await prisma.card.findMany({ where: { owner_id: userId } });

// Drizzle
await db.select().from(card).where(eq(card.owner_id, userId));
```

### Error Handling

Prisma-specific error types (like `PrismaClientKnownRequestError`) are no longer available. Standard error handling should be used:

```typescript
try {
  await db.insert(card).values(data);
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}
```

### Transactions

```typescript
// Drizzle transactions
import { db } from '@/db/client';

await db.transaction(async (tx) => {
  await tx.insert(User).values(userData);
  await tx.insert(card).values(cardData);
});
```

## Migration Status

✅ **Complete**: All Prisma dependencies removed and replaced with Drizzle
✅ **All API routes**: Migrated to use Drizzle
✅ **Authentication**: Updated to use Drizzle queries
✅ **Schema**: Fully defined in Drizzle format
✅ **Package.json**: Updated with Drizzle dependencies

## Verification

To verify the migration is working:

1. **Start dev server**:

   ```bash
   npm run dev
   ```

2. **Test features**:
   - User login/registration
   - Card CRUD operations
   - Credential management
   - Document operations

3. **Check logs** for any errors related to database operations

## Troubleshooting

### "Module not found" errors

- Ensure `npm install` has been run
- Check that all imports point to `@/db/schema` for schema types
- Check that imports use `@/db/client` for the database client

### Database connection errors

- Verify `NEXT_PUBLIC_DATABASE_URL` environment variable is set
- For Turso: Use format `libsql://your-db.turso.io`
- For local SQLite: Use `file:./dev.db`

### Type errors

- Run `npm run db:generate` to regenerate types
- Check that schema matches your database structure

## Next Steps

1. ✅ Remove old Prisma files after verification:

   ```bash
   rm -rf prisma/
   rm web/src/lib/prisma.ts
   ```

2. ✅ Run tests to ensure all functionality works:

   ```bash
   npm test
   ```

3. ✅ Deploy to production after thorough testing

## References

- [Drizzle ORM Documentation](https://orm.drizzle.team)
- [SQLite Docs](https://www.sqlite.org/docs.html)
- [Turso SQLite](https://turso.tech)

---

**Migration Date**: 2024
**ORM**: Drizzle ORM 0.45.4
**Database Driver**: libsql (@libsql/client)
