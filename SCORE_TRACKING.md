# Quiz Score Tracking with Vercel Postgres

This feature tracks quiz scores by region to understand how different areas perform on Constitution knowledge, using **Vercel Postgres** for persistent storage and analytics.

## How it Works

1. **Region Detection**: When a user completes the quiz, the system fetches their region using the `ipapi.co` API
2. **Score Recording**: The score (as a percentage 0.00-1.00), difficulty level, and region are saved to Postgres
3. **Analytics**: Query aggregated statistics by region, difficulty, or time period

## Database Schema

```sql
CREATE TABLE quiz_scores (
  id SERIAL PRIMARY KEY,
  region VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  score DECIMAL(3,2) NOT NULL CHECK (score >= 0 AND score <= 1),
  difficulty VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_quiz_scores_region ON quiz_scores(region);
CREATE INDEX idx_quiz_scores_difficulty ON quiz_scores(difficulty);
CREATE INDEX idx_quiz_scores_created_at ON quiz_scores(created_at);
```

## API Endpoints

### POST `/api/init-db`
Initialize the database (run once after setting up Vercel Postgres).

**Response:**
```json
{
  "success": true,
  "message": "Database initialized successfully",
  "table": "quiz_scores created with indexes"
}
```

### GET `/api/get-region`
Fetches the user's region based on their IP address.

**Response:**
```json
{
  "ip": "8.8.8.8",
  "region": "California",
  "country": "United States",
  "city": "Mountain View"
}
```

### POST `/api/save-score`
Saves a quiz score to the Postgres database.

**Request Body:**
```json
{
  "region": "California",
  "country": "United States",
  "score": 0.80,
  "difficulty": "medium"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Score saved successfully",
  "data": {
    "id": 123,
    "region": "California",
    "country": "United States",
    "score": 0.80,
    "difficulty": "medium",
    "created_at": "2025-10-03T12:00:00.000Z"
  }
}
```

### GET `/api/stats`
Get aggregated statistics by region.

**Query Parameters:**
- `difficulty` (optional): Filter by difficulty ("easy", "medium", "hard")
- `region` (optional): Filter by specific region
- `limit` (optional): Max results to return (default: 50)

**Example:**
```
GET /api/stats?difficulty=medium&limit=10
```

**Response:**
```json
{
  "success": true,
  "overall": {
    "total_scores": 1543,
    "total_regions": 48,
    "overall_avg_score": 0.73
  },
  "regional": [
    {
      "region": "California",
      "country": "United States",
      "difficulty": "medium",
      "total_attempts": 245,
      "avg_score": 0.78,
      "min_score": 0.30,
      "max_score": 1.00
    },
    {
      "region": "Texas",
      "country": "United States",
      "difficulty": "medium",
      "total_attempts": 189,
      "avg_score": 0.75,
      "min_score": 0.40,
      "max_score": 1.00
    }
  ],
  "filters": {
    "difficulty": "medium",
    "region": "all",
    "limit": 10
  }
}
```

## Setup Instructions

### 1. Create Vercel Postgres Database
1. Go to your Vercel project dashboard
2. Navigate to **Storage** tab
3. Click **Create Database** → **Postgres**
4. Choose **Free tier** (256 MB, 60 compute hours/month)
5. Copy the connection details (auto-configured as environment variables)

### 2. Initialize Database
After deploying, visit:
```
https://your-domain.vercel.app/api/init-db
```

This creates the `quiz_scores` table with proper indexes.

### 3. Environment Variables
Vercel automatically sets these when you create a Postgres database:
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`
- `POSTGRES_USER`
- `POSTGRES_HOST`
- `POSTGRES_PASSWORD`
- `POSTGRES_DATABASE`

## Example Queries

### Get all statistics
```bash
curl https://your-domain.vercel.app/api/stats
```

### Get medium difficulty statistics
```bash
curl https://your-domain.vercel.app/api/stats?difficulty=medium
```

### Get California statistics
```bash
curl https://your-domain.vercel.app/api/stats?region=California
```

### Get top 5 regions
```bash
curl https://your-domain.vercel.app/api/stats?limit=5
```

## Analytics Use Cases

1. **Regional Performance**: See which regions score highest/lowest
2. **Difficulty Analysis**: Compare performance across difficulty levels
3. **Trends Over Time**: Query by date ranges to see improvements
4. **Country Comparison**: Group by country for international insights

## Privacy Considerations

- Only region-level data is stored (not precise location)
- No personal information is collected
- IP addresses are used only for region lookup, not stored
- Consider adding a privacy notice on the completion page

## Future Enhancements

- Add a statistics dashboard page
- Implement time-based trending (daily/weekly/monthly)
- Add leaderboards by region
- Export data to CSV for analysis
- Add data retention policies (auto-delete old records)
