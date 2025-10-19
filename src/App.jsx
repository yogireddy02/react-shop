import React,{useContext} from 'react';
import {Routes,Route,Navigate} from 'react-router-dom';
import { Container } from '@mui/material';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Checkout from './pages/Checkout';
import AdminOrders from './pages/AdminOrders';
import { AuthContext } from './contexts/AuthContext';
function App() {
  const {user} = useContext(AuthContext)

  return (
    <>
      <Header />
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={user ? <Checkout /> : <Navigate to="/login" />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/admin-orders" element={user && user.isAdmin ? <AdminOrders /> : <Navigate to="/" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </>
  )
}

export default App
