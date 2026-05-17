"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { useSellerAuth } from "@/contexts/SellerAuthContext";
import SellerLoginModal from "@/components/seller/SellerLoginModal";

interface SellerGuardProps {
  children: React.ReactNode;
}

/**
 * Wraps any page that requires seller/admin credentials.
 * Shows a full-page lock gate until the user authenticates.
 * Completely independent of the Firebase auth layer.
 */
export default function SellerGuard({ children }: SellerGuardProps) {
  const { isSellerAuthed, loading } = useSellerAuth();
  const [modalOpen, setModalOpen] = useState(false);

  // Still verifying the existing session cookie
  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isSellerAuthed) {
    return <>{children}</>;
  }

  return (
    <>
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
        }}
      >
        <Container maxWidth="xs" sx={{ textAlign: "center" }}>
          <Box
            sx={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              bgcolor: "primary.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 3,
            }}
          >
            <LockIcon sx={{ fontSize: 36, color: "white" }} />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              mb: 1,
            }}
          >
            <StorefrontIcon color="primary" />
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Seller Portal
            </Typography>
          </Box>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            This area is restricted to authorised sellers. Please sign in with
            your seller credentials to continue.
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={() => setModalOpen(true)}
            sx={{ px: 5, textTransform: "none", fontWeight: 600 }}
          >
            Sign In as Seller
          </Button>
        </Container>
      </Box>

      <SellerLoginModal
        open={modalOpen}
        onSuccess={() => setModalOpen(false)}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
