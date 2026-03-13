import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import pool from './index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function migrate() {
  const client = await pool.connect();
  try {
    const schema = readFileSync(join(__dirname, 'schema.sql'), 'utf-8');
    await client.query(schema);
    await client.query('SET search_path TO ivesta, public');
    console.log('Migration completed successfully');

    // Seed admin user if not exists
    const { rows } = await client.query('SELECT id FROM ivesta.users WHERE email = $1', ['admin@ivesta-fo.com']);
    if (rows.length === 0) {
      const bcryptModule = await import('bcryptjs');
      const hash = await bcryptModule.default.hash('Ivesta2026!', 12);
      await client.query(
        `INSERT INTO users (email, password_hash, first_name, last_name, role)
         VALUES ($1, $2, $3, $4, $5)`,
        ['admin@ivesta-fo.com', hash, 'Admin', 'Ivesta', 'founder']
      );
      console.log('Admin user seeded: admin@ivesta-fo.com');
    }

    // Seed demo family
    const { rows: families } = await client.query('SELECT id FROM families LIMIT 1');
    if (families.length === 0) {
      await client.query(`
        INSERT INTO families (name, code, total_aum, risk_profile, status)
        VALUES
          ('Famille Martin', 'FAM-MARTIN', 45000000, 'balanced', 'active'),
          ('Famille Dupont', 'FAM-DUPONT', 120000000, 'growth', 'active'),
          ('Famille Laurent', 'FAM-LAURENT', 28000000, 'conservative', 'active')
      `);
      console.log('Demo families seeded');
    }

    // Seed demo funds
    const { rows: fundsCheck } = await client.query('SELECT id FROM funds LIMIT 1');
    if (fundsCheck.length === 0) {
      await client.query(`
        INSERT INTO funds (name, manager, strategy, vintage_year, fund_size, irr, tvpi, dpi, status)
        VALUES
          ('Ardian LBO Fund VII', 'Ardian', 'lbo', 2021, 19000000000, 0.1850, 1.62, 0.45, 'active'),
          ('Eurazeo Growth IV', 'Eurazeo', 'growth', 2022, 3500000000, 0.2210, 1.48, 0.32, 'active'),
          ('Tikehau Direct Lending V', 'Tikehau Capital', 'debt', 2023, 2800000000, 0.0920, 1.12, 0.28, 'active'),
          ('Primonial REIM Fund', 'Primonial', 'real_estate', 2020, 5200000000, 0.0780, 1.25, 0.68, 'active'),
          ('Idinvest Digital Fund III', 'Eurazeo', 'venture', 2021, 400000000, 0.3150, 2.10, 0.15, 'active')
      `);
      console.log('Demo funds seeded');
    }

  } catch (err) {
    console.error('Migration failed:', err.message);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

migrate();
