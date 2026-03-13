import { Router } from 'express';
import { query } from '../db/index.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { rows } = await query(`
      SELECT d.*, f.name as family_name
      FROM documents d
      LEFT JOIN families f ON d.family_id = f.id
      WHERE d.doc_type LIKE 'kyc_%'
      ORDER BY d.expiry_date ASC NULLS LAST
    `);
    res.json(rows);
  } catch (err) {
    console.error('Get compliance docs error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/alerts', async (req, res) => {
  try {
    const { rows } = await query(`
      SELECT d.*, f.name as family_name
      FROM documents d
      LEFT JOIN families f ON d.family_id = f.id
      WHERE d.expiry_date IS NOT NULL
        AND d.expiry_date <= NOW() + INTERVAL '90 days'
      ORDER BY d.expiry_date ASC
    `);
    res.json(rows);
  } catch (err) {
    console.error('Compliance alerts error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
