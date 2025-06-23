'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import supabase from '@/lib/supabaseClient';

export default function UserRoleManagerPage() {
  const { user, role } = useAuth();
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (role === 'Admin') {
      fetchUsersAndRoles();
    }
  }, [role]);

  const fetchUsersAndRoles = async () => {
    const { data: userData } = await supabase.from('user_roles').select('user_id, roles(name), profiles(email)');
    const { data: roleData } = await supabase.from('roles').select('*');
    setUsers(userData);
    setRoles(roleData);
  };

  const updateUserRole = async (userId, newRoleId) => {
    setUpdating(true);
    await supabase
      .from('user_roles')
      .update({ role_id: newRoleId })
      .eq('user_id', userId);
    fetchUsersAndRoles();
    setUpdating(false);
  };

  if (role !== 'admin') {
    return <p>🚫 You do not have access to this page.</p>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🧑‍💼 Manage User Roles</h2>
      {users.map((u) => (
        <div key={u.user_id} style={{ marginBottom: '1rem' }}>
          <strong>{u.profiles?.email || 'No Email'}</strong> — Current Role: <em>{u.roles?.name}</em>
          <select
            onChange={(e) => updateUserRole(u.user_id, e.target.value)}
            defaultValue=""
            disabled={updating}
          >
            <option value="" disabled>Change Role</option>
            {roles.map((r) => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}
