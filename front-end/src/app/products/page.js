'use client';

import { useEffect, useState } from 'react';
import supabase from '../lib/supabaseClient'
import { Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        console.error('❌ Supabase fetch error:', error.message);
      } else {
        setProducts(data);
      }
      setLoading(false);
    }

    fetchProducts();
  }, []);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {products.length === 0 ? (
            <ListItem>
              <ListItemText primary="No products found." />
            </ListItem>
          ) : (
            products.map((product) => (
              <ListItem key={product.id} divider>
                <ListItemText
                  primary={product.name}
                  secondary={`SKU: ${product.sku} | Price: $${product.price} | Qty: ${product.quantity}`}
                />
              </ListItem>
            ))
          )}
        </List>
      )}
    </>
  );
}
