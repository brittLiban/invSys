'use client';

import { useEffect, useState } from 'react';
import supabase from '../lib/supabaseClient';
import {
  Typography, CircularProgress, TextField,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Box
} from '@mui/material';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ name: '', sku: '', barcode: '' });

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (error) console.error('❌ Fetch error:', error.message);
      else setProducts(data);
      setLoading(false);
    })();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredProducts = products.filter((product) => {
    return (
      product.name?.toLowerCase().includes(filters.name.toLowerCase()) &&
      product.sku?.toLowerCase().includes(filters.sku.toLowerCase()) &&
      product.barcode?.toLowerCase().includes(filters.barcode.toLowerCase())
    );
  });

  return (
    <>
      <Typography variant="h4" gutterBottom>Inventory</Typography>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
        <TextField
          label="Filter by Name"
          name="name"
          value={filters.name}
          onChange={handleFilterChange}
        />
        <TextField
          label="Filter by SKU"
          name="sku"
          value={filters.sku}
          onChange={handleFilterChange}
        />
        <TextField
          label="Filter by Barcode"
          name="barcode"
          value={filters.barcode}
          onChange={handleFilterChange}
        />
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>SKU</strong></TableCell>
                <TableCell><strong>Barcode</strong></TableCell>
                <TableCell><strong>Price</strong></TableCell>
                <TableCell><strong>Quantity</strong></TableCell>
                <TableCell><strong>Created At</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6}>No matching products found.</TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.sku}</TableCell>
                    <TableCell>{product.barcode || '-'}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>{new Date(product.created_at).toLocaleString()}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
