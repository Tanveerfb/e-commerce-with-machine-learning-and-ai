"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface SellerAuthContextValue {
  isSellerAuthed: boolean;
  /** undefined = still checking on mount */
  loading: boolean;
  sellerLogin: (
    username: string,
    password: string,
  ) => Promise<{ error?: string }>;
  sellerLogout: () => Promise<void>;
}

const SellerAuthContext = createContext<SellerAuthContextValue | null>(null);

export function SellerAuthProvider({ children }: { children: ReactNode }) {
  const [isSellerAuthed, setIsSellerAuthed] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check existing session on mount
  useEffect(() => {
    fetch("/api/seller-auth")
      .then((r) => r.json())
      .then(({ authed }: { authed: boolean }) => setIsSellerAuthed(authed))
      .catch(() => setIsSellerAuthed(false))
      .finally(() => setLoading(false));
  }, []);

  const sellerLogin = async (
    username: string,
    password: string,
  ): Promise<{ error?: string }> => {
    const res = await fetch("/api/seller-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      setIsSellerAuthed(true);
      return {};
    }

    const data = await res.json().catch(() => ({}));
    return { error: data.error ?? "Login failed. Please try again." };
  };

  const sellerLogout = async () => {
    await fetch("/api/seller-auth", { method: "DELETE" });
    setIsSellerAuthed(false);
  };

  return (
    <SellerAuthContext.Provider
      value={{ isSellerAuthed, loading, sellerLogin, sellerLogout }}
    >
      {children}
    </SellerAuthContext.Provider>
  );
}

export function useSellerAuth(): SellerAuthContextValue {
  const context = useContext(SellerAuthContext);
  if (!context) {
    throw new Error("useSellerAuth must be used within a SellerAuthProvider");
  }
  return context;
}
