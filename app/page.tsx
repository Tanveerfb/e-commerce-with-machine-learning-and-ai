"use client";

import { useState } from "react";
import { Box, Button, Chip, Container, Stack, Typography } from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import StorefrontIcon from "@mui/icons-material/Storefront";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import AuthModal from "@/components/auth/AuthModal";
import { useAuth } from "@/contexts/AuthContext";

export default function HomePage() {
  const { user } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          background:
            "linear-gradient(135deg, #1565C0 0%, #283593 60%, #1A237E 100%)",
          color: "white",
          py: { xs: 10, md: 16 },
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Chip
            icon={<AutoAwesomeIcon sx={{ fontSize: 16 }} />}
            label="Powered by Machine Learning"
            size="small"
            sx={{
              bgcolor: "rgba(255,255,255,0.15)",
              color: "white",
              mb: 3,
              fontWeight: 500,
            }}
          />

          <Typography
            variant="h2"
            sx={{
              mb: 2,
              lineHeight: 1.2,
              fontSize: { xs: "2.2rem", md: "3.5rem" },
              fontWeight: 800,
            }}
          >
            Your AI-Powered
            <br />
            Shopping Experience
          </Typography>

          <Typography
            variant="h6"
            sx={{
              mb: 5,
              color: "rgba(255,255,255,0.8)",
              fontWeight: 400,
              maxWidth: 520,
              mx: "auto",
              fontSize: { xs: "1rem", md: "1.15rem" },
            }}
          >
            Discover products curated by intelligent recommendations, tailored
            to your taste.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ justifyContent: "center" }}
          >
            {user ? (
              <Button
                variant="contained"
                size="large"
                href="/products"
                startIcon={<StorefrontIcon />}
                sx={{
                  bgcolor: "white",
                  color: "primary.dark",
                  fontWeight: 700,
                  px: 4,
                  "&:hover": { bgcolor: "grey.100" },
                }}
              >
                Browse Products
              </Button>
            ) : (
              <>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => setAuthOpen(true)}
                  startIcon={<RocketLaunchIcon />}
                  sx={{
                    bgcolor: "white",
                    color: "primary.dark",
                    fontWeight: 700,
                    px: 4,
                    "&:hover": { bgcolor: "grey.100" },
                  }}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  href="/products"
                  sx={{
                    borderColor: "rgba(255,255,255,0.6)",
                    color: "white",
                    px: 4,
                    "&:hover": {
                      borderColor: "white",
                      bgcolor: "rgba(255,255,255,0.08)",
                    },
                  }}
                >
                  Browse as Guest
                </Button>
              </>
            )}
          </Stack>
        </Container>
      </Box>

      {/* Auth prompt for unauthenticated users */}
      {!user && (
        <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.default" }}>
          <Container maxWidth="sm" sx={{ textAlign: "center" }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
              Sign in to unlock personalized picks
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Create a free account to get AI-driven recommendations, save your
              favourites, and check out faster.
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ justifyContent: "center" }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={() => setAuthOpen(true)}
                sx={{ px: 5, fontWeight: 600 }}
              >
                Sign In / Sign Up
              </Button>
            </Stack>
          </Container>
        </Box>
      )}

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
