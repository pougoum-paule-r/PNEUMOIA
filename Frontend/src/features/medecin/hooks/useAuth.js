import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:8000/api/v1';

export function useProfil() {
  const [profil, setProfil]   = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { setLoading(false); return; }

    fetch(`${API_URL}/auth/profil`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(data => setProfil(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { profil, loading };
}

export function useAuth() {
  const token = localStorage.getItem('token');
  const role  = localStorage.getItem('role');

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('token_type');
    localStorage.removeItem('role');
    window.location.href = '/';
  };

  return {
    isAuthenticated: !!token,
    role,
    logout,
  };
}