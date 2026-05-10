"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Box,
  Typography,
  Chip,
  Button,
  Rating,
  Divider,
  Tooltip,
} from "@mui/material";
import RateReviewIcon from "@mui/icons-material/RateReview";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import { useRouter } from "next/navigation";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  onReviewsClick: (product: Product) => void;
}

function averageRating(product: Product): number {
  if (!product.reviews.length) return 0;
  return (
    product.reviews.reduce((sum, r) => sum + r.rating, 0) /
    product.reviews.length
  );
}

export default function ProductCard({
  product,
  onReviewsClick,
}: ProductCardProps) {
  const router = useRouter();
  const [imgError, setImgError] = useState(false);
  const avg = averageRating(product);
  const reviewCount = product.reviews.length;
  const inStock = product.quantity > 0;
  const lowStock = product.quantity > 0 && product.quantity <= 10;

  const photo =
    !imgError && product.photoURL.length > 0
      ? product.photoURL[0]
      : `https://picsum.photos/seed/${product.id}/600/600`;

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        transition: "box-shadow 0.2s, transform 0.2s",
        "&:hover": {
          boxShadow: 4,
          transform: "translateY(-2px)",
        },
      }}
    >
      {/* Image */}
      <CardActionArea
        onClick={() => router.push(`/products/${product.id}`)}
        sx={{ position: "relative" }}
      >
        <CardMedia
          sx={{ position: "relative", height: 200, bgcolor: "grey.100" }}
        >
          <Image
            src={photo}
            alt={product.item_name}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width:600px) 100vw, (max-width:960px) 50vw, 25vw"
            onError={() => setImgError(true)}
          />
        </CardMedia>

        {/* Stock badge */}
        {!inStock && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              bgcolor: "rgba(0,0,0,0.45)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Chip
              label="Out of Stock"
              color="error"
              size="small"
              sx={{ fontWeight: 600 }}
            />
          </Box>
        )}
        {lowStock && (
          <Chip
            icon={<InventoryIcon sx={{ fontSize: 14 }} />}
            label={`Only ${product.quantity} left`}
            size="small"
            color="warning"
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              fontWeight: 600,
              fontSize: "0.7rem",
            }}
          />
        )}
      </CardActionArea>

      {/* Content */}
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
          pb: 1,
        }}
      >
        <Chip
          label={product.subCategory}
          size="small"
          variant="outlined"
          sx={{ alignSelf: "flex-start", fontSize: "0.65rem", height: 20 }}
        />

        <Typography
          variant="body1"
          sx={{
            fontWeight: 600,
            lineHeight: 1.35,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            cursor: "pointer",
            "&:hover": { color: "primary.main" },
          }}
          onClick={() => router.push(`/products/${product.id}`)}
        >
          {product.item_name}
        </Typography>

        <Typography
          variant="h6"
          color="primary.main"
          sx={{ fontWeight: 700, mt: 0.5 }}
        >
          ${product.price.toFixed(2)}
        </Typography>

        {/* Rating row */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
          <Rating value={avg} precision={0.5} readOnly size="small" />
          <Typography variant="caption" color="text.secondary">
            {avg > 0 ? avg.toFixed(1) : "—"} ({reviewCount})
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />
        <Divider sx={{ my: 1 }} />

        {/* Actions */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="View Reviews">
            <Button
              size="small"
              variant="outlined"
              startIcon={<RateReviewIcon />}
              onClick={() => onReviewsClick(product)}
              disabled={reviewCount === 0}
              sx={{ flex: 1, textTransform: "none", fontSize: "0.75rem" }}
            >
              Reviews {reviewCount > 0 ? `(${reviewCount})` : ""}
            </Button>
          </Tooltip>

          <Tooltip title={!inStock ? "Out of stock" : "Add to Cart"}>
            <span style={{ flex: 1 }}>
              <Button
                size="small"
                variant="contained"
                startIcon={<AddShoppingCartIcon />}
                disabled={!inStock}
                sx={{
                  width: "100%",
                  textTransform: "none",
                  fontSize: "0.75rem",
                }}
              >
                Add
              </Button>
            </span>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
}
