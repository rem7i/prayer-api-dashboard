'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch prayer times
        const prayerResponse = await fetch('/api/prayer-times');
        const prayerData = await prayerResponse.json();
        
        if (prayerResponse.ok) {
          setPrayerTimes(prayerData);
        } else {
          console.error('Prayer times error:', prayerData.error);
        }

        // Fetch random quote
        const quoteResponse = await fetch('/api/random-quote');
        const quoteData = await quoteResponse.json();
        
        if (quoteResponse.ok) {
          setQuote(quoteData);
        } else {
          console.error('Quote error:', quoteData.error);
        }
        
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getPrayerTimes = () => {
    if (!prayerTimes) return {};
    
    // Handle different response structures
    if (prayerTimes.data?.timings) {
      return prayerTimes.data.timings;
    }
    if (prayerTimes.times) {
      return prayerTimes.times;
    }
    if (typeof prayerTimes === 'object') {
      return prayerTimes;
    }
    
    return {};
  };

  const prayerTimesData = getPrayerTimes();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading prayer times...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link 
            href="/"
            className="text-blue-600 hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Prayer Times Dashboard</h1>
          <Link 
            href="/"
            className="text-blue-600 hover:underline"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Quote Section */}
        {quote && (
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Daily Quote</h2>
            <blockquote className="text-gray-700 italic text-lg mb-2">
              "{quote.text}"
            </blockquote>
            {quote.author && (
              <cite className="text-gray-500">— {quote.author}</cite>
            )}
          </div>
        )}

        {/* Prayer Times Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Prayer Times</h2>
          
          {Object.keys(prayerTimesData).length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No prayer times available</p>
              <p className="text-sm text-gray-500 mt-2">
                This might be due to missing environment variables or database connection issues.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(prayerTimesData).map(([prayer, time]) => (
                <div key={prayer} className="bg-gray-50 p-4 rounded-lg border">
                  <h3 className="font-semibold text-lg text-gray-800 capitalize">
                    {prayer.replace(/([A-Z])/g, ' $1').trim()}
                  </h3>
                  <p className="text-gray-600 text-lg">{time}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
