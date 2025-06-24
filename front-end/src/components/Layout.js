'use client';

import Link from 'next/link';
import { Box, List, ListItemButton, ListItemText, Button, AppBar, Toolbar, CssBaseline } from '@mui/material';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function Layout({ children }) {
  const { user, role, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/login'); // Redirect after sign out
  };

  const normalizedRole = role?.toLowerCase(); // Normalize role to lowercase

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ justifyContent: 'flex-end' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {user && (
              <List sx={{ display: 'flex', gap: 1 }} component="nav">
                <ListItemButton component={Link} href="/dashboard"><ListItemText primary="Dashboard" /></ListItemButton>
                <ListItemButton component={Link} href="/products"><ListItemText primary="Products" /></ListItemButton>
                <ListItemButton component={Link} href="/add-product"><ListItemText primary="Add Product" /></ListItemButton>
                {(normalizedRole === 'admin') && (
                  <ListItemButton component={Link} href="/admin/users">
                    <ListItemText primary="Manage Users" />
                  </ListItemButton>
                )}
              </List>
            )}

            {user ? (
              <Button color="inherit" onClick={handleSignOut}>Sign Out</Button>
            ) : (
              <Button color="inherit" component={Link} href="/login">Sign In</Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {children}
      </Box>
    </Box>
  );
}
