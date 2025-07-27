import { supabase } from '../../lib/supabaseClient';

export default async function handler(req, res) {
  try {
    // Call the database function we created
    const { data, error } = await supabase.rpc('get_random_quote').single();

    if (error) throw error;
    if (!data) return res.status(404).json({ message: 'No quotes found.' });

    // The function returns a full row, we only need text and source
    res.status(200).json({ text: data.text, source: data.source });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}