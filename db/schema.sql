# Prayer Times Table
CREATE TABLE prayer_times (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  times JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

# Quotes Table
CREATE TABLE quotes (
  id SERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  author VARCHAR(255),
  category VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

# Create indexes
CREATE INDEX idx_prayer_times_date ON prayer_times(date);
CREATE INDEX idx_quotes_category ON quotes(category);
