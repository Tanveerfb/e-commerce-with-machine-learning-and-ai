"use client";

import { useState, FormEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Tab,
  Tabs,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Divider,
  Alert,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GoogleIcon from "@mui/icons-material/Google";
import { useAuth } from "@/contexts/AuthContext";
import { FirebaseError } from "firebase/app";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

type AuthTab = "signin" | "signup";

function getFirebaseErrorMessage(code: string): string {
  const messages: Record<string, string> = {
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/email-already-in-use": "An account with this email already exists.",
    "auth/weak-password": "Password must be at least 6 characters.",
    "auth/too-many-requests": "Too many attempts. Please try again later.",
    "auth/popup-closed-by-user": "Sign-in popup was closed before completing.",
  };
  return messages[code] ?? "An unexpected error occurred. Please try again.";
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const { signIn, signUp, signInWithGoogle } = useAuth();

  const [tab, setTab] = useState<AuthTab>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError(null);
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: AuthTab) => {
    setTab(newValue);
    resetForm();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (tab === "signup" && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      if (tab === "signin") {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
      handleClose();
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(getFirebaseErrorMessage(err.code));
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);
    try {
      await signInWithGoogle();
      handleClose();
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(getFirebaseErrorMessage(err.code));
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      slotProps={{ paper: { sx: { borderRadius: 3 } } }}
    >
      <DialogTitle sx={{ pb: 0, pr: 6 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {tab === "signin" ? "Welcome back" : "Create account"}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
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

      <Tabs
        value={tab}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{ px: 3, mt: 1 }}
      >
        <Tab label="Sign In" value="signin" />
        <Tab label="Sign Up" value="signup" />
      </Tabs>

      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {/* Google Sign In */}
        <Button
          fullWidth
          variant="outlined"
          startIcon={<GoogleIcon />}
          onClick={handleGoogleSignIn}
          disabled={loading}
          sx={{ mb: 2, textTransform: "none", fontWeight: 500 }}
        >
          Continue with Google
        </Button>

        <Divider sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            or
          </Typography>
        </Divider>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
            autoComplete="email"
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            required
            size="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: tab === "signup" ? 2 : 3 }}
            autoComplete={
              tab === "signin" ? "current-password" : "new-password"
            }
          />

          {tab === "signup" && (
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              required
              size="small"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{ mb: 3 }}
              autoComplete="new-password"
            />
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ textTransform: "none", fontWeight: 600, py: 1 }}
          >
            {loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : tab === "signin" ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
