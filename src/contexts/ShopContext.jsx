import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { decrementStock } from '../api/products';
import dayjs from 'dayjs';

export const ShopContext = createContext();

function key(uid, name) {
  return `rs_${uid || 'anon'}_${name}_v1`;
}

export function ShopProvider({ children }) {
  const { user } = useContext(AuthContext);
  const uid = user?.uid || 'anon';

  const [cart, setCart] = useState(() => {
    const raw = localStorage.getItem(key(uid, 'cart'));
    return raw ? JSON.parse(raw) : [];
  });
  const [wishlist, setWishlist] = useState(() => {
    const raw = localStorage.getItem(key(uid, 'wishlist'));
    return raw ? JSON.parse(raw) : [];
  });
  const [addresses, setAddresses] = useState(() => {
    const raw = localStorage.getItem(key(uid, 'addresses'));
    return raw ? JSON.parse(raw) : [];
  });
  const [orders, setOrders] = useState(() => {
    const raw = localStorage.getItem(key(uid, 'orders'));
    return raw ? JSON.parse(raw) : [];
  });

  
  useEffect(() => {
    localStorage.setItem(key(uid, 'cart'), JSON.stringify(cart));
  }, [cart, uid]);
  useEffect(() => {
    localStorage.setItem(key(uid, 'wishlist'), JSON.stringify(wishlist));
  }, [wishlist, uid]);
  useEffect(() => {
    localStorage.setItem(key(uid, 'addresses'), JSON.stringify(addresses));
  }, [addresses, uid]);
  useEffect(() => {
    localStorage.setItem(key(uid, 'orders'), JSON.stringify(orders));
  }, [orders, uid]);

  
  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem(key(uid, 'cart')) || '[]'));
    setWishlist(JSON.parse(localStorage.getItem(key(uid, 'wishlist')) || '[]'));
    setAddresses(JSON.parse(localStorage.getItem(key(uid, 'addresses')) || '[]'));
    setOrders(JSON.parse(localStorage.getItem(key(uid, 'orders')) || '[]'));
  }, [uid]);

  function addToCart(product, qty = 1) {
    
    if (product.stock === 0) return false;
    setCart(prev => {
      const existing = prev.find(i => i.productId === product.id);
      if (existing) {
        return prev.map(i =>
          i.productId === product.id ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [...prev, { productId: product.id, title: product.title, price: product.price, quantity: qty }];
    });
    return true;
  }

  function removeFromCart(productId) {
    setCart(prev => prev.filter(i => i.productId !== productId));
  }

  function updateCartQty(productId, qty) {
    setCart(prev => prev.map(i => (i.productId === productId ? { ...i, quantity: qty } : i)));
  }

  function addToWishlist(product) {
    if (product.stock === 0) return false;
    setWishlist(prev => (prev.includes(product.id) ? prev : [...prev, product.id]));
    return true;
  }

  function removeFromWishlist(productId) {
    setWishlist(prev => prev.filter(id => id !== productId));
  }

  function addAddress(address) {
    const id = Date.now();
    setAddresses(prev => [...prev, { id, ...address }]);
    return id;
  }

  function updateAddress(id, updated) {
    setAddresses(prev => prev.map(a => (a.id === id ? { ...a, ...updated } : a)));
  }

  function deleteAddress(id) {
    setAddresses(prev => prev.filter(a => a.id !== id));
  }

  
  function confirmOrder(addressId) {
    if (!user) throw new Error('Not authenticated');
    if (cart.length === 0) throw new Error('Cart empty');

    const newOrder = {
      id: `ord_${Date.now()}`,
      items: cart.map(i => ({ ...i })),
      addressId,
      status: 'On Process',
      createdAt: dayjs().toISOString(),
      userEmail: user.email
    };

    
    newOrder.items.forEach(i => decrementStock(i.productId, i.quantity));

    setOrders(prev => [newOrder, ...prev]);
    setCart([]); 
    const global = JSON.parse(localStorage.getItem('rs_global_orders_v1') || '[]');
    localStorage.setItem('rs_global_orders_v1', JSON.stringify([newOrder, ...global]));
    return newOrder;
  }

  function getMyOrders() {
    return orders;
  }

  
  function adminUpdateOrderStatus(orderId, status) {
    
    const global = JSON.parse(localStorage.getItem('rs_global_orders_v1') || '[]');
    const gupdated = global.map(o => (o.id === orderId ? { ...o, status } : o));
    localStorage.setItem('rs_global_orders_v1', JSON.stringify(gupdated));
    setOrders(prev => prev.map(o => (o.id === orderId ? { ...o, status } : o)));
  }

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        addresses,
        orders,
        addToCart,
        removeFromCart,
        updateCartQty,
        addToWishlist,
        removeFromWishlist,
        addAddress,
        updateAddress,
        deleteAddress,
        confirmOrder,
        getMyOrders,
        adminUpdateOrderStatus
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}