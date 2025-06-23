'use client';
import { useAuth } from '@/hooks/useAuth';

export default function DashboardPage() {
  const { user, role } = useAuth();

  return (
    <div>
      <h1>Welcome {user?.email}</h1>
      <p>Your role: {role}</p>

      {role === 'admin' && (
        <button>Add New Product</button>
      )}
    </div>
  );
}
