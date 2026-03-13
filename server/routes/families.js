import { Router } from 'express';
import { query } from '../db/index.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { rows } = await query(`
      SELECT f.*,
        u1.first_name || ' ' || u1.last_name AS partner_name,
        u2.first_name || ' ' || u2.last_name AS officer_name,
        (SELECT COUNT(*) FROM fund_investments fi WHERE fi.family_id = f.id) AS fund_count,
        (SELECT COUNT(*) FROM listed_investments li WHERE li.family_id = f.id) AS listed_count
      FROM families f
      LEFT JOIN users u1 ON f.assigned_partner_id = u1.id
      LEFT JOIN users u2 ON f.assigned_officer_id = u2.id
      ORDER BY f.name ASC
    `);
    res.json(rows);
  } catch (err) {
    console.error('Get families error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { rows } = await query(`
      SELECT f.*,
        u1.first_name || ' ' || u1.last_name AS partner_name,
        u2.first_name || ' ' || u2.last_name AS officer_name
      FROM families f
      LEFT JOIN users u1 ON f.assigned_partner_id = u1.id
      LEFT JOIN users u2 ON f.assigned_officer_id = u2.id
      WHERE f.id = $1
    `, [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Family not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error('Get family error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, code, risk_profile, notes } = req.body;
    const { rows } = await query(
      `INSERT INTO families (name, code, risk_profile, notes)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, code, risk_profile, notes]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Create family error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id/portfolio', async (req, res) => {
  try {
    const familyId = req.params.id;
    const [listed, funds] = await Promise.all([
      query('SELECT * FROM listed_investments WHERE family_id = $1 ORDER BY current_value DESC', [familyId]),
      query(`
        SELECT fi.*, f.name as fund_name, f.manager, f.strategy, f.irr, f.tvpi, f.dpi
        FROM fund_investments fi
        JOIN funds f ON fi.fund_id = f.id
        WHERE fi.family_id = $1
        ORDER BY fi.nav DESC
      `, [familyId]),
    ]);
    res.json({ listed: listed.rows, funds: funds.rows });
  } catch (err) {
    console.error('Get portfolio error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
