---
name: supabase-cli
description: Direct database queries and data inspection via Supabase CLI and psql
triggers:
  keywords:
    - supabase cli
    - psql
    - database query
    - sql query
    - db inspect
    - schema inspect
    - supabase db
    - migration
    - database debug
    - data analysis
---

# Supabase CLI & Database Queries

Direct database access for analytics, debugging, and data inspection. Let Claude handle database queries directly.

---

## Quick Commands

```bash
# Just tell Claude:
"Query the database to find all creators with engagement > 10%"
"What's the schema for the campaigns table?"
"Run analytics on last month's campaign performance"
```

---

## Supabase CLI Setup

### Installation

```bash
# macOS
brew install supabase/tap/supabase

# npm (cross-platform)
npm install -g supabase

# Verify
supabase --version
```

### Authentication

```bash
# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref <project-id>
```

---

## Direct Database Access

### Connect via psql

```bash
# Get connection string from Supabase dashboard
# Settings > Database > Connection string

# Connect directly
psql "postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres"
```

---

## Common Query Patterns

### Schema Inspection

```sql
-- List all tables
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public';

-- Describe table structure
\d campaigns

-- List columns with types
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'campaigns';
```

### Data Inspection

```sql
-- Sample data from table
SELECT * FROM campaigns LIMIT 10;

-- Count records
SELECT COUNT(*) FROM campaigns;

-- Distinct values
SELECT DISTINCT status FROM campaigns;
```

---

## Project-Specific Queries

### Campaigns Table

```sql
-- Active campaigns with creator counts
SELECT
    c.id,
    c.name,
    c.status,
    COUNT(cc.creator_id) as creator_count,
    c.created_at
FROM campaigns c
LEFT JOIN campaign_creators cc ON c.id = cc.campaign_id
WHERE c.status = 'active'
GROUP BY c.id
ORDER BY c.created_at DESC;
```

### Creators Table

```sql
-- Top creators by engagement
SELECT
    username,
    platform,
    follower_count,
    engagement_rate,
    estimated_rate
FROM creators
WHERE engagement_rate > 0.05
ORDER BY engagement_rate DESC
LIMIT 20;

-- Creator search by niche
SELECT * FROM creators
WHERE
    niche ILIKE '%fitness%'
    AND follower_count BETWEEN 10000 AND 100000
ORDER BY engagement_rate DESC;
```

### Deal Outcomes

```sql
-- Analyze deal success rates
SELECT
    status,
    COUNT(*) as count,
    AVG(final_rate) as avg_rate,
    AVG(roi) as avg_roi
FROM deal_outcomes
GROUP BY status;
```

---

## Analytics Queries

### Time-Based Analysis

```sql
-- Campaigns by month
SELECT
    DATE_TRUNC('month', created_at) as month,
    COUNT(*) as campaign_count,
    SUM(budget) as total_budget
FROM campaigns
GROUP BY DATE_TRUNC('month', created_at)
ORDER BY month DESC;
```

### Performance Metrics

```sql
-- Platform performance comparison
SELECT
    platform,
    COUNT(*) as creator_count,
    AVG(follower_count) as avg_followers,
    AVG(engagement_rate) as avg_engagement,
    AVG(estimated_rate) as avg_rate
FROM creators
GROUP BY platform
ORDER BY avg_engagement DESC;
```

---

## Migration Commands

### Create Migration

```bash
# Create new migration
supabase migration new add_new_column

# This creates: supabase/migrations/[timestamp]_add_new_column.sql
```

### Apply Migrations

```bash
# Apply to local
supabase db reset

# Push to remote
supabase db push

# Pull remote changes
supabase db pull
```

---

## Data Debugging

### Find Data Issues

```sql
-- Orphaned records
SELECT cc.* FROM campaign_creators cc
LEFT JOIN campaigns c ON cc.campaign_id = c.id
WHERE c.id IS NULL;

-- Duplicate entries
SELECT username, platform, COUNT(*)
FROM creators
GROUP BY username, platform
HAVING COUNT(*) > 1;
```

---

## RLS Policy Inspection

```sql
-- View RLS policies
SELECT
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd
FROM pg_policies
WHERE schemaname = 'public';
```

---

## Performance Analysis

```sql
-- Table sizes
SELECT
    relname as table,
    pg_size_pretty(pg_total_relation_size(relid)) as total_size
FROM pg_catalog.pg_statio_user_tables
ORDER BY pg_total_relation_size(relid) DESC;

-- Index usage
SELECT
    indexrelname as index,
    idx_scan as scans,
    pg_size_pretty(pg_relation_size(indexrelid)) as size
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;
```

---

## Integration with Agents

### Data Analysis Workflow

1. **Ask Claude** to query the database directly
2. **Claude uses** this skill to construct and run queries
3. **Results** are analyzed and insights returned

### Example Prompts

```
"Analyze creator engagement trends over the last 3 months"
"Find campaigns where estimated rates were off by more than 20%"
"Which niches have the best ROI for campaigns under $10k?"
"Debug why campaign X has no creators assigned"
```

---

## Safety Notes

- Always use transactions for data modifications
- Test queries on staging before production
- Use LIMIT when exploring large tables
- Back up before destructive operations
