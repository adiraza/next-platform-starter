"use client";

import AdminLayout from '@/components/admin/AdminLayout';
import { usePathname } from 'next/navigation';

export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Don't wrap login page with AdminLayout
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }
  
  return <AdminLayout>{children}</AdminLayout>;
}

