import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabaseClient';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  try {
    let query = supabase
      .from('quotes')
      .select('*');
    
    if (category) {
      query = query.eq('category', category);
    }
    
    const { data, error } = await query
      .limit(1)
      .order('RANDOM()');

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'No quotes found' }, { status: 404 });
    }

    return NextResponse.json(data[0]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch quote' },
      { status: 500 }
    );
  }
}
