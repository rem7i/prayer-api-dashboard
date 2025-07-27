import { supabase } from '../../lib/supabaseClient';

export default async function handler(req, res) {
  // Get the date from the query parameter, or default to today's date in YYYY-MM-DD format
  const dateQuery = req.query.date || new Date().toLocaleDateString('en-CA');

  try {
    const { data, error } = await supabase
      .from('prayer_times')
      .select('imsaku, sabahu, lindja, dreka, ikindia, akshami, jacia, shenime, festat')
      .eq('date', dateQuery) // Filter by the specific date
      .single(); // We expect only one row for a given date

    if (error) throw error;
    if (!data) return res.status(404).json({ message: `No prayer times found for date: ${dateQuery}` });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}