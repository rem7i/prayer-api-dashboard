import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const dateQuery = searchParams.get('date') || new Date().toLocaleDateString('en-CA');

  try {
    // Try to import Supabase client dynamically to handle missing env vars
    let supabase;
    try {
      const { supabase: supabaseClient } = await import('../../../../lib/supabaseClient');
      supabase = supabaseClient;
    } catch (error) {
      console.log('Supabase client not available, using external API only');
    }

    // If Supabase is available, try to get data from database first
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('prayer_times')
          .select('*')
          .eq('date', dateQuery)
          .single();

        if (error) {
          console.log('Database error:', error.message);
        } else if (data) {
          return NextResponse.json(data);
        }
      } catch (dbError) {
        console.log('Database connection failed:', dbError.message);
      }
    }

    // Fallback to external API
    const response = await fetch(
      `https://api.aladhan.com/v1/timingsByCity?city=Dubai&country=United Arab Emirates&method=8&date=${dateQuery}`
    );
    
    if (!response.ok) {
      throw new Error(`External API responded with status: ${response.status}`);
    }
    
    const apiData = await response.json();
    
    // Try to store in database if available
    if (supabase) {
      try {
        await supabase
          .from('prayer_times')
          .insert([
            {
              date: dateQuery,
              times: apiData.data.timings
            }
          ]);
      } catch (insertError) {
        console.log('Failed to store in database:', insertError.message);
      }
    }

    return NextResponse.json(apiData);
  } catch (error) {
    console.error('Prayer times API error:', error);
    
    // Return fallback data if everything fails
    return NextResponse.json({
      data: {
        timings: {
          Fajr: "05:30",
          Sunrise: "06:45",
          Dhuhr: "12:15",
          Asr: "15:30",
          Maghrib: "18:45",
          Isha: "20:15"
        },
        date: {
          readable: new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })
        }
      }
    });
  }
}