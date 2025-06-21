'use client';
import { AppBar, Toolbar, Typography, Drawer, List, ListItemButton, ListItemText, CssBaseline, Box } from '@mui/material';
import Link from 'next/link';

const drawerWidth = 240;

const navItems = [
  { text: 'Dashboard', path: '/dashboard' },
  { text: 'Products', path: '/products' },
  { text: 'Add Product', path: '/add-product' },
];

export default function Layout({ children }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Inventory System
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <List>
          {navItems.map((item) => (
            <ListItemButton
              key={item.text}
              component={Link}
              href={item.path}
            >
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
