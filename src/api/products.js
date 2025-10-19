import axios from "axios";

const BASE = "https://fakestoreapi.com"; 
const STORAGE_KEY = "productStock_v1";


function getStockMap() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : {};
}

function setStockMap(map) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}


function ensureStocks(products) {
  const map = getStockMap();
  let changed = false;
  products.forEach((p) => {
    if (map[p.id] === undefined) {
      const seed = p.id * 9301 + 49297;
      const rnd = (seed % 233280) / 233280;
      const stock = Math.floor(rnd * 21);
      map[p.id] = stock;
      changed = true;
    }
  });
  if (changed) setStockMap(map);
  return products.map((p) => ({ ...p, stock: map[p.id] ?? 0 }));
}


export async function fetchProducts() {
  const res = await axios.get(`${BASE}/products`);
  const products = Array.isArray(res.data) ? res.data : [];
  return ensureStocks(products);
}


export async function fetchProduct(id) {
  const res = await axios.get(`${BASE}/products/${id}`);
  const [p] = ensureStocks([res.data]);
  return p;
}

export function decrementStock(productId, qty = 1) {
  const map = getStockMap();
  map[productId] = Math.max(0, (map[productId] || 0) - qty);
  setStockMap(map);
}
