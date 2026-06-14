import pg from "pg";

const { Pool } = pg;

let pool: any | undefined;


export function getPool() {
  if (!pool) {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error("Missing DATABASE_URL env var");
    }
    pool = new Pool({ connectionString: databaseUrl });
  }
  return pool;
}

