import { NextResponse } from 'next/server';

// Fallback quotes in case database is not available
const fallbackQuotes = [
  {
    id: 1,
    text: "The best way to find yourself is to lose yourself in the service of others.",
    author: "Mahatma Gandhi",
    category: "inspiration"
  },
  {
    id: 2,
    text: "Prayer is not asking. It is a longing of the soul. It is daily admission of one's weakness.",
    author: "Mahatma Gandhi",
    category: "prayer"
  },
  {
    id: 3,
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: "motivation"
  },
  {
    id: 4,
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    category: "motivation"
  },
  {
    id: 5,
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    category: "inspiration"
  }
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  try {
    // Try to import Supabase client dynamically to handle missing env vars
    let supabase;
    try {
      const { supabase: supabaseClient } = await import('../../../../lib/supabaseClient');
      supabase = supabaseClient;
    } catch (error) {
      console.log('Supabase client not available, using fallback quotes');
    }

    // If Supabase is available, try to get data from database
    if (supabase) {
      try {
        let query = supabase
          .from('quotes')
          .select('*');
        
        if (category) {
          query = query.eq('category', category);
        }
        
        const { data, error } = await query;

        if (error) {
          console.log('Database error:', error.message);
        } else if (data && data.length > 0) {
          // Pick random quote from results
          const randomQuote = data[Math.floor(Math.random() * data.length)];
          return NextResponse.json(randomQuote);
        }
      } catch (dbError) {
        console.log('Database connection failed:', dbError.message);
      }
    }

    // Fallback to hardcoded quotes
    let availableQuotes = fallbackQuotes;
    
    if (category) {
      availableQuotes = fallbackQuotes.filter(quote => 
        quote.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    if (availableQuotes.length === 0) {
      availableQuotes = fallbackQuotes; // Use all quotes if category not found
    }
    
    const randomQuote = availableQuotes[Math.floor(Math.random() * availableQuotes.length)];
    return NextResponse.json(randomQuote);
    
  } catch (error) {
    console.error('Random quote API error:', error);
    
    // Return a default quote if everything fails
    return NextResponse.json({
      id: 0,
      text: "The journey of a thousand miles begins with one step.",
      author: "Lao Tzu",
      category: "motivation"
    });
  }
}
