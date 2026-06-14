import { T as TSS_SERVER_FUNCTION, a as createServerFn } from "./server-CGjnfohx.mjs";
import { b as bcrypt } from "../_libs/bcryptjs.mjs";
import { j as jwt } from "../_libs/jsonwebtoken.mjs";
import { p as pg } from "../_libs/pg.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
import "../_libs/jws.mjs";
import "../_libs/safe-buffer.mjs";
import "buffer";
import "../_libs/jwa.mjs";
import "../_libs/ecdsa-sig-formatter.mjs";
import "../_libs/buffer-equal-constant-time.mjs";
import "../_libs/ms.mjs";
import "../_libs/semver.mjs";
import "../_libs/lodash.includes.mjs";
import "../_libs/lodash.isboolean.mjs";
import "../_libs/lodash.isinteger.mjs";
import "../_libs/lodash.isnumber.mjs";
import "../_libs/lodash.isplainobject.mjs";
import "../_libs/lodash.isstring.mjs";
import "../_libs/lodash.once.mjs";
import "events";
import "util/types";
import "dns";
import "net";
import "tls";
import "../_libs/pg-types.mjs";
import "../_libs/postgres-array.mjs";
import "../_libs/postgres-date.mjs";
import "../_libs/postgres-interval.mjs";
import "../_libs/xtend.mjs";
import "../_libs/postgres-bytea.mjs";
import "../_libs/pg-int8.mjs";
import "../_libs/pg-connection-string.mjs";
import "fs";
import "../_libs/pg-protocol.mjs";
import "../_libs/pg-cloudflare.mjs";
import "../_libs/pgpass.mjs";
import "path";
import "../_libs/split2.mjs";
import "string_decoder";
import "../_libs/pg-pool.mjs";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const { Pool } = pg;
let pool;
function getPool() {
  if (!pool) {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error("Missing DATABASE_URL env var");
    }
    pool = new Pool({ connectionString: databaseUrl });
  }
  return pool;
}
const JWT_SECRET = () => {
  const s = process.env.JWT_SECRET;
  if (!s || s === "__CHANGE_ME__") {
    throw new Error("Missing/placeholder JWT_SECRET env var");
  }
  return s;
};
function hashPassword(password) {
  return bcrypt.hash(password, 12);
}
function verifyPassword(password, passwordHash) {
  return bcrypt.compare(password, passwordHash);
}
function signAdminToken(user) {
  return jwt.sign({ sub: user.id, email: user.email, role: user.role }, JWT_SECRET(), {
    expiresIn: "30d"
  });
}
async function ensureTables() {
  const pool2 = getPool();
  await pool2.query(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      email text NOT NULL UNIQUE,
      password_hash text NOT NULL,
      role text NOT NULL DEFAULT 'admin',
      created_at timestamptz NOT NULL DEFAULT now()
    );
  `);
  await pool2.query(`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'pgcrypto') THEN
        CREATE EXTENSION pgcrypto;
      END IF;
    END$$;
  `);
}
const SignupInput = objectType({
  email: stringType().email().max(254),
  password: stringType().min(8).max(200)
});
async function adminSignup(input) {
  await ensureTables();
  const parsed = SignupInput.safeParse(input);
  if (!parsed.success) return { ok: false, reason: "Invalid input" };
  const { email, password } = parsed.data;
  const pool2 = getPool();
  const countRes = await pool2.query("SELECT COUNT(*)::text as count FROM admin_users");
  const count = Number(countRes.rows[0]?.count ?? "0");
  const passwordHash = await hashPassword(password);
  if (count === 0) {
    const userRes = await pool2.query(
      "INSERT INTO admin_users (email, password_hash, role) VALUES ($1, $2, 'admin') RETURNING id, email, role, created_at",
      [email, passwordHash]
    );
    const user = userRes.rows[0];
    return { ok: true, createdAdmin: true, token: signAdminToken(user) };
  }
  const existing = await pool2.query(
    "SELECT id, email, role, created_at FROM admin_users WHERE email = $1",
    [email]
  );
  if (existing.rows.length === 0) {
    return { ok: false, reason: "Admin already bootstrapped" };
  }
  return { ok: false, reason: "Only the initial admin can be created" };
}
async function adminLogin(input) {
  await ensureTables();
  const parsed = objectType({
    email: stringType().email().max(254),
    password: stringType().min(1).max(200)
  }).safeParse(input);
  if (!parsed.success) return { ok: false, reason: "Invalid input" };
  const { email, password } = parsed.data;
  const pool2 = getPool();
  const res = await pool2.query(
    "SELECT id, email, role, created_at, password_hash FROM admin_users WHERE email = $1",
    [email]
  );
  if (res.rows.length === 0) return { ok: false, reason: "Invalid credentials" };
  const row = res.rows[0];
  const ok = await verifyPassword(password, row.password_hash);
  if (!ok) return { ok: false, reason: "Invalid credentials" };
  const token = signAdminToken({ id: row.id, email: row.email, role: row.role });
  return { ok: true, token };
}
async function adminMe(token) {
  return { ok: false, reason: "Missing token" };
}
const adminSignupFn_createServerFn_handler = createServerRpc({
  id: "bead73de31510191a102739ec4185280dd47f19f28fa39108baa7412046d760a",
  name: "adminSignupFn",
  filename: "src/lib/api/admin.functions.ts"
}, (opts) => adminSignupFn.__executeServer(opts));
const adminSignupFn = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  email: stringType().email(),
  password: stringType().min(8)
})).handler(adminSignupFn_createServerFn_handler, async ({
  data
}) => adminSignup(data));
const adminLoginFn_createServerFn_handler = createServerRpc({
  id: "1245b775bf24ee8c56a9cac01abd48e7ab1823bfd09da223ffdd4c367d28403c",
  name: "adminLoginFn",
  filename: "src/lib/api/admin.functions.ts"
}, (opts) => adminLoginFn.__executeServer(opts));
const adminLoginFn = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  email: stringType().email(),
  password: stringType().min(1)
})).handler(adminLoginFn_createServerFn_handler, async ({
  data
}) => adminLogin(data));
const adminMeFn_createServerFn_handler = createServerRpc({
  id: "cc80e9ead6bd10e6a9eecb09d34e05260b2eb3ac9ef028e8106bfe979b54c46a",
  name: "adminMeFn",
  filename: "src/lib/api/admin.functions.ts"
}, (opts) => adminMeFn.__executeServer(opts));
const adminMeFn = createServerFn({
  method: "GET"
}).handler(adminMeFn_createServerFn_handler, async () => {
  return adminMe();
});
export {
  adminLoginFn_createServerFn_handler,
  adminMeFn_createServerFn_handler,
  adminSignupFn_createServerFn_handler
};
