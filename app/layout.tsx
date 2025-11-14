import "./globals.css";
import type { Metadata } from "next";
import ConditionalLayout from "@/components/ConditionalLayout";
import AnalyticsTracker from "@/components/AnalyticsTracker";

export const metadata: Metadata = {
  title: "Axel Energy | Solar Solutions",
  description: "Powering a greener future with sustainable solar energy systems.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Analytics Tracker */}
        <AnalyticsTracker />
        
        {/* Conditional Layout - Header only on non-admin pages */}
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
