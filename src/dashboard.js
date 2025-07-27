import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Dashboard() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all quotes from the database
  async function fetchQuotes() {
    setLoading(true);
    const { data, error } = await supabase
      .from('quotes')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error('Error fetching quotes:', error);
    } else {
      setQuotes(data);
    }
    setLoading(false);
  }

  // Delete a quote by its ID
  async function deleteQuote(id) {
    if (window.confirm('Are you sure you want to delete this quote?')) {
        const { error } = await supabase.from('quotes').delete().eq('id', id);

        if (error) {
            alert('Error deleting quote: ' + error.message);
        } else {
            // Refresh the list after deleting
            fetchQuotes();
        }
    }
  }


  useEffect(() => {
    fetchQuotes();
  }, []);

  if (loading) return <p className="text-center p-4">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Quotes Dashboard</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        <ul className="divide-y divide-gray-200">
          {quotes.map((quote) => (
            <li key={quote.id} className="py-4 flex items-center justify-between">
              <div>
                <p className="text-lg text-gray-900">"{quote.text}"</p>
                <p className="text-sm text-gray-500">- {quote.source}</p>
              </div>
              <button
                onClick={() => deleteQuote(quote.id)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/* You can add a form here to create new quotes */}
    </div>
  );
}