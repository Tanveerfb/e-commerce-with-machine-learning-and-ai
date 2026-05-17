import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

const COOKIE_NAME = "seller_session";
// Simple non-guessable marker value — adequate for a dummy gate
const SESSION_VALUE = "seller_authed_v1";

interface SellerCreds {
  username: string;
  password: string;
}

function loadCreds(): SellerCreds {
  const filePath = join(process.cwd(), "data", "seller_auth", "creds.json");
  const raw = readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as SellerCreds;
}

/** POST /api/seller-auth — validate credentials, set session cookie */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (
    !body ||
    typeof body.username !== "string" ||
    typeof body.password !== "string"
  ) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  let creds: SellerCreds;
  try {
    creds = loadCreds();
  } catch {
    return NextResponse.json(
      { error: "Server configuration error." },
      { status: 500 },
    );
  }

  if (body.username !== creds.username || body.password !== creds.password) {
    return NextResponse.json(
      { error: "Invalid username or password." },
      { status: 401 },
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, SESSION_VALUE, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    // Session cookie — expires when browser closes
  });
  return res;
}

/** GET /api/seller-auth — check if session cookie is valid */
export async function GET(req: NextRequest) {
  const cookie = req.cookies.get(COOKIE_NAME);
  const authed = cookie?.value === SESSION_VALUE;
  return NextResponse.json({ authed });
}

/** DELETE /api/seller-auth — clear session cookie */
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return res;
}
