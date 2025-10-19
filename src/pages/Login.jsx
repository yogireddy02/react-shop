import React, { useContext } from 'react';
import { Box, Button, Typography, Avatar } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { signInGoogle, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handle = async () => {
    try {
      await signInGoogle();
      navigate('/dashboard');
    } catch (e) {
      console.error(e);
      alert('Login failed: ' + e.message);
    }
  };

  return (
    <Box textAlign="center">
      <Typography variant="h4" sx={{ mb: 2 }}>Login</Typography>
      {user ? (
        <Box>
          <Avatar src={user.photoURL} sx={{ width: 80, height: 80, mx: 'auto' }} />
          <Typography sx={{ mt: 1 }}>{user.name}</Typography>
          <Typography variant="body2">{user.email}</Typography>
        </Box>
      ) : (
        <Button variant="contained" startIcon={<GoogleIcon />} onClick={handle}>Sign in with Google</Button>
      )}
    </Box>
  );
}
