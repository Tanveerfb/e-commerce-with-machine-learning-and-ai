"use client";

import { useState, FormEvent } from "react";
import {
  Dialog,
  DialogContent,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Alert,
  CircularProgress,
  InputAdornment,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StorefrontIcon from "@mui/icons-material/Storefront";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import { useSellerAuth } from "@/contexts/SellerAuthContext";

interface SellerLoginModalProps {
  open: boolean;
  /** Called when the user successfully authenticates */
  onSuccess: () => void;
  /** Called when the user dismisses without authenticating */
  onClose: () => void;
}

export default function SellerLoginModal({
  open,
  onSuccess,
  onClose,
}: SellerLoginModalProps) {
  const { sellerLogin } = useSellerAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setUsername("");
    setPassword("");
    setError(null);
    setShowPassword(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await sellerLogin(username, password);

    setLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      reset();
      onSuccess();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      slotProps={{ paper: { sx: { borderRadius: 4, overflow: "hidden" } } }}
    >
      {/* Branded header */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #1565C0 0%, #7B1FA2 100%)",
          px: 4,
          pt: 4,
          pb: 3,
          position: "relative",
          textAlign: "center",
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          size="small"
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            color: "rgba(255,255,255,0.7)",
            "&:hover": { color: "#fff", bgcolor: "rgba(255,255,255,0.1)" },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>

        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            bgcolor: "rgba(255,255,255,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 1.5,
          }}
        >
          <StorefrontIcon sx={{ color: "#fff", fontSize: 28 }} />
        </Box>

        <Typography
          variant="h6"
          sx={{ color: "#fff", fontWeight: 700, mb: 0.5 }}
        >
          Seller Portal
        </Typography>
        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.75)" }}>
          Sign in with your seller credentials
        </Typography>
      </Box>

      <DialogContent sx={{ px: 3, pt: 3, pb: 3 }}>
        {error && (
          <Alert
            severity="error"
            sx={{ mb: 2, borderRadius: 2 }}
            onClose={() => setError(null)}
          >
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Username"
            fullWidth
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 2 }}
            autoComplete="username"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ fontSize: 20, color: "text.disabled" }} />
                  </InputAdornment>
                ),
              },
            }}
          />

          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 1.5 }}
            autoComplete="current-password"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ fontSize: 20, color: "text.disabled" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() => setShowPassword((v) => !v)}
                      edge="end"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <VisibilityOffIcon fontSize="small" />
                      ) : (
                        <VisibilityIcon fontSize="small" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <Divider sx={{ my: 2 }} />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading || !username || !password}
            sx={{
              textTransform: "none",
              fontWeight: 700,
              py: 1.25,
              borderRadius: 2,
              fontSize: "1rem",
              background: "linear-gradient(135deg, #1565C0 0%, #7B1FA2 100%)",
              boxShadow: "0 4px 14px rgba(21, 101, 192, 0.4)",
              "&:hover": {
                boxShadow: "0 6px 20px rgba(21, 101, 192, 0.5)",
              },
              "&.Mui-disabled": {
                background: "rgba(0,0,0,0.12)",
                boxShadow: "none",
              },
            }}
          >
            {loading ? (
              <CircularProgress size={22} color="inherit" />
            ) : (
              "Sign In"
            )}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
