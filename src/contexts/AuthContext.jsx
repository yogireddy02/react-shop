import React,{createContext,useEffect,useState} from 'react';
import {auth,provider} from '../firebase';
import { signInWithPopup,signOut } from 'firebase/auth';

export const AuthContext = createContext();

const STORAGE_KEY = 'rs_user-v1';
const ADMIN_EMAILS = ['admin@example.com'];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEY);
  }, [user]);

  const signInGoogle = async () => {
    const res = await signInWithPopup(auth, provider);
    const u = res.user;
    const small = {
      uid: u.uid,
      name: u.displayName,
      email: u.email,
      photoURL: u.photoURL,
      isAdmin: ADMIN_EMAILS.includes(u.email)
    };
    setUser(small);
    return small;
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signInGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}