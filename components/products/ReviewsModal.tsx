"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  IconButton,
  Rating,
  Box,
  Divider,
  Chip,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import type { Product } from "@/types/product";

interface ReviewsModalProps {
  product: Product | null;
  onClose: () => void;
}

function averageRating(ratings: number[]): number {
  if (!ratings.length) return 0;
  return ratings.reduce((a, b) => a + b, 0) / ratings.length;
}

function ratingColor(rating: number): "success" | "warning" | "error" {
  if (rating >= 4) return "success";
  if (rating === 3) return "warning";
  return "error";
}

export default function ReviewsModal({ product, onClose }: ReviewsModalProps) {
  if (!product) return null;

  const ratings = product.reviews.map((r) => r.rating);
  const avg = averageRating(ratings);

  return (
    <Dialog
      open={Boolean(product)}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{ paper: { sx: { borderRadius: 3 } } }}
    >
      <DialogTitle sx={{ pr: 6 }}>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{ mb: 0.25 }}
        >
          Customer Reviews
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
          {product.item_name}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
          <Rating value={avg} precision={0.5} readOnly size="small" />
          <Typography variant="body2" color="text.secondary">
            {avg.toFixed(1)} out of 5
          </Typography>
          <Chip
            label={`${product.reviews.length} review${product.reviews.length !== 1 ? "s" : ""}`}
            size="small"
            variant="outlined"
          />
        </Box>

        <IconButton
          aria-label="close"
          onClick={onClose}
          size="small"
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            color: "text.secondary",
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ p: 0 }}>
        {product.reviews.length === 0 ? (
          <Box sx={{ p: 3 }}>
            <Alert severity="info">No reviews yet for this product.</Alert>
          </Box>
        ) : (
          <List disablePadding>
            {product.reviews.map((review, idx) => (
              <Box key={`${review.user_id}-${idx}`}>
                <ListItem alignItems="flex-start" sx={{ px: 3, py: 2 }}>
                  <ListItemAvatar>
                    <Avatar
                      sx={{ bgcolor: "primary.light", width: 36, height: 36 }}
                    >
                      <PersonIcon sx={{ fontSize: 20 }} />
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
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {review.user_id.replace("user_", "User #")}
                        </Typography>
                        <Chip
                          label={`${review.rating}/5`}
                          size="small"
                          color={ratingColor(review.rating)}
                          sx={{
                            height: 18,
                            fontSize: "0.65rem",
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
                          sx={{ mt: 0.5, lineHeight: 1.5 }}
                        >
                          {review.comment}
                        </Typography>
                      ) : (
                        <Typography
                          variant="body2"
                          color="text.disabled"
                          sx={{ mt: 0.5, fontStyle: "italic" }}
                        >
                          No comment left.
                        </Typography>
                      )
                    }
                  />
                </ListItem>
                {idx < product.reviews.length - 1 && (
                  <Divider component="li" sx={{ ml: 9 }} />
                )}
              </Box>
            ))}
          </List>
        )}
      </DialogContent>
    </Dialog>
  );
}
