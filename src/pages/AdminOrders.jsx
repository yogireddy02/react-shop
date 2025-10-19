import React, { useEffect, useState, useContext } from 'react';
import { Box, Typography, Card, CardContent, Button, Select, MenuItem } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';
import { ShopContext } from '../contexts/ShopContext';

export default function AdminOrders() {
  const { user } = useContext(AuthContext);
  const { adminUpdateOrderStatus } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const global = JSON.parse(localStorage.getItem('rs_global_orders_v1') || '[]');
    setOrders(global);
    const onStorage = () => setOrders(JSON.parse(localStorage.getItem('rs_global_orders_v1') || '[]'));
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const handleChange = (id, status) => {
    const g = orders.map(o => (o.id === id ? { ...o, status } : o));
    localStorage.setItem('rs_global_orders_v1', JSON.stringify(g));
    setOrders(g);
    adminUpdateOrderStatus(id, status);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Admin Orders</Typography>
      {orders.length === 0 && <Typography>No orders placed yet</Typography>}
      {orders.map(o => (
        <Card sx={{ mb: 2 }} key={o.id}>
          <CardContent>
            <Typography variant="subtitle1">Order {o.id}</Typography>
            <Typography>By: {o.userEmail}</Typography>
            <Typography>Items: {o.items.map(i => `${i.title || i.productId} x${i.quantity}`).join(', ')}</Typography>
            <Typography>Status: {o.status}</Typography>
            <Select value={o.status} onChange={e => handleChange(o.id, e.target.value)} sx={{ mt: 1 }}>
              <MenuItem value="On Process">On Process</MenuItem>
              <MenuItem value="Shipped">Shipped</MenuItem>
              <MenuItem value="Delivered">Delivered</MenuItem>
            </Select>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
