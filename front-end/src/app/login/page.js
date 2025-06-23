'use client';

import { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useRouter } from 'next/navigation';
import supabase from '../../lib/supabaseClient';

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        router.push('/dashboard'); // ✅ Redirect after login
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', marginTop: '3rem' }}>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={[]}
        localization={{
          variables: {
            sign_in: { email_label: 'Email address' },
          },
        }}
        magicLink={true}
      />
    </div>
  );
}
