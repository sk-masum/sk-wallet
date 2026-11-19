import { sql } from 'drizzle-orm';
import {
  sqliteTable,
  text,
  integer,
  real,
  primaryKey,
  uniqueIndex,
  index,
} from 'drizzle-orm/sqlite-core';

// NextAuth.js models
export const Account = sqliteTable(
  'Account',
  {
    id: text('id').primaryKey(),
    userId: text('userId').notNull(),
    type: text('type').notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (table) => ({
    providerAccountIdIdx: uniqueIndex('Account_provider_providerAccountId_key').on(
      table.provider,
      table.providerAccountId,
    ),
    userIdIdx: index('Account_userId_idx').on(table.userId),
  }),
);

export const Session = sqliteTable(
  'Session',
  {
    id: text('id').primaryKey(),
    sessionToken: text('sessionToken').unique().notNull(),
    userId: text('userId').notNull(),
    expires: integer('expires', { mode: 'timestamp' }).notNull(),
  },
  (table) => ({
    userIdIdx: index('Session_userId_idx').on(table.userId),
  }),
);

export const User = sqliteTable(
  'User',
  {
    id: text('id').primaryKey(),
    name: text('name'),
    email: text('email').unique(),
    emailVerified: integer('emailVerified', { mode: 'timestamp' }),
    image: text('image'),
    password: text('password'),
    createdAt: integer('createdAt', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
    updatedAt: integer('updatedAt', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
  },
);

export const VerificationToken = sqliteTable(
  'VerificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').unique().notNull(),
    expires: integer('expires', { mode: 'timestamp' }).notNull(),
  },
  (table) => ({
    identifierTokenIdx: uniqueIndex('VerificationToken_identifier_token_key').on(
      table.identifier,
      table.token,
    ),
  }),
);

// Application models
export const card_provider = sqliteTable('card_provider', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  created_at: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
  updated_at: integer('updated_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
});

export const card = sqliteTable(
  'card',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    created_at: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
    card_name: text('card_name'),
    number: text('number').notNull(),
    cvv: text('cvv').notNull(),
    holder_name: text('holder_name'),
    network: integer('network').notNull(),
    isCredit: integer('isCredit', { mode: 'boolean' }).default(true),
    expiry_month: integer('expiry_month').default(1),
    expiry_year: integer('expiry_year').default(2025),
    owner_id: text('owner_id').notNull(),
    color_name: text('color_name'),
    tags: text('tags').default('[]').notNull(),
    status: text('status').default('active').notNull(),
    credit_limit: real('credit_limit'),
    provider_id: integer('provider_id'),
    billing_date: integer('billing_date'),
    payment_date: integer('payment_date'),
  },
  (table) => ({
    providerIdIdx: index('card_provider_id_idx').on(table.provider_id),
    ownerIdIdx: index('card_owner_id_idx').on(table.owner_id),
  }),
);

export const credential_record = sqliteTable(
  'credential_record',
  {
    id: text('id').primaryKey(),
    user_id: text('user_id').notNull(),
    credential_type: text('credential_type').notNull(),
    service_name: text('service_name').notNull(),
    identifier: text('identifier'),
    secret_token: text('secret_token').notNull(),
    secret_hash: text('secret_hash').notNull(),
    secret_last4: text('secret_last4').notNull(),
    masked_secret: text('masked_secret').notNull(),
    url: text('url'),
    notes: text('notes'),
    metadata: text('metadata'),
    created_at: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
    updated_at: integer('updated_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => ({
    userCredentialServiceIdx: uniqueIndex('credential_record_user_id_credential_type_service_name_identifier_key').on(
      table.user_id,
      table.credential_type,
      table.service_name,
      table.identifier,
    ),
    credentialTypeIdx: index('credential_record_credential_type_idx').on(table.credential_type),
    userIdIdx: index('credential_record_user_id_idx').on(table.user_id),
    updatedAtIdx: index('credential_record_updated_at_idx').on(table.updated_at),
  }),
);

export const document_file = sqliteTable(
  'document_file',
  {
    id: text('id').primaryKey(),
    document_id: text('document_id').notNull(),
    file_path: text('file_path').notNull(),
    file_side: text('file_side').default('front').notNull(),
    mime_type: text('mime_type'),
    size_bytes: integer('size_bytes'),
    created_at: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => ({
    documentIdIdx: index('document_file_document_id_idx').on(table.document_id),
  }),
);

export const document_record = sqliteTable(
  'document_record',
  {
    id: text('id').primaryKey(),
    user_id: text('user_id').notNull(),
    document_type: text('document_type').notNull(),
    document_number_token: text('document_number_token').notNull(),
    document_number_last4: text('document_number_last4').notNull(),
    document_number_hash: text('document_number_hash').notNull(),
    masked_number: text('masked_number').notNull(),
    name_on_document: text('name_on_document'),
    metadata: text('metadata'),
    verified_at: integer('verified_at', { mode: 'timestamp' }),
    expires_at: integer('expires_at', { mode: 'timestamp' }),
    created_at: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
    updated_at: integer('updated_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
    category: text('category'),
  },
  (table) => ({
    documentTypeNumberIdx: uniqueIndex('document_record_document_type_document_number_hash_key').on(
      table.document_type,
      table.document_number_hash,
    ),
    categoryIdx: index('document_record_category_idx').on(table.category),
    userIdIdx: index('document_record_user_id_idx').on(table.user_id),
    updatedAtIdx: index('document_record_updated_at_idx').on(table.updated_at),
  }),
);

export const document_access_audit = sqliteTable(
  'document_access_audit',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    document_id: text('document_id'),
    actor_user_id: text('actor_user_id'),
    action: text('action').notNull(),
    context: text('context'),
    created_at: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => ({
    actorUserIdIdx: index('document_access_audit_actor_user_id_idx').on(table.actor_user_id),
    documentIdIdx: index('document_access_audit_document_id_idx').on(table.document_id),
  }),
);

export const dashboard_favorite = sqliteTable(
  'dashboard_favorite',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    user_id: text('user_id').notNull(),
    feature_key: text('feature_key').notNull(),
    created_at: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
    updated_at: integer('updated_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => ({
    userFeatureIdx: uniqueIndex('dashboard_favorite_user_id_feature_key_key').on(
      table.user_id,
      table.feature_key,
    ),
    userIdIdx: index('dashboard_favorite_user_id_idx').on(table.user_id),
    updatedAtIdx: index('dashboard_favorite_updated_at_idx').on(table.updated_at),
  }),
);

// Type exports
export type Account = typeof Account.$inferSelect;
export type AccountInsert = typeof Account.$inferInsert;

export type Session = typeof Session.$inferSelect;
export type SessionInsert = typeof Session.$inferInsert;

export type User = typeof User.$inferSelect;
export type UserInsert = typeof User.$inferInsert;

export type VerificationToken = typeof VerificationToken.$inferSelect;
export type VerificationTokenInsert = typeof VerificationToken.$inferInsert;

export type CardProvider = typeof card_provider.$inferSelect;
export type CardProviderInsert = typeof card_provider.$inferInsert;

export type Card = typeof card.$inferSelect;
export type CardInsert = typeof card.$inferInsert;

export type CredentialRecord = typeof credential_record.$inferSelect;
export type CredentialRecordInsert = typeof credential_record.$inferInsert;

export type DocumentFile = typeof document_file.$inferSelect;
export type DocumentFileInsert = typeof document_file.$inferInsert;

export type DocumentRecord = typeof document_record.$inferSelect;
export type DocumentRecordInsert = typeof document_record.$inferInsert;

export type DocumentAccessAudit = typeof document_access_audit.$inferSelect;
export type DocumentAccessAuditInsert = typeof document_access_audit.$inferInsert;

export type DashboardFavorite = typeof dashboard_favorite.$inferSelect;
export type DashboardFavoriteInsert = typeof dashboard_favorite.$inferInsert;
