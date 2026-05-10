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
  products/       – Products listing page (search, filter, sort, paginate)
  products/[id]/  – Product detail page (images, reviews tab, rating breakdown)
components/
  auth/           – AuthModal (login/signup dialog)
  layout/         – AppShell (ThemeProvider + AuthProvider wrapper), Navbar, Footer
  products/       – ProductCard, ReviewsModal
contexts/         – AuthContext (Firebase Auth provider + useAuth hook)
lib/              – firebase.ts (singleton Firebase app + auth instance)
types/            – product.ts (Product, Review interfaces)
data/             – Static JSON data (products.json)
```

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
