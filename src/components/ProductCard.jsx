import React, { useContext } from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Chip } from '@mui/material';
import { ShopContext } from '../contexts/ShopContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function ProductCard({ product }) {
  const { addToCart, addToWishlist } = useContext(ShopContext);

  const outOfStock = product.stock === 0;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="180" image={product.image} alt={product.title} sx={{ objectFit: 'contain', p: 2 }} />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" noWrap>{product.title}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ height: 48, overflow: 'hidden' }}>{product.description}</Typography>
        <Typography variant="subtitle1" sx={{ mt: 1 }}>₹{product.price}</Typography>
        {outOfStock ? <Chip label="Out of stock" color="error" sx={{ mt: 1 }} /> : <Chip label={`In stock: ${product.stock}`} sx={{ mt: 1 }} />}
      </CardContent>
      <CardActions>
        <Button size="small" startIcon={<AddShoppingCartIcon />} disabled={outOfStock} onClick={() => addToCart(product)}>
          {outOfStock ? 'Unavailable' : 'Add to Cart'}
        </Button>
        <Button size="small" startIcon={<FavoriteIcon />} disabled={outOfStock} onClick={() => addToWishlist(product)}>
          Wishlist
        </Button>
      </CardActions>
    </Card>
  );
}
