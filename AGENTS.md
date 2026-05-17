<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

Use Material UI when creating or updating pages. the documentation is inside mui.txt file

## MUI v9 Breaking Changes (important)

- System shorthand props (`fontWeight`, `mb`, `mt`, `mx`, `px`, `py`, `maxWidth`, `display`, `alignItems`, `justifyContent`, etc.) are **no longer accepted as direct component props** on `Typography`, `Stack`, `Box`, etc.
- All such props must live inside the `sx` prop. Example: `<Typography sx={{ fontWeight: 700, mb: 2 }}>` ✓ — `<Typography fontWeight={700} mb={2}>` ✗
- The `component` prop on `Typography` has stricter TypeScript overloads in v9; prefer semantic HTML via `variant` alone, or wrap with a `Box component="h1"`.
- `Stack` no longer accepts `justifyContent` / `alignItems` directly — use `sx={{ justifyContent: "...", alignItems: "..." }}`.
- `Grid` uses the new `size` prop for breakpoints: `<Grid size={{ xs: 12, md: 6 }}>` instead of `xs={12} md={6}`.

## Project Structure

```
app/              – Next.js App Router pages & root layout
  api/
    seller-auth/  – POST/GET/DELETE route: validates creds, sets httpOnly cookie
  products/       – Products listing page (search, filter, sort, paginate)
  products/[id]/  – Product detail page (images, reviews tab, rating breakdown)
  sales-dashboard/– Seller sales dashboard (protected by SellerGuard)
components/
  auth/           – AuthModal (login/signup dialog)
  layout/         – AppShell (ThemeProvider + AuthProvider + SellerAuthProvider), Navbar, Footer
  products/       – ProductCard, ReviewsModal
  seller/         – SellerGuard (route gate), SellerLoginModal
contexts/         – AuthContext (Firebase), SellerAuthContext (dummy seller auth)
lib/              – firebase.ts (singleton Firebase app + auth instance)
types/            – product.ts (Product, Review interfaces)
data/
  products.json   – Static product data
  seller_auth/
    creds.json    – Seller login credentials (read server-side only)
```

## Seller / Admin Auth (2nd auth layer)

- Completely separate from Firebase auth — never touches `AuthContext`.
- API route `app/api/seller-auth/route.ts` reads `data/seller_auth/creds.json` server-side; credentials are never sent to the client bundle.
- On success sets an `httpOnly`, `sameSite=lax` session cookie `seller_session`.
- `SellerAuthProvider` (in `AppShell`) checks the cookie on mount via `GET /api/seller-auth` and exposes `{ isSellerAuthed, loading, sellerLogin, sellerLogout }`.
- Wrap any admin/seller page with `<SellerGuard>` — it shows a lock screen + `SellerLoginModal` until authenticated.

## Firebase / Auth

- Firebase config is stored in `.env.local` as `NEXT_PUBLIC_FIREBASE_*` variables.
- Import `auth` from `@/lib/firebase` (singleton pattern — safe for SSR).
- Use `useAuth()` from `@/contexts/AuthContext` to access `user`, `signIn`, `signUp`, `signInWithGoogle`, `logOut`.
- `AuthProvider` is mounted inside `AppShell` (`components/layout/AppShell.tsx`).

## Theme

- MUI theme is defined in `components/layout/AppShell.tsx`.
- Primary colour: `#1565C0`. Mode: `light`.
- `AppShell` is the single `"use client"` wrapper that owns `ThemeProvider`, `CssBaseline`, and `AuthProvider`.

<!-- END:nextjs-agent-rules -->
