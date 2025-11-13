"use client";

import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';

interface GetQuoteButtonProps {
  className?: string;
  variant?: 'primary' | 'secondary';
}

export default function GetQuoteButton({ className = '', variant = 'primary' }: GetQuoteButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleGetQuote = async () => {
    setLoading(true);
    try {
      // Get user info (you can customize this)
      const name = prompt('Enter your name:') || 'Guest';
      const email = prompt('Enter your email:') || '';
      const phone = prompt('Enter your phone (optional):') || '';
      const company = prompt('Enter your company (optional):') || '';
      const requirements = prompt('Enter your requirements:') || 'Solar installation quote';

      if (!email) {
        alert('Email is required');
        setLoading(false);
        return;
      }

      const response = await fetch('/api/quotes/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          company,
          requirements,
        }),
      });

      const data = await response.json();

      if (data.success && data.pdf) {
        // Download PDF
        const link = document.createElement('a');
        link.href = `data:application/pdf;base64,${data.pdf}`;
        link.download = `quote-${Date.now()}.pdf`;
        link.click();
        alert('Quote downloaded successfully!');
      } else {
        alert('Error generating quote. Please try again.');
      }
    } catch (error) {
      console.error('Error generating quote:', error);
      alert('Error generating quote. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (variant === 'secondary') {
    return (
      <button
        onClick={handleGetQuote}
        disabled={loading}
        className={`inline-flex items-center gap-2 px-6 py-3 border border-white/20 bg-white/5 text-white rounded-full transition-all hover:bg-white/15 disabled:opacity-50 ${className}`}
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Download className="w-5 h-5" />
            Get Quote
          </>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleGetQuote}
      disabled={loading}
      className={`inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-yellow-400 via-emerald-400 to-sky-500 text-slate-900 font-semibold rounded-full shadow-xl transition hover:shadow-2xl disabled:opacity-50 ${className}`}
    >
      {loading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Download className="w-5 h-5" />
          Get Quote
        </>
      )}
    </button>
  );
}

