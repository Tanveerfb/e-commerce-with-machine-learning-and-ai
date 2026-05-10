"use client";

import { useState, useMemo } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
  Stack,
  Divider,
  Pagination,
  Paper,
  SelectChangeEvent,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import ProductCard from "@/components/products/ProductCard";
import ReviewsModal from "@/components/products/ReviewsModal";
import productsData from "@/data/products.json";
import type { Product } from "@/types/product";

const products = productsData as Product[];

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating_desc", label: "Highest Rated" },
  { value: "name_asc", label: "Name: A–Z" },
];

const PAGE_SIZE = 12;

function avgRating(p: Product) {
  if (!p.reviews.length) return 0;
  return p.reviews.reduce((s, r) => s + r.rating, 0) / p.reviews.length;
}

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);
  const [reviewProduct, setReviewProduct] = useState<Product | null>(null);

  // Derive unique categories
  const categories = useMemo(
    () => [
      "All",
      ...Array.from(new Set(products.map((p) => p.category))).sort(),
    ],
    [],
  );

  // Filter + sort
  const filtered = useMemo(() => {
    let list = [...products];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.item_name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.subCategory.toLowerCase().includes(q),
      );
    }

    if (category !== "All") {
      list = list.filter((p) => p.category === category);
    }

    switch (sort) {
      case "price_asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating_desc":
        list.sort((a, b) => avgRating(b) - avgRating(a));
        break;
      case "name_asc":
        list.sort((a, b) => a.item_name.localeCompare(b.item_name));
        break;
    }

    return list;
  }, [search, category, sort]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    setPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleSortChange = (e: SelectChangeEvent) => {
    setSort(e.target.value);
    setPage(1);
  };

  return (
    <>
      {/* Page Header */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          py: { xs: 5, md: 7 },
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
            All Products
          </Typography>
          <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.8)" }}>
            {products.length} products across {categories.length - 1} categories
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
        {/* Controls */}
        <Paper
          elevation={0}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            p: { xs: 2, md: 3 },
            mb: 4,
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            sx={{ alignItems: { md: "center" } }}
          >
            {/* Search */}
            <TextField
              placeholder="Search products…"
              value={search}
              onChange={handleSearchChange}
              size="small"
              sx={{ flex: 1 }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                },
              }}
            />

            {/* Sort */}
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel id="sort-label">
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <TuneIcon sx={{ fontSize: 16 }} /> Sort By
                </Box>
              </InputLabel>
              <Select
                labelId="sort-label"
                value={sort}
                onChange={handleSortChange}
                label="Sort By"
              >
                {SORT_OPTIONS.map((o) => (
                  <MenuItem key={o.value} value={o.value}>
                    {o.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <Divider sx={{ my: 2 }} />

          {/* Category filter chips */}
          <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
            {categories.map((cat) => (
              <Chip
                key={cat}
                label={cat}
                clickable
                variant={category === cat ? "filled" : "outlined"}
                color={category === cat ? "primary" : "default"}
                onClick={() => handleCategoryChange(cat)}
                size="small"
              />
            ))}
          </Stack>
        </Paper>

        {/* Results count */}
        <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Showing{" "}
            <strong>
              {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–
              {Math.min(page * PAGE_SIZE, filtered.length)}
            </strong>{" "}
            of <strong>{filtered.length}</strong> results
          </Typography>
          {(search || category !== "All") && (
            <Chip
              label="Clear filters"
              size="small"
              variant="outlined"
              color="error"
              onDelete={() => {
                setSearch("");
                setCategory("All");
                setPage(1);
              }}
              onClick={() => {
                setSearch("");
                setCategory("All");
                setPage(1);
              }}
            />
          )}
        </Box>

        {/* Product Grid */}
        {paginated.length > 0 ? (
          <Grid container spacing={3}>
            {paginated.map((product) => (
              <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <ProductCard
                  product={product}
                  onReviewsClick={setReviewProduct}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box
            sx={{
              textAlign: "center",
              py: 12,
              color: "text.secondary",
            }}
          >
            <Typography variant="h6" sx={{ mb: 1 }}>
              No products found
            </Typography>
            <Typography variant="body2">
              Try adjusting your search or filter.
            </Typography>
          </Box>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, v) => {
                setPage(v);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              color="primary"
              shape="rounded"
            />
          </Box>
        )}
      </Container>

      {/* Reviews Modal */}
      <ReviewsModal
        product={reviewProduct}
        onClose={() => setReviewProduct(null)}
      />
    </>
  );
}
