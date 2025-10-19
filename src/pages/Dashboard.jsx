import React, { useContext, useEffect, useState } from 'react';
import { Grid, Typography, Card, CardContent, Button, List, ListItem, ListItemText } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';
import { ShopContext } from '../contexts/ShopContext';
import { fetchProducts } from '../api/products';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const { wishlist, cart, removeFromCart, updateCartQty, removeFromWishlist, orders } = useContext(ShopContext);

  const [productsById, setProductsById] = useState({});

  useEffect(() => {
    let mounted = true;
    fetchProducts().then(ps => {
      if (!mounted) return;
      const map = {};
      ps.forEach(p => (map[p.id] = p));
      setProductsById(map);
    });
    return () => (mounted = false);
  }, []);

  return (
    <>
      <Typography variant="h4" gutterBottom>My Dashboard</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Wishlist</Typography>
              <List>
                {wishlist.length === 0 && <Typography>No items in wishlist</Typography>}
                {wishlist.map(pid => {
                  const p = productsById[pid];
                  return p ? (
                    <ListItem key={pid} secondaryAction={<Button onClick={() => removeFromWishlist(pid)}>Remove</Button>}>
                      <ListItemText primary={p.title} secondary={`₹${p.price}`} />
                    </ListItem>
                  ) : null;
                })}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Cart</Typography>
              <List>
                {cart.length === 0 && <Typography>Cart is empty</Typography>}
                {cart.map(item => (
                  <ListItem key={item.productId}>
                    <ListItemText primary={item.title} secondary={`₹${item.price} x ${item.quantity}`} />
                    <Button onClick={() => updateCartQty(item.productId, Math.max(1, item.quantity - 1))}>-</Button>
                    <Button onClick={() => updateCartQty(item.productId, item.quantity + 1)}>+</Button>
                    <Button onClick={() => removeFromCart(item.productId)}>Remove</Button>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Order History</Typography>
              {orders.length === 0 && <Typography>No orders yet</Typography>}
              <List>
                {orders.map(o => (
                  <ListItem key={o.id}>
                    <ListItemText
                      primary={`Order ${o.id} — ${o.items.reduce((s, it) => s + it.quantity, 0)} items`}
                      secondary={`Status: ${o.status} • ${new Date(o.createdAt).toLocaleString()}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}