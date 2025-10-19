import React, { useEffect, useMemo, useState } from 'react';
import { Grid, CircularProgress } from '@mui/material';
import ProductCard from '../components/ProductCard';
import SearchSortBar from '../components/SearchSortBar';
import { fetchProducts } from '../api/products';

export default function Home() {
  const [products, setProducts] = useState(null);
  const [q, setQ] = useState('');
  const [sort, setSort] = useState('default');
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let mounted = true;
    fetchProducts().then(ps => {
      if (!mounted) return;
      setProducts(ps);
      const cats = Array.from(new Set(ps.map(p => p.category)));
      setCategories(cats);
    });
    return () => mounted = false;
  }, []);

  const filtered = useMemo(() => {
    if (!products) return [];
    let arr = products.slice();
    if (q) arr = arr.filter(p => p.title.toLowerCase().includes(q.toLowerCase()));
    if (category) arr = arr.filter(p => p.category === category);
    if (sort === 'price-asc') arr.sort((a,b) => a.price - b.price);
    else if (sort === 'price-desc') arr.sort((a,b) => b.price - a.price);
    else arr.sort((a,b) => b.id - a.id);
    return arr;
  }, [products, q, sort, category]);

  if (!products) return <CircularProgress />;

  return (
    <>
      <SearchSortBar q={q} setQ={setQ} sort={sort} setSort={setSort} category={category} setCategory={setCategory} categories={categories} />
      <Grid container spacing={2}>
        {filtered.map(p => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={p.id}>
            <ProductCard product={p} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
