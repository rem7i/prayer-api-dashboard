# Prayer Times Dashboard

A Next.js application that displays prayer times and inspirational quotes. The app fetches prayer times from an external API and stores them in a Supabase database, while also providing a random quote feature.

## Features

- 📅 Prayer times display with beautiful UI
- 💬 Daily inspirational quotes
- 🗄️ Supabase database integration
- 📱 Responsive design
- 🔄 Fallback data when database is unavailable

## Live Demo

- **Website**: https://prayer-api-dashboard.vercel.app
- **API Endpoints**:
  - Prayer Times: https://prayer-api-dashboard.vercel.app/api/prayer-times
  - Random Quote: https://prayer-api-dashboard.vercel.app/api/random-quote

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in your project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**How to get these values:**
1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy the "Project URL" and "anon public" key

### 2. Database Setup

1. Create a new Supabase project
2. Go to the SQL Editor
3. Run the SQL from `db/schema.sql` to create the tables
4. Run the SQL from `db/sample-data.sql` to add sample quotes

### 3. Installation

```bash
npm install
npm run dev
```

## API Endpoints

### Prayer Times
- **GET** `/api/prayer-times`
- **Query Parameters**: `date` (optional, format: YYYY-MM-DD)
- **Response**: Prayer times for the specified date

### Random Quote
- **GET** `/api/random-quote`
- **Query Parameters**: `category` (optional)
- **Response**: Random quote with optional category filtering

## Troubleshooting

### Common Issues

1. **White page on dashboard**
   - Check if environment variables are set correctly
   - Verify Supabase connection
   - Check browser console for errors

2. **"No quotes found" error**
   - Ensure the `quotes` table exists in your database
   - Run the sample data SQL to populate quotes
   - The API will fallback to hardcoded quotes if database is unavailable

3. **Prayer times not loading**
   - Check if the external prayer API is accessible
   - Verify your internet connection
   - The API will fallback to sample prayer times if external API fails

### Development vs Production

- **Development**: Uses local environment variables
- **Production**: Uses Vercel environment variables
- **Fallback**: App works without database using external APIs and hardcoded data

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── prayer-times/
│   │   │   └── route.js
│   │   └── random-quote/
│   │       └── route.js
│   ├── dashboard/
│   │   └── page.jsx
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   └── supabaseClient.js
└── db/
    ├── schema.sql
    └── sample-data.sql
```

## Technologies Used

- **Next.js 14** - React framework
- **Supabase** - Database and backend
- **Tailwind CSS** - Styling
- **Aladhan API** - Prayer times data

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License
