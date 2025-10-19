import React, { useContext, useState } from 'react';
import { Box, Typography, Card, CardContent, TextField, Button, List, ListItem, ListItemText, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { ShopContext } from '../contexts/ShopContext';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { cart, addresses, addAddress, confirmOrder } = useContext(ShopContext);
  const [form, setForm] = useState({ label: '', line1: '', city: '', pincode: '' });
  const [selectedAddress, setSelectedAddress] = useState(addresses.length ? addresses[0].id : null);
  const navigate = useNavigate();

  const handleAdd = () => {
    if (!form.line1 || !form.city || !form.pincode) {
      alert('Fill address fields');
      return;
    }
    const id = addAddress(form);
    setSelectedAddress(id);
    setForm({ label: '', line1: '', city: '', pincode: '' });
  };

  const handleConfirm = () => {
    if (!selectedAddress) {
      alert('Select an address');
      return;
    }
    try {
      const order = confirmOrder(selectedAddress);
      alert('Order placed: ' + order.id);
      navigate('/dashboard');
    } catch (e) {
      alert('Error: ' + e.message);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Checkout</Typography>

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">Cart summary</Typography>
          {cart.length === 0 && <Typography>Your cart is empty</Typography>}
          {cart.map(i => (
            <Typography key={i.productId}>{i.title} — {i.quantity} × ₹{i.price}</Typography>
          ))}
        </CardContent>
      </Card>

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">Select Address</Typography>
          <RadioGroup value={selectedAddress?.toString() || ''} onChange={e => setSelectedAddress(Number(e.target.value))}>
            {addresses.length === 0 && <Typography>No saved addresses. Add one below.</Typography>}
            {addresses.map(a => (
              <FormControlLabel
                key={a.id}
                value={a.id.toString()}
                control={<Radio />}
                label={`${a.label || 'Address'} — ${a.line1}, ${a.city} (${a.pincode})`}
              />
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">Add Address</Typography>
          <TextField label="Label (Home/Office)" value={form.label} onChange={e => setForm({ ...form, label: e.target.value })} fullWidth sx={{ mb: 1 }} />
          <TextField label="Line 1" value={form.line1} onChange={e => setForm({ ...form, line1: e.target.value })} fullWidth sx={{ mb: 1 }} />
          <TextField label="City" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} fullWidth sx={{ mb: 1 }} />
          <TextField label="Pincode" value={form.pincode} onChange={e => setForm({ ...form, pincode: e.target.value })} fullWidth sx={{ mb: 1 }} />
          <Button variant="outlined" onClick={handleAdd}>Add Address</Button>
        </CardContent>
      </Card>

      <Button variant="contained" color="primary" onClick={handleConfirm}>Confirm Order (No Payment)</Button>
    </Box>
  );
}
