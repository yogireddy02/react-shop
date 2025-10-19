import React, { useContext, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Badge,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { ShopContext } from '../contexts/ShopContext';
import CartDrawer from './CartDrawer';

function Header() {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(ShopContext);
  const [anchor, setAnchor] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();

  const openMenu = (e) => setAnchor(e.currentTarget);
  const closeMenu = () => setAnchor(null);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              color: 'inherit',
              textDecoration: 'none',
              flexGrow: 1,
            }}
          >
            React Shop
          </Typography>

          <Button color="inherit" component={RouterLink} to="/">
            Products
          </Button>

          {user ? (
            <>
              
              <IconButton color="inherit" onClick={() => setCartOpen(true)}>
                <Badge
                  badgeContent={cart.reduce((s, i) => s + i.quantity, 0)}
                  color="secondary"
                >
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              
              <IconButton color="inherit" onClick={openMenu}>
                <Avatar src={user.photoURL} alt={user.name} />
              </IconButton>

              <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={closeMenu}>
                <MenuItem
                  onClick={() => {
                    closeMenu();
                    navigate('/dashboard');
                  }}
                >
                  My Dashboard
                </MenuItem>

                {user.isAdmin && (
                  <MenuItem
                    onClick={() => {
                      closeMenu();
                      navigate('/admin-orders');
                    }}
                  >
                    Admin Orders
                  </MenuItem>
                )}

                <MenuItem
                  onClick={() => {
                    closeMenu();
                    logout();
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button color="inherit" component={RouterLink} to="/login">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

export default Header;
