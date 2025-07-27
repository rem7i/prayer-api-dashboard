'use client';

import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await fetch('/api/prayer-times');
        const data = await response.json();
        
        if (response.ok) {
          setPrayerTimes(data);
        } else {
          setError(data.error || 'Failed to fetch prayer times');
        }
      } catch (err) {
        setError('Failed to fetch prayer times');
      } finally {
        setLoading(false);
      }
    };

    fetchPrayerTimes();
  }, []);

  if (loading) return <div>Loading prayer times...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!prayerTimes) return <div>No prayer times available</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Prayer Times Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(prayerTimes.times || {}).map(([prayer, time]) => (
          <div key={prayer} className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-semibold text-lg">{prayer}</h2>
            <p className="text-gray-600">{time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
