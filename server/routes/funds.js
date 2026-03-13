import { Router } from 'express';
import { query } from '../db/index.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { rows } = await query(`
      SELECT f.*,
        (SELECT COUNT(*) FROM fund_investments fi WHERE fi.fund_id = f.id) AS investor_count,
        (SELECT SUM(fi.commitment) FROM fund_investments fi WHERE fi.fund_id = f.id) AS total_commitment
      FROM funds f
      ORDER BY f.name ASC
    `);
    res.json(rows);
  } catch (err) {
    console.error('Get funds error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { rows } = await query('SELECT * FROM funds WHERE id = $1', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Fund not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error('Get fund error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, manager, strategy, vintage_year, fund_size, currency, geography } = req.body;
    const { rows } = await query(
      `INSERT INTO funds (name, manager, strategy, vintage_year, fund_size, currency, geography)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [name, manager, strategy, vintage_year, fund_size, currency || 'EUR', geography]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Create fund error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
