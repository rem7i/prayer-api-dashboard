import Link from "next/link";

export default function Home() {
  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
  const exampleDate = "2025-01-17";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Prayer Times API
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Free API for Islamic prayer times and inspirational quotes
          </p>
          <Link 
            href="/dashboard"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
          >
            View Dashboard
          </Link>
        </div>

        {/* API Endpoints */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Prayer Times API */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              🕌 Prayer Times API
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Today's Prayer Times</h3>
                <div className="bg-gray-50 p-3 rounded border">
                  <code className="text-sm text-blue-600">
                    GET /api/prayer-times
                  </code>
                </div>
                <a 
                  href="/api/prayer-times" 
                  className="inline-block mt-2 text-blue-600 hover:underline text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Try it now →
                </a>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Specific Date</h3>
                <div className="bg-gray-50 p-3 rounded border">
                  <code className="text-sm text-blue-600">
                    GET /api/prayer-times?date={exampleDate}
                  </code>
                </div>
                <a 
                  href={`/api/prayer-times?date=${exampleDate}`}
                  className="inline-block mt-2 text-blue-600 hover:underline text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Try example →
                </a>
              </div>

              <div className="text-sm text-gray-600">
                <p><strong>Format:</strong> YYYY-MM-DD</p>
                <p><strong>Location:</strong> Dubai, UAE</p>
              </div>
            </div>
          </div>

          {/* Random Quote API */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              💬 Random Quote API
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Random Quote</h3>
                <div className="bg-gray-50 p-3 rounded border">
                  <code className="text-sm text-blue-600">
                    GET /api/random-quote
                  </code>
                </div>
                <a 
                  href="/api/random-quote" 
                  className="inline-block mt-2 text-blue-600 hover:underline text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Try it now →
                </a>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700 mb-2">By Category</h3>
                <div className="bg-gray-50 p-3 rounded border">
                  <code className="text-sm text-blue-600">
                    GET /api/random-quote?category=inspiration
                  </code>
                </div>
                <a 
                  href="/api/random-quote?category=inspiration"
                  className="inline-block mt-2 text-blue-600 hover:underline text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Try example →
                </a>
              </div>

              <div className="text-sm text-gray-600">
                <p><strong>Categories:</strong> inspiration, motivation, wisdom</p>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Examples */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            📖 Usage Examples
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">JavaScript/Fetch</h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded text-sm overflow-x-auto">
                <pre>{`fetch('/api/prayer-times')
  .then(res => res.json())
  .then(data => console.log(data));`}</pre>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">cURL</h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded text-sm overflow-x-auto">
                <pre>{`curl https://prayer-api-dashboard.vercel.app/api/prayer-times`}</pre>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600">
          <p>Free to use • No authentication required • CORS enabled</p>
          <p className="mt-2">
            <a 
              href="https://github.com/rem7i/prayer-api-dashboard" 
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
