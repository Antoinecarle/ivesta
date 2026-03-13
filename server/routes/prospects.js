import { Router } from 'express';
import { query } from '../db/index.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { rows } = await query(`
      SELECT p.*, u.first_name || ' ' || u.last_name AS assigned_name
      FROM prospects p
      LEFT JOIN users u ON p.assigned_to = u.id
      ORDER BY p.updated_at DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error('Get prospects error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { company_name, contact_name, contact_email, contact_phone, source, estimated_aum, notes } = req.body;
    const { rows } = await query(
      `INSERT INTO prospects (company_name, contact_name, contact_email, contact_phone, source, estimated_aum, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [company_name, contact_name, contact_email, contact_phone, source, estimated_aum, notes]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Create prospect error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.patch('/:id/stage', async (req, res) => {
  try {
    const { stage } = req.body;
    const { rows } = await query(
      'UPDATE prospects SET stage = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
      [stage, req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Prospect not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error('Update prospect stage error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
