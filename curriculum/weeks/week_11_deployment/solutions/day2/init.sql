-- Seed data for development
INSERT INTO todos (title, done) VALUES
  ('Learn Docker', false),
  ('Master Compose', false),
  ('Deploy to production', false)
ON CONFLICT DO NOTHING;
