import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { setAuth } from '../lib/auth';

export default function Login() {
  const [email, setEmail] = useState('admin@ivesta-fo.com');
  const [password, setPassword] = useState('Ivesta2026!');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await api<{ token: string; user: any }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      setAuth(data.token, data.user);
      navigate('/');
    } catch {
      setError('Identifiants invalides');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-14 h-14 bg-orange flex items-center justify-center font-display font-bold text-navy text-2xl">
              iV
            </div>
          </div>
          <h1 className="font-display text-3xl font-bold text-white mb-2">iVESTA</h1>
          <p className="text-white/50 font-body">Plateforme Family Office</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 space-y-5">
          {error && (
            <div className="bg-red/10 border border-red/30 text-red p-3 text-sm">{error}</div>
          )}
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-navy/10 text-navy bg-bg-light focus:border-orange focus:ring-1 focus:ring-orange outline-none text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-navy/10 text-navy bg-bg-light focus:border-orange focus:ring-1 focus:ring-orange outline-none text-sm"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-navy text-white py-3 font-display font-bold text-sm hover:bg-orange transition-colors disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <p className="text-center text-white/30 text-xs mt-8">
          Ivesta Family Office &copy; 2026 &mdash; Plateforme confidentielle
        </p>
      </div>
    </div>
  );
}
