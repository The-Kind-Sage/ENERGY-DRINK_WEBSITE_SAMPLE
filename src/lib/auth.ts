import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { getPool } from "./db";

const JWT_SECRET = () => {
  const s = process.env.JWT_SECRET;
  if (!s || s === "__CHANGE_ME__") {
    // Keep error explicit; otherwise auth becomes non-deterministic.
    throw new Error("Missing/placeholder JWT_SECRET env var");
  }
  return s;
};

export function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export function verifyPassword(password: string, passwordHash: string) {
  return bcrypt.compare(password, passwordHash);
}

export type AdminUser = {
  id: string;
  email: string;
  role: string;
  created_at: Date;
};

export function signAdminToken(user: Pick<AdminUser, "id" | "email" | "role">) {
  return jwt.sign({ sub: user.id, email: user.email, role: user.role }, JWT_SECRET(), {
    expiresIn: "30d",
  });
}

export const verifyAdminToken = (token: string) => {
  const payload = jwt.verify(token, JWT_SECRET()) as { sub: string; email: string; role: string };
  return payload;
};

// Ensure schema exists (runs on first auth call).
export async function ensureTables() {
  const pool = getPool();
  await pool.query(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      email text NOT NULL UNIQUE,
      password_hash text NOT NULL,
      role text NOT NULL DEFAULT 'admin',
      created_at timestamptz NOT NULL DEFAULT now()
    );
  `);

  // pgcrypto extension for gen_random_uuid()
  await pool.query(`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'pgcrypto') THEN
        CREATE EXTENSION pgcrypto;
      END IF;
    END$$;
  `);
}

const SignupInput = z.object({
  email: z.string().email().max(254),
  password: z.string().min(8).max(200),
});


export type SignupResult =
  | { ok: true; createdAdmin: boolean }
  | { ok: false; reason: string };

export async function adminSignup(input: unknown): Promise<SignupResult & { token?: string }> {
  await ensureTables();

  const parsed = SignupInput.safeParse(input);
  if (!parsed.success) return { ok: false, reason: "Invalid input" };
  const { email, password } = parsed.data;


  const pool = getPool();

  // Bootstrap logic: if no admin users exist, allow creating the first admin.
  const countRes = await pool.query<{ count: string }>("SELECT COUNT(*)::text as count FROM admin_users");
  const count = Number(countRes.rows[0]?.count ?? "0");

  const passwordHash = await hashPassword(password);

  if (count === 0) {
    const userRes = await pool.query(
      "INSERT INTO admin_users (email, password_hash, role) VALUES ($1, $2, 'admin') RETURNING id, email, role, created_at",
      [email, passwordHash],
    );

    const user = userRes.rows[0];
    return { ok: true, createdAdmin: true, token: signAdminToken(user) };
  }


  // After bootstrapping, only allow signup if the account already exists (prevents public admin creation).
  // If it doesn't exist, reject.
  const existing = await pool.query(
    "SELECT id, email, role, created_at FROM admin_users WHERE email = $1",
    [email],
  );

  if (existing.rows.length === 0) {
    return { ok: false, reason: "Admin already bootstrapped" };
  }

  return { ok: false, reason: "Only the initial admin can be created" };
}

export async function adminLogin(input: unknown): Promise<{ ok: true; token: string } | { ok: false; reason: string }> {
  await ensureTables();

  const parsed = z
    .object({
      email: z.string().email().max(254),
      password: z.string().min(1).max(200),
    })
    .safeParse(input);

  if (!parsed.success) return { ok: false, reason: "Invalid input" };

  const { email, password } = parsed.data;

  const pool = getPool();
  const res = await pool.query(
    "SELECT id, email, role, created_at, password_hash FROM admin_users WHERE email = $1",
    [email],
  );

  if (res.rows.length === 0) return { ok: false, reason: "Invalid credentials" };
  const row = res.rows[0] as { id: string; email: string; role: string; created_at: Date; password_hash: string };

  const ok = await verifyPassword(password, row.password_hash);

  if (!ok) return { ok: false, reason: "Invalid credentials" };

  const token = signAdminToken({ id: row.id, email: row.email, role: row.role });
  return { ok: true, token };
}

export async function adminMe(token: string | undefined): Promise<
  | { ok: true; user: { id: string; email: string; role: string; created_at: Date } }
  | { ok: false; reason: string }
> {
  if (!token) return { ok: false, reason: "Missing token" };
  await ensureTables();
  try {
    const payload = verifyAdminToken(token);
    const pool = getPool();
    const res = await pool.query<AdminUser>(
      "SELECT id, email, role, created_at FROM admin_users WHERE id = $1",
      [payload.sub],
    );
    if (res.rows.length === 0) return { ok: false, reason: "Invalid token" };
    return { ok: true, user: res.rows[0] };
  } catch {
    return { ok: false, reason: "Invalid token" };
  }
}

