import React from 'react';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function SearchSortBar({ q, setQ, sort, setSort, category, setCategory, categories }) {
  return (
    <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
      <TextField label="Search products" value={q} onChange={e => setQ(e.target.value)} sx={{ flex: 1 }} />
      <FormControl sx={{ minWidth: 180 }}>
        <InputLabel>Sort</InputLabel>
        <Select value={sort} label="Sort" onChange={e => setSort(e.target.value)}>
          <MenuItem value="default">Newest</MenuItem>
          <MenuItem value="price-asc">Price: Low to High</MenuItem>
          <MenuItem value="price-desc">Price: High to Low</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 160 }}>
        <InputLabel>Category</InputLabel>
        <Select value={category ?? ''} label="Category" onChange={e => setCategory(e.target.value || null)}>
          <MenuItem value="">All</MenuItem>
          {categories.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
        </Select>
      </FormControl>
    </Box>
  );
}