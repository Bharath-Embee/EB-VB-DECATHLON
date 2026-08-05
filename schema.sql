-- Run this ONCE against your Vercel Postgres database before using the shared/multi-user
-- version of the app. In the Vercel dashboard: your project → Storage → your Postgres database
-- → Query tab → paste this in and run it.
--
-- This is the entire schema — one table holds every piece of app data (selection files, fabric
-- lines, styles, users, season names, etc.) as JSON, keyed the same way the app already keys
-- its local storage. There's nothing else to create.

CREATE TABLE IF NOT EXISTS app_data (
  key         TEXT PRIMARY KEY,
  value       JSONB NOT NULL,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
