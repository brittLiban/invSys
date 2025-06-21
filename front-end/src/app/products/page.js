'use client';

import { useEffect, useState } from 'react';
import supabase from '../lib/supabaseClient';
import {
  Typography, TextField, Button, Box,
  List, ListItem, ListItemText, CircularProgress
} from '@mui/material';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: '',
    sku: '',
    price: '',
    quantity: '',
  });

  const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select('*');
    if (error) console.error('❌ Supabase fetch error:', error.message);
    else setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const { name, sku, price, quantity } = form;

    const { error } = await supabase.from('products').insert([
      { name, sku, price: parseFloat(price), quantity: parseInt(quantity, 10) }
    ]);

    if (error) {
      console.error('❌ Insert error:', error.message);
    } else {
      setForm({ name: '', sku: '', price: '', quantity: '' });
      fetchProducts();
    }
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>Products</Typography>

      <Box component="form" onSubmit={handleAddProduct} sx={{ mb: 4 }}>
        <TextField
          label="Name" name="name" value={form.name} onChange={handleInputChange}
          required fullWidth margin="normal"
        />
        <TextField
          label="SKU" name="sku" value={form.sku} onChange={handleInputChange}
          required fullWidth margin="normal"
        />
        <TextField
          label="Price" name="price" type="number" value={form.price} onChange={handleInputChange}
          required fullWidth margin="normal"
        />
        <TextField
          label="Quantity" name="quantity" type="number" value={form.quantity} onChange={handleInputChange}
          required fullWidth margin="normal"
        />
        <Button type="submit" variant="contained">Add Product</Button>
      </Box>

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
                  secondary={`SKU: ${product.sku} | $${product.price} | Qty: ${product.quantity}`}
                />
              </ListItem>
            ))
          )}
        </List>
      )}
    </>
  );
}
