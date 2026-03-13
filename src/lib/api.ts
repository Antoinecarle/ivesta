const API_BASE = '/api';

export async function api<T>(path: string, options?: RequestInit): Promise<T> {
  const token = localStorage.getItem('ivesta_token');
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  });
  if (res.status === 401) {
    localStorage.removeItem('ivesta_token');
    localStorage.removeItem('ivesta_user');
    window.location.href = '/login';
    throw new Error('Unauthorized');
  }
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export function formatCurrency(amount: number, currency = 'EUR'): string {
  if (amount >= 1e9) return `${(amount / 1e9).toFixed(1)}Md ${currency}`;
  if (amount >= 1e6) return `${(amount / 1e6).toFixed(1)}M ${currency}`;
  if (amount >= 1e3) return `${(amount / 1e3).toFixed(0)}k ${currency}`;
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency }).format(amount);
}

export function formatPercent(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
}
