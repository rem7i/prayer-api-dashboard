import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient'; // Adjust path if needed

export async function GET() {
  try {
    const { data, error } = await supabase.rpc('get_random_quote').single();

    if (error) throw error;
    if (!data) {
        return NextResponse.json({ message: 'No quotes found.' }, { status: 404 });
    }
    
    return NextResponse.json({ text: data.text, source: data.source });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}