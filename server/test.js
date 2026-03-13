import { describe, it } from 'node:test';
import assert from 'node:assert';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env') });

describe('Ivesta API Tests', () => {
  it('should have DATABASE_URL configured', () => {
    assert.ok(process.env.DATABASE_URL, 'DATABASE_URL must be set');
  });

  it('should connect to database', async () => {
    const { default: pool } = await import('./db/index.js');
    const client = await pool.connect();
    await client.query('SET search_path TO ivesta, public');
    const result = await client.query('SELECT COUNT(*) as count FROM users');
    assert.ok(parseInt(result.rows[0].count) >= 1, 'Should have at least 1 user');
    client.release();
    await pool.end();
  });

  it('should have families seeded', async () => {
    const pg = await import('pg');
    const pool = new pg.default.Pool({ connectionString: process.env.DATABASE_URL });
    const client = await pool.connect();
    await client.query('SET search_path TO ivesta, public');
    const result = await client.query('SELECT COUNT(*) as count FROM families');
    assert.ok(parseInt(result.rows[0].count) >= 3, 'Should have at least 3 families');
    client.release();
    await pool.end();
  });

  it('should have funds seeded', async () => {
    const pg = await import('pg');
    const pool = new pg.default.Pool({ connectionString: process.env.DATABASE_URL });
    const client = await pool.connect();
    await client.query('SET search_path TO ivesta, public');
    const result = await client.query('SELECT COUNT(*) as count FROM funds');
    assert.ok(parseInt(result.rows[0].count) >= 5, 'Should have at least 5 funds');
    client.release();
    await pool.end();
  });
});
