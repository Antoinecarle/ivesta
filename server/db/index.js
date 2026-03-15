import pg from 'pg';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

export const query = async (text, params) => {
  const client = await pool.connect();
  try {
    await client.query('SET search_path TO ivesta, public');
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
};
export const getClient = () => pool.connect();
export default pool;
