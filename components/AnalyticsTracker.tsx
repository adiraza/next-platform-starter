"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Track page view
    const trackPageView = async () => {
      try {
        // Track visitor
        await fetch('/api/analytics', {
          method: 'POST',
        });

        // Track page view
        const pageName = pathname === '/' ? 'Home' : pathname.split('/').pop()?.charAt(0).toUpperCase() + pathname.split('/').pop()?.slice(1) || 'Unknown';
        await fetch('/api/analytics/pageview', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ page: pageName }),
        });
      } catch (error) {
        // Silently fail - analytics shouldn't break the site
        console.error('Analytics tracking error:', error);
      }
    };

    // Only track on client side and not in admin panel
    if (typeof window !== 'undefined' && !pathname.startsWith('/admin')) {
      trackPageView();
    }
  }, [pathname]);

  return null;
}

