import { Router } from 'express';
import { query } from '../db/index.js';

const router = Router();

router.get('/stats', async (req, res) => {
  try {
    const [families, funds, aum, prospects, compliance, recentActivity] = await Promise.all([
      query('SELECT COUNT(*) as count FROM families WHERE status = $1', ['active']),
      query('SELECT COUNT(*) as count FROM funds WHERE status = $1', ['active']),
      query('SELECT COALESCE(SUM(total_aum), 0) as total FROM families WHERE status = $1', ['active']),
      query('SELECT COUNT(*) as count FROM prospects WHERE stage NOT IN ($1, $2)', ['won', 'lost']),
      query(`SELECT
        COUNT(*) FILTER (WHERE status = 'passed') as passed,
        COUNT(*) FILTER (WHERE status = 'pending') as pending,
        COUNT(*) FILTER (WHERE status = 'expired') as expired
        FROM compliance_checks`),
      query(`SELECT * FROM activity_log ORDER BY created_at DESC LIMIT 10`),
    ]);

    res.json({
      totalFamilies: parseInt(families.rows[0].count),
      totalFunds: parseInt(funds.rows[0].count),
      totalAum: parseFloat(aum.rows[0].total),
      activeProspects: parseInt(prospects.rows[0].count),
      compliance: compliance.rows[0],
      recentActivity: recentActivity.rows,
    });
  } catch (err) {
    console.error('Dashboard stats error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/allocation', async (req, res) => {
  try {
    const listed = await query('SELECT COALESCE(SUM(current_value), 0) as total FROM listed_investments');
    const nonListed = await query('SELECT COALESCE(SUM(nav), 0) as total FROM fund_investments');

    const fundsByStrategy = await query(`
      SELECT f.strategy, COUNT(*) as count, COALESCE(SUM(fi.nav), 0) as total_nav
      FROM funds f
      JOIN fund_investments fi ON fi.fund_id = f.id
      GROUP BY f.strategy
      ORDER BY total_nav DESC
    `);

    res.json({
      listedTotal: parseFloat(listed.rows[0].total),
      nonListedTotal: parseFloat(nonListed.rows[0].total),
      fundsByStrategy: fundsByStrategy.rows,
    });
  } catch (err) {
    console.error('Allocation error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
