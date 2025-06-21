'use client';
import { useAuth } from '@/hooks/useAuth';

export default function DashboardPage() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {user ? user.email : 'Guest'}!</p>
    </div>
  );
}
