"use client";

import { useState } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { AuthProvider } from "@/contexts/AuthContext";
import { SellerAuthProvider } from "@/contexts/SellerAuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AuthModal from "@/components/auth/AuthModal";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1565C0",
    },
    secondary: {
      main: "#E91E63",
    },
    background: {
      default: "#F5F7FA",
    },
  },
  typography: {
    fontFamily: [
      "var(--font-geist-sans)",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      "sans-serif",
    ].join(","),
  },
  shape: {
    borderRadius: 8,
  },
});

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <SellerAuthProvider>
            <Navbar onOpenAuth={() => setAuthOpen(true)} />
            {/* Toolbar spacer so content starts below the fixed AppBar */}
            <div style={{ minHeight: 64 }} />
            <main style={{ flex: 1 }}>{children}</main>
            <Footer />
            <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
          </SellerAuthProvider>
        </AuthProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
