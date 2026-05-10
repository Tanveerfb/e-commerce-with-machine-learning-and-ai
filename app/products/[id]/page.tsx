"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Chip,
  Rating,
  Divider,
  Paper,
  Stack,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Breadcrumbs,
  Link as MuiLink,
  Alert,
  Tab,
  Tabs,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PersonIcon from "@mui/icons-material/Person";
import StarIcon from "@mui/icons-material/Star";
import productsData from "@/data/products.json";
import type { Product } from "@/types/product";
import { use } from "react";

const products = productsData as Product[];

interface PageProps {
  params: Promise<{ id: string }>;
}

function avgRating(p: Product) {
  if (!p.reviews.length) return 0;
  return p.reviews.reduce((s, r) => s + r.rating, 0) / p.reviews.length;
}

function ratingColor(rating: number): "success" | "warning" | "error" {
  if (rating >= 4) return "success";
  if (rating === 3) return "warning";
  return "error";
}

function RatingBreakdown({ product }: { product: Product }) {
  const counts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: product.reviews.filter((r) => r.rating === star).length,
  }));
  const total = product.reviews.length;

  return (
    <Stack spacing={0.75}>
      {counts.map(({ star, count }) => (
        <Box key={star} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="caption" sx={{ minWidth: 8 }}>
            {star}
          </Typography>
          <StarIcon sx={{ fontSize: 14, color: "warning.main" }} />
          <Box
            sx={{
              flex: 1,
              height: 6,
              bgcolor: "grey.200",
              borderRadius: 1,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                width: total ? `${(count / total) * 100}%` : "0%",
                height: "100%",
                bgcolor: "warning.main",
                borderRadius: 1,
                transition: "width 0.4s",
              }}
            />
          </Box>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ minWidth: 16 }}
          >
            {count}
          </Typography>
        </Box>
      ))}
    </Stack>
  );
}

export default function ProductDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id);

  if (!product) notFound();

  const [activePhoto, setActivePhoto] = useState(0);
  const [imgError, setImgError] = useState<Record<number, boolean>>({});
  const [tab, setTab] = useState(0);

  const avg = avgRating(product);
  const inStock = product.quantity > 0;
  const lowStock = product.quantity > 0 && product.quantity <= 10;

  const photos = product.photoURL.length
    ? product.photoURL
    : [`https://picsum.photos/seed/${product.id}/600/600`];

  const currentPhoto = imgError[activePhoto]
    ? `https://picsum.photos/seed/${product.id}_${activePhoto}/600/600`
    : photos[activePhoto];

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <MuiLink href="/" underline="hover" color="inherit" variant="body2">
          Home
        </MuiLink>
        <MuiLink
          href="/products"
          underline="hover"
          color="inherit"
          variant="body2"
        >
          Products
        </MuiLink>
        <MuiLink
          href={`/products?category=${encodeURIComponent(product.category)}`}
          underline="hover"
          color="inherit"
          variant="body2"
        >
          {product.category}
        </MuiLink>
        <Typography variant="body2" color="text.primary">
          {product.item_name}
        </Typography>
      </Breadcrumbs>

      <Grid container spacing={5}>
        {/* ── Left: Images ── */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Paper
            elevation={0}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
              overflow: "hidden",
              position: "relative",
              bgcolor: "grey.50",
              height: { xs: 300, sm: 420, md: 460 },
            }}
          >
            <Image
              src={currentPhoto}
              alt={product.item_name}
              fill
              style={{ objectFit: "contain", padding: 16 }}
              sizes="(max-width:900px) 100vw, 50vw"
              priority
              onError={() =>
                setImgError((prev) => ({ ...prev, [activePhoto]: true }))
              }
            />
          </Paper>

          {/* Thumbnails */}
          {photos.length > 1 && (
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              {photos.map((url, idx) => (
                <Box
                  key={idx}
                  onClick={() => setActivePhoto(idx)}
                  sx={{
                    width: 68,
                    height: 68,
                    flexShrink: 0,
                    position: "relative",
                    borderRadius: 1.5,
                    overflow: "hidden",
                    border: "2px solid",
                    borderColor:
                      activePhoto === idx ? "primary.main" : "divider",
                    cursor: "pointer",
                    bgcolor: "grey.100",
                    transition: "border-color 0.15s",
                  }}
                >
                  <Image
                    src={
                      imgError[idx]
                        ? `https://picsum.photos/seed/${product.id}_${idx}/600/600`
                        : url
                    }
                    alt={`${product.item_name} view ${idx + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="68px"
                    onError={() =>
                      setImgError((prev) => ({ ...prev, [idx]: true }))
                    }
                  />
                </Box>
              ))}
            </Stack>
          )}
        </Grid>

        {/* ── Right: Details ── */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Stack spacing={2.5}>
            {/* Category tags */}
            <Stack direction="row" spacing={1}>
              <Chip
                label={product.category}
                size="small"
                color="primary"
                variant="outlined"
              />
              <Chip
                label={product.subCategory}
                size="small"
                variant="outlined"
              />
            </Stack>

            {/* Title */}
            <Typography variant="h4" sx={{ fontWeight: 800, lineHeight: 1.25 }}>
              {product.item_name}
            </Typography>

            {/* Rating summary */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Rating value={avg} precision={0.5} readOnly />
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {avg > 0 ? avg.toFixed(1) : "No ratings"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ({product.reviews.length}{" "}
                {product.reviews.length === 1 ? "review" : "reviews"})
              </Typography>
            </Box>

            <Divider />

            {/* Price */}
            <Box>
              <Typography
                variant="h3"
                color="primary.main"
                sx={{ fontWeight: 800 }}
              >
                ${product.price.toFixed(2)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Seller ID: {product.seller_id}
              </Typography>
            </Box>

            {/* Stock status */}
            {inStock ? (
              <Chip
                icon={<InventoryIcon sx={{ fontSize: 16 }} />}
                label={
                  lowStock
                    ? `Only ${product.quantity} left in stock`
                    : `In Stock (${product.quantity} available)`
                }
                color={lowStock ? "warning" : "success"}
                variant="outlined"
                sx={{ alignSelf: "flex-start", fontWeight: 600 }}
              />
            ) : (
              <Chip
                icon={<LocalOfferIcon sx={{ fontSize: 16 }} />}
                label="Out of Stock"
                color="error"
                variant="outlined"
                sx={{ alignSelf: "flex-start", fontWeight: 600 }}
              />
            )}

            {/* CTA */}
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                size="large"
                startIcon={<AddShoppingCartIcon />}
                disabled={!inStock}
                sx={{ px: 4, fontWeight: 700, textTransform: "none" }}
              >
                {inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<ArrowBackIcon />}
                href="/products"
                sx={{ textTransform: "none" }}
              >
                Back
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>

      {/* ── Tabs: Details / Reviews ── */}
      <Box sx={{ mt: 6 }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}
        >
          <Tab label="Product Details" />
          <Tab label={`Reviews (${product.reviews.length})`} />
        </Tabs>

        {/* Details tab */}
        {tab === 0 && (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Paper
                elevation={0}
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                  p: 3,
                }}
              >
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  Product Information
                </Typography>
                <Stack spacing={1.5}>
                  {[
                    ["Product ID", product.id],
                    ["Category", product.category],
                    ["Sub-Category", product.subCategory],
                    ["Seller", product.seller_id],
                    ["Stock", `${product.quantity} units`],
                  ].map(([label, value]) => (
                    <Box
                      key={label}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 1,
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        {label}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 500, textAlign: "right" }}
                      >
                        {value}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        )}

        {/* Reviews tab */}
        {tab === 1 && (
          <Grid container spacing={3}>
            {/* Sidebar: aggregate */}
            <Grid size={{ xs: 12, sm: 4, md: 3 }}>
              <Paper
                elevation={0}
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                  p: 3,
                }}
              >
                <Typography
                  variant="h2"
                  sx={{ fontWeight: 800, color: "primary.main" }}
                >
                  {avg > 0 ? avg.toFixed(1) : "—"}
                </Typography>
                <Rating value={avg} precision={0.5} readOnly sx={{ mb: 1 }} />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {product.reviews.length}{" "}
                  {product.reviews.length === 1 ? "review" : "reviews"}
                </Typography>
                <RatingBreakdown product={product} />
              </Paper>
            </Grid>

            {/* List */}
            <Grid size={{ xs: 12, sm: 8, md: 9 }}>
              {product.reviews.length === 0 ? (
                <Alert severity="info">
                  No reviews yet. Be the first to review this product.
                </Alert>
              ) : (
                <Stack spacing={2}>
                  {product.reviews.map((review, idx) => (
                    <Paper
                      key={`${review.user_id}-${idx}`}
                      elevation={0}
                      sx={{
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 2,
                        p: 0,
                        overflow: "hidden",
                      }}
                    >
                      <List disablePadding>
                        <ListItem alignItems="flex-start" sx={{ px: 3, py: 2 }}>
                          <ListItemAvatar>
                            <Avatar
                              sx={{
                                bgcolor: "primary.light",
                                width: 40,
                                height: 40,
                              }}
                            >
                              <PersonIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                  flexWrap: "wrap",
                                }}
                              >
                                <Typography
                                  variant="body2"
                                  sx={{ fontWeight: 700 }}
                                >
                                  {review.user_id.replace("user_", "User #")}
                                </Typography>
                                <Chip
                                  label={`${review.rating}/5`}
                                  size="small"
                                  color={ratingColor(review.rating)}
                                  sx={{
                                    height: 20,
                                    fontSize: "0.7rem",
                                    fontWeight: 700,
                                  }}
                                />
                                <Rating
                                  value={review.rating}
                                  readOnly
                                  size="small"
                                  sx={{ ml: "auto" }}
                                />
                              </Box>
                            }
                            secondary={
                              review.comment ? (
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{ mt: 0.75, lineHeight: 1.6 }}
                                >
                                  &ldquo;{review.comment}&rdquo;
                                </Typography>
                              ) : (
                                <Typography
                                  variant="body2"
                                  color="text.disabled"
                                  sx={{ mt: 0.75, fontStyle: "italic" }}
                                >
                                  No comment left.
                                </Typography>
                              )
                            }
                          />
                        </ListItem>
                      </List>
                    </Paper>
                  ))}
                </Stack>
              )}
            </Grid>
          </Grid>
        )}
      </Box>
    </Container>
  );
}
