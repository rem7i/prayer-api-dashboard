# Environment Variables Setup

Create a `.env.local` file in your project root with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## How to get these values:

1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy the "Project URL" and "anon public" key
4. Replace the placeholder values above

## Database Setup

After setting up your Supabase project, run the SQL from `db/schema.sql` in your Supabase SQL editor.

## Sample Quotes Data

Run this SQL to add some sample quotes to your database:

```sql
INSERT INTO quotes (text, author, category) VALUES
('The best way to find yourself is to lose yourself in the service of others.', 'Mahatma Gandhi', 'inspiration'),
('Prayer is not asking. It is a longing of the soul. It is daily admission of one''s weakness.', 'Mahatma Gandhi', 'prayer'),
('The only way to do great work is to love what you do.', 'Steve Jobs', 'motivation'),
('Success is not final, failure is not fatal: it is the courage to continue that counts.', 'Winston Churchill', 'motivation'),
('The future belongs to those who believe in the beauty of their dreams.', 'Eleanor Roosevelt', 'inspiration'),
('Faith is taking the first step even when you don''t see the whole staircase.', 'Martin Luther King Jr.', 'faith'),
('The only limit to our realization of tomorrow will be our doubts of today.', 'Franklin D. Roosevelt', 'motivation'),
('In the middle of difficulty lies opportunity.', 'Albert Einstein', 'inspiration'),
('The journey of a thousand miles begins with one step.', 'Lao Tzu', 'motivation'),
('Patience is bitter, but its fruit is sweet.', 'Jean-Jacques Rousseau', 'wisdom');
```
