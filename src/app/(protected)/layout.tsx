import { SidebarProvider } from '@/components/ui/sidebar';
import React from 'react';
import SideBarLayoutClient from './SidebarLayoutClient'; 


export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider> 
      <SideBarLayoutClient>{children}</SideBarLayoutClient>
    </SidebarProvider>
  );
}