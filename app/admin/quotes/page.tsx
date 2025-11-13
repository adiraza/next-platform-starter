"use client";

import { useEffect, useState } from 'react';
import { Download, Trash2, Mail, Phone, Building2 } from 'lucide-react';

interface Quote {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  requirements: string;
  timestamp: string;
  pdfPath: string;
}

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const res = await fetch('/api/quotes');
      const data = await res.json();
      setQuotes(data);
    } catch (error) {
      console.error('Error fetching quotes:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12 text-gray-400">Loading quotes...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">User Quotes</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {quotes.length} quote{quotes.length !== 1 ? 's' : ''} generated
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-slate-700">
                <th className="pb-3 px-6">Name</th>
                <th className="pb-3 px-6">Email</th>
                <th className="pb-3 px-6">Phone</th>
                <th className="pb-3 px-6">Company</th>
                <th className="pb-3 px-6">Date</th>
                <th className="pb-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((quote) => (
                <tr
                  key={quote.id}
                  className="border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50"
                >
                  <td className="py-4 px-6">
                    <p className="font-medium text-gray-900 dark:text-white">{quote.name}</p>
                  </td>
                  <td className="py-4 px-6">
                    <a
                      href={`mailto:${quote.email}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                    >
                      <Mail className="w-4 h-4" />
                      {quote.email}
                    </a>
                  </td>
                  <td className="py-4 px-6">
                    {quote.phone ? (
                      <a
                        href={`tel:${quote.phone}`}
                        className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                      >
                        <Phone className="w-4 h-4" />
                        {quote.phone}
                      </a>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    {quote.company ? (
                      <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                        <Building2 className="w-4 h-4" />
                        {quote.company}
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">
                    {new Date(quote.timestamp).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button
                        onClick={() => window.open(`/api/quotes/${quote.id}/download`, '_blank')}
                        className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                        title="Download PDF"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {quotes.length === 0 && (
          <div className="p-12 text-center text-gray-400">
            <p>No quotes generated yet</p>
          </div>
        )}
      </div>
    </div>
  );
}

