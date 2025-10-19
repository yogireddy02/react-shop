import React, { useContext } from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  List,
  ListItem,
  TextField,
  ListItemText
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ShopContext } from '../contexts/ShopContext';
import { useNavigate } from 'react-router-dom';

function CartDrawer({ open, onClose }) { 
  const { cart, removeFromCart, updateCartQty } = useContext(ShopContext);
  const navigate = useNavigate();

  const total = cart.reduce((s, i) => s + i.quantity * i.price, 0);

  const handleClose = () => {
    if (onClose) onClose();
  };

  return (
    <Drawer anchor="right" open={open} onClose={handleClose}>
      <Box sx={{ width: 380, p: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Cart</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <List>
          {cart.length === 0 && (
            <Typography sx={{ mt: 2 }}>Cart is empty</Typography>
          )}
          {cart.map((item) => (
            <ListItem
              key={item.productId}
              secondaryAction={
                <Button onClick={() => removeFromCart(item.productId)}>
                  Remove
                </Button>
              }
            >
              <ListItemText
                primary={item.title}
                secondary={
                  <>
                    <div>₹{item.price} x</div>
                    <TextField
                      type="number"
                      inputProps={{ min: 1 }}
                      value={item.quantity}
                      onChange={(e) =>
                        updateCartQty(
                          item.productId,
                          Math.max(1, Number(e.target.value))
                        )
                      }
                      size="small"
                      sx={{ width: 80 }}
                    />
                  </>
                }
              />
            </ListItem>
          ))}
        </List>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Total: ₹{total}</Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 1 }}
            onClick={() => {
              handleClose();
              navigate('/checkout');
            }}
          >
            Checkout
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}

export default CartDrawer;
