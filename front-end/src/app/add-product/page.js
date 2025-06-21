'use client';

import { useState } from 'react';
import supabase from '../lib/supabaseClient';
import {
  Typography, TextField, Button, Box,
  ToggleButtonGroup, ToggleButton, Alert
} from '@mui/material';

export default function AddProductPage() {
  const [mode, setMode] = useState('scanner');
  const [form, setForm] = useState({
    name: '', sku: '', price: '', quantity: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleModeChange = (event, newMode) => {
    if (newMode !== null) setMode(newMode);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const { name, sku, price, quantity } = form;
    if (!name || !sku || !price || !quantity) {
      setErrorMsg('All fields are required.');
      return;
    }

    const { error } = await supabase
      .from('products')
      .insert([{ name, sku, price: parseFloat(price), quantity: parseInt(quantity, 10) }]);

    if (error) setErrorMsg(error.message);
    else {
      setSuccessMsg('Product added successfully.');
      setForm({ name: '', sku: '', price: '', quantity: '' });
    }
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>Add Product</Typography>

      <Box sx={{ my: 2 }}>
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={handleModeChange}
          aria-label="entry mode"
        >
          <ToggleButton value="manual" aria-label="manual entry">
            Manual Entry
          </ToggleButton>
          <ToggleButton value="scanner" aria-label="barcode scanner">
            Scan Barcode
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {errorMsg && <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>}
      {successMsg && <Alert severity="success" sx={{ mb: 2 }}>{successMsg}</Alert>}

      {mode === 'manual' && (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400 }}>
          <TextField
            label="Name" name="name" value={form.name}
            onChange={handleInputChange} required fullWidth margin="normal"
          />
          <TextField
            label="SKU" name="sku" value={form.sku}
            onChange={handleInputChange} required fullWidth margin="normal"
          />
          <TextField
            label="Price" name="price" type="number" value={form.price}
            onChange={handleInputChange} required fullWidth margin="normal"
          />
          <TextField
            label="Quantity" name="quantity" type="number"
            value={form.quantity} onChange={handleInputChange}
            required fullWidth margin="normal"
          />
          <Button type="submit" variant="contained">Create Product</Button>
        </Box>
      )}

      {mode === 'scanner' && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="body1">
            📸 Barcode scanner UI goes here. We’ll integrate your scanner flow here later.
          </Typography>
        </Box>
      )}
    </>
  );
}
