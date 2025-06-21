'use client';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import supabase from '../../lib/supabaseClient'

export default function LoginPage() {
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
