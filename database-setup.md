# Database Setup for Large Quotes Dataset

## Option 1: Vercel Postgres (Recommended)
```bash
# Install Vercel CLI and create database
npm i -g @vercel/postgres

# In your project
npm install @vercel/postgres

# Create database in Vercel dashboard
# Import your CSV data
```

## Option 2: Supabase (Free tier: 500MB)
```bash
npm install @supabase/supabase-js

# Create table
CREATE TABLE quotes (
  id SERIAL PRIMARY KEY,
  quote TEXT NOT NULL,
  author VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

# Import CSV data via Supabase dashboard
```

## Option 3: PlanetScale/Railway/Neon
Free tiers with generous limits for your quotes data

## Benefits
✅ No file size limits
✅ Fast queries and filtering
✅ Real-time updates
✅ Advanced search capabilities
✅ Analytics and insights