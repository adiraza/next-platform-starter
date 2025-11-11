import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Excel Energy | Solar Solutions",
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
        {/* Header stays globally */}
        <Header />

        {/* Main page content */}
        <main>{children}</main>
      </body>
    </html>
  );
}
