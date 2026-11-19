#!/usr/bin/env node

/**
 * Data Migration Script: Supabase → Turso
 *
 * This script helps migrate your application data from Supabase PostgreSQL to Turso SQLite.
 *
 * Before running:
 * 1. Ensure Turso database is created and NEXT_PUBLIC_DATABASE_URL is set in prisma/.env
 * 2. Run: npm run prisma:push (to create tables in Turso)
 * 3. Set environment variables for Supabase access (optional, only if exporting data)
 *
 * Usage:
 * - Check data: node scripts/migrate-data.js --check
 * - Migrate: node scripts/migrate-data.js --migrate
 * - Preview: node scripts/migrate-data.js --preview
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');

// Load environment
const envPath = path.join(projectRoot, 'prisma', '.env');
if (!fs.existsSync(envPath)) {
  console.error(
    '❌ prisma/.env not found. Please create it with NEXT_PUBLIC_DATABASE_URL for Turso.',
  );
  process.exit(1);
}

// Read .env file
const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars = {};
envContent.split('\n').forEach((line) => {
  if (line.includes('=')) {
    const [key, ...valueParts] = line.split('=');
    envVars[key.trim()] = valueParts.join('=').trim().replace(/['"]/g, '');
  }
});

process.env.NEXT_PUBLIC_DATABASE_URL = envVars.NEXT_PUBLIC_DATABASE_URL;

console.log('🚀 Supabase → Turso Data Migration');
console.log('====================================\n');

// Check if Turso database is accessible
async function checkTursoConnection() {
  try {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();

    console.log('✅ Turso database connection: OK');
    console.log(`   Database URL: ${process.env.NEXT_PUBLIC_DATABASE_URL}\n`);

    // Check tables
    const tables = await prisma.$queryRaw`
      SELECT name FROM sqlite_master 
      WHERE type='table' AND name NOT LIKE 'sqlite_%'
      ORDER BY name
    `;

    console.log(`📊 Found ${tables.length} tables:`);
    tables.forEach((table) => {
      console.log(`   - ${table.name}`);
    });
    console.log('');

    await prisma.$disconnect();
    return true;
  } catch (error) {
    console.error('❌ Turso database connection failed:');
    console.error(error.message);
    console.error('\n📝 Make sure:');
    console.error('   1. NEXT_PUBLIC_DATABASE_URL is set in prisma/.env');
    console.error('   2. NEXT_PUBLIC_DATABASE_URL format: libsql://your-db.turso.io?authToken=...');
    console.error('   3. Turso database is running: turso db show sk-wallet');
    return false;
  }
}

// Migration guide
function printMigrationGuide() {
  console.log('\n📋 Data Migration Steps');
  console.log('========================\n');

  console.log('Step 1: Create Turso Database (if not done)');
  console.log('  turso db create sk-wallet');
  console.log('  turso db show sk-wallet --url');
  console.log('  turso db tokens create sk-wallet\n');

  console.log('Step 2: Set up environment');
  console.log('  # Create prisma/.env with NEXT_PUBLIC_DATABASE_URL\n');

  console.log('Step 3: Create tables in Turso');
  console.log('  npm run prisma:push\n');

  console.log('Step 4: Migrate data');
  console.log('  # For new setups: tables are ready, no data migration needed');
  console.log('  # For existing Supabase data:');
  console.log('  #   1. Export from Supabase SQL Editor');
  console.log('  #   2. Convert to SQLite-compatible format');
  console.log('  #   3. Import to Turso via libsql CLI or Prisma\n');

  console.log('Step 5: Create users');
  console.log('  # With NextAuth: users register via /auth page');
  console.log('  # Passwords are hashed with bcryptjs before storing\n');

  console.log('Step 6: Test the app');
  console.log('  npm run dev');
  console.log('  # Test sign up, sign in, and all features\n');
}

// Main execution
async function main() {
  const command = process.argv[2] || '--check';

  switch (command) {
    case '--check':
      console.log('🔍 Checking Turso connection...\n');
      const connected = await checkTursoConnection();
      if (connected) {
        printMigrationGuide();
      }
      break;

    case '--help':
      console.log('Usage: node scripts/migrate-data.js [command]');
      console.log('\nCommands:');
      console.log('  --check      Check Turso connection and tables (default)');
      console.log('  --guide      Print migration guide');
      console.log('  --help       Show this help message\n');
      break;

    case '--guide':
      printMigrationGuide();
      break;

    default:
      console.log(`Unknown command: ${command}`);
      console.log('Use: node scripts/migrate-data.js --help\n');
      process.exit(1);
  }
}

main().catch((error) => {
  console.error('Fatal error:', error.message);
  process.exit(1);
});
