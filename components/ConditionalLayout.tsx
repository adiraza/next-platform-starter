"use client";

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');

  // Don't show header on admin pages
  if (isAdminPage) {
    return <>{children}</>;
  }

  // Show header on regular pages
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}

