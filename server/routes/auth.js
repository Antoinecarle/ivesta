import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { query } from '../db/index.js';
import { generateToken } from '../middleware/auth.js';

const router = Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

    const { rows } = await query('SELECT * FROM users WHERE email = $1 AND is_active = true', [email]);
    if (rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    await query('UPDATE users SET last_login = NOW() WHERE id = $1', [user.id]);

    const token = generateToken(user);
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role,
        avatarUrl: user.avatar_url,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ error: 'Token required' });

    const jwt = await import('jsonwebtoken');
    const decoded = jwt.default.verify(authHeader.split(' ')[1], process.env.JWT_SECRET || 'ivesta-jwt-secret-2026');
    const { rows } = await query('SELECT id, email, first_name, last_name, role, avatar_url FROM users WHERE id = $1', [decoded.userId]);
    if (rows.length === 0) return res.status(404).json({ error: 'User not found' });

    const u = rows[0];
    res.json({ id: u.id, email: u.email, firstName: u.first_name, lastName: u.last_name, role: u.role, avatarUrl: u.avatar_url });
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
});

export default router;
