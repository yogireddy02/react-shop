# React Shop

A full-featured **React E-commerce simulation** using **FakeStoreAPI**, **Firebase Google Authentication**, and **Material-UI (MUI)**.  
Includes **product management**, **cart/wishlist**, **user dashboard**, and **admin simulation**.

---

## 🌟 Features

### Product Management
- Fetch products dynamically from [FakeStoreAPI](https://fakestoreapi.com/).  
- Random stock assigned per product (stored in `localStorage`).  
- Display all products in a responsive MUI card layout.  
- Products with stock = 0:
  - Cannot be added to cart.
  - Cannot be added to wishlist.  
- Dynamic **search** and **sorting** (by price, stock, etc.).

### Cart & Checkout
- Add products to cart with quantity management.  
- Cart drawer with total price calculation.  
- Checkout flow with **saved addresses**.  
- Orders stored in **localStorage** with **status tracking** (On Process → Shipped → Delivered).  

### Wishlist
- Users can save products to wishlist.  
- Products in wishlist are user-specific.  

### Authentication & User Dashboard
- Login with **Google OAuth** via Firebase.  
- After login, users see **My Dashboard**:
  - Wishlist  
  - Cart  
  - Order history  
- Admin users can update **order status**.  

### Admin Simulation
- Admin emails specified in `AuthContext`.  
- Admins can view and update order status.

---

## 🛠 Tech Stack

- **Frontend:** React.js, React Router v6, Material-UI (MUI v5)  
- **Backend API:** [FakeStoreAPI](https://fakestoreapi.com/) (public)  
- **Authentication:** Firebase Google OAuth  
- **State Management:** React Context API  
- **Storage:** `localStorage` for stock, cart, wishlist, and orders  

---

## ⚡ Project Structure

src/
├─ components/
│ ├─ Header.jsx
│ ├─ CartDrawer.jsx
│ ├─ ProductCard.jsx
│ └─ SearchSortBar.jsx
├─ contexts/
│ ├─ AuthContext.jsx
│ └─ ShopContext.jsx
├─ pages/
│ ├─ AdminOrders.jsx
│ ├─ Checkout.jsx
│ ├─ Dashboard.jsx
│ ├─ Home.jsx
│ └─ Login.jsx
├─ services/
│ └─ products.js
├─ firebase.js
├─ App.jsx
└─ main.jsx


---

## ⚡ Installation & Setup

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd <your-project-folder>

2. **Install dependencies**
npm install

3. **Configure Firebase**

Create a Firebase project at {https://console.firebase.google.com/}
Enable Google Authentication.
Replace firebaseConfig in src/firebase.js with your project’s credentials.

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MSG_SENDER_ID",
  appId: "YOUR_APP_ID",
};

4. **Start the app**
``bash

npm run dev

---

📝 Author

Yogavardhan Reddy
Portfolio: https://yogi-portfolio-02.netlify.app
LinkedIn: https://www.linkedin.com/in/yogavardhanreddy