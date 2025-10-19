import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBlQTeurEJj4OC_hlzyFVZML7UaUTkxB-s",
  authDomain: "react-shop-cbf93.firebaseapp.com",
  projectId: "react-shop-cbf93",
  storageBucket: "react-shop-cbf93.appspot.com",
  messagingSenderId: "512552464737",
  appId: "1:512552464737:web:a18bb58ac2573b7e2a1520",
  measurementId: "G-QFJ6V3J1TD"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };