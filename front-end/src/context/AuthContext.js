'use client';

import { createContext, useEffect, useState } from 'react';
import supabase from '../lib/supabaseClient';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);

      console.log('✅ Session:', session); // DEBUG

      if (session?.user) {
        console.log('🔎 Looking up role for user ID:', session.user.id); // DEBUG

        const { data, error: roleError } = await supabase
          .from('user_roles')
          .select('role:roles(name)')
          .eq('user_id', session.user.id)
          .maybeSingle();

        if (roleError) {
          console.error('❌ Role fetch error:', roleError.message);
        } else {
          console.log('✅ Role query result:', data); // DEBUG
        }

        setRole(data?.role?.name ?? null);
      }

      setLoading(false);
    };

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    getSession();

    return () => listener?.subscription.unsubscribe();
  }, []);

  const value = {
    user,
    session,
    role,
    loading,
    signOut: () => supabase.auth.signOut(),
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
