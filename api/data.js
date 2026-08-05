// Vercel automatically deploys any file under /api as a Serverless Function, regardless of the
// frontend framework — this doesn't require Next.js, it works for this plain Vite app as-is.
//
// This is a single, generic key-value endpoint backing EVERY piece of data in the app
// (selection-batches, fabric-lines, accessory-styles, season-names, users, etc.) — the same
// storeGet(key)/storeSet(key, value) calls that used to read/write localStorage now call this
// instead, so all of your team hits the same database and sees the same data.
//
// Requires the Postgres integration to be added in the Vercel project (Storage tab → Create
// Database → Postgres) — that automatically injects the POSTGRES_* environment variables this
// file needs. No manual .env setup required on Vercel; see schema.sql for the one-time table
// setup and README.md for the full walkthrough.

import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const key = req.query.key;
      if (!key) return res.status(400).json({ error: 'key query param is required' });
      const { rows } = await sql`SELECT value FROM app_data WHERE key = ${key}`;
      return res.status(200).json({ value: rows.length ? rows[0].value : null });
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      const { key, value } = body;
      if (!key) return res.status(400).json({ error: 'key is required in the request body' });
      await sql`
        INSERT INTO app_data (key, value, updated_at)
        VALUES (${key}, ${JSON.stringify(value)}::jsonb, now())
        ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()
      `;
      return res.status(200).json({ ok: true });
    }

    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  } catch (err) {
    console.error('api/data error:', err);
    return res.status(500).json({ error: 'Database error', detail: String((err && err.message) || err) });
  }
}
