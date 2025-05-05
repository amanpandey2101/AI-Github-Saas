'use client' // <== MARK THIS AS CLIENT COMPONENT

import { useSidebar } from '@/components/ui/sidebar'; // Hook is used here
import { UserButton } from '@clerk/nextjs';
import React from 'react';
// Adjust the import path if app-sidebar.tsx is not in the same directory
import { AppSidebar } from './app-sidebar';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
    children: React.ReactNode
}

// This component now holds the UI structure and uses the hook
const SideBarLayoutClient = ({ children }: Props) => {
  // This call is valid because this component is 'use client'
  // AND it's rendered inside the SidebarProvider from layout.tsx
  const { toggleSidebar, open } = useSidebar();

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
        <AppSidebar/>
        <main className={cn(
            "flex flex-col flex-1 transition-all duration-300 ease-in-out",
             "sm:pl-14" // Adjust based on collapsed sidebar width
             // Add conditional padding if needed: e.g., open ? 'lg:pl-64' : 'sm:pl-14'
           )}>
            <header className='sticky top-0 z-10 flex items-center gap-2 border-b bg-background shadow rounded-md m-2 p-2 px-4 h-14'>
                <Button
                    variant="outline"
                    size="icon"
                    className="sm:hidden" // Adjust breakpoint if needed
                    onClick={toggleSidebar}
                >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Sidebar</span>
                </Button>

                <div className='ml-auto'>
                    {/* Other header items */}
                </div>
                <UserButton afterSignOutUrl="/"/>
            </header>

            <div className='flex-1 overflow-y-auto p-2 md:p-4'>
                {children}
            </div>
        </main>
    </div>
  );
}

export default SideBarLayoutClient;