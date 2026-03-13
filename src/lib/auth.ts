export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  avatarUrl?: string;
}

export function getUser(): User | null {
  const data = localStorage.getItem('ivesta_user');
  return data ? JSON.parse(data) : null;
}

export function setAuth(token: string, user: User) {
  localStorage.setItem('ivesta_token', token);
  localStorage.setItem('ivesta_user', JSON.stringify(user));
}

export function clearAuth() {
  localStorage.removeItem('ivesta_token');
  localStorage.removeItem('ivesta_user');
}

export function isAuthenticated(): boolean {
  return !!localStorage.getItem('ivesta_token');
}
