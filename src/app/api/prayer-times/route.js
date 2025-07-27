import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabaseClient';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const dateQuery = searchParams.get('date') || new Date().toLocaleDateString('en-CA');

  try {
    const { data, error } = await supabase
      .from('prayer_times')
      .select('*')
      .eq('date', dateQuery)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      // If no data found in Supabase, fetch from external API
      const response = await fetch(
        `https://api.aladhan.com/v1/timingsByCity?city=Dubai&country=United Arab Emirates&method=8&date=${dateQuery}`
      );
      const apiData = await response.json();
      
      // Store the data in Supabase for future use
      const { error: insertError } = await supabase
        .from('prayer_times')
        .insert([
          {
            date: dateQuery,
            times: apiData.data.timings
          }
        ]);

      if (insertError) {
        console.error('Error storing prayer times:', insertError);
      }

      return NextResponse.json(apiData);
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch prayer times' },
      { status: 500 }
    );
  }
}