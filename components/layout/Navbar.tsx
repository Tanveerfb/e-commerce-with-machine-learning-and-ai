"use client";

import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  useScrollTrigger,
  Slide,
  Tooltip,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { useAuth } from "@/contexts/AuthContext";

interface NavbarProps {
  onOpenAuth: () => void;
}

function HideOnScroll({ children }: { children: React.ReactElement }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function Navbar({ onOpenAuth }: NavbarProps) {
  const { user, logOut } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  const handleLogOut = async () => {
    handleMenuClose();
    await logOut();
  };

  const displayName = user?.displayName ?? user?.email?.split("@")[0] ?? "User";
  const avatarLetter = displayName[0].toUpperCase();

  return (
    <HideOnScroll>
      <AppBar
        position="fixed"
        elevation={1}
        sx={{ bgcolor: "background.paper", color: "text.primary" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ gap: 2 }}>
            {/* Logo */}
            <StorefrontIcon sx={{ color: "primary.main", fontSize: 28 }} />
            <Typography
              variant="h6"
              component="a"
              href="/"
              sx={{
                fontWeight: 700,
                letterSpacing: ".08rem",
                color: "primary.main",
                textDecoration: "none",
                flexGrow: { xs: 1, md: 0 },
                mr: { md: 4 },
              }}
            >
              Truqorun
            </Typography>

            {/* Nav Links */}
            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 1 }}
            >
              <Button href="/" color="inherit" size="small">
                Home
              </Button>
              <Button href="/products" color="inherit" size="small">
                Products
              </Button>
              <Button href="/seller-dashboard" color="inherit" size="small">
                Seller Dashboard
              </Button>
            </Box>

            {/* Right Actions */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Tooltip title="Cart">
                <IconButton color="inherit" aria-label="cart">
                  <ShoppingCartIcon />
                </IconButton>
              </Tooltip>

              {user ? (
                <>
                  <Tooltip title={displayName}>
                    <IconButton
                      onClick={handleAvatarClick}
                      size="small"
                      aria-label="account menu"
                    >
                      <Avatar
                        sx={{
                          width: 34,
                          height: 34,
                          bgcolor: "primary.main",
                          fontSize: 15,
                        }}
                        src={user.photoURL ?? undefined}
                      >
                        {!user.photoURL && avatarLetter}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    slotProps={{
                      paper: { elevation: 2, sx: { mt: 1, minWidth: 160 } },
                    }}
                  >
                    <MenuItem disabled>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {user.email}
                      </Typography>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Orders</MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogOut}>Sign Out</MenuItem>
                  </Menu>
                </>
              ) : (
                <Button variant="contained" size="small" onClick={onOpenAuth}>
                  Sign In
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
}
