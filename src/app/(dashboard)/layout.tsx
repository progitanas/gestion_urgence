'use client';
import { AppLogo } from '@/components/shared/app-logo';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { navLinks, type NavLink } from '@/config/nav-links';
import { useAuthMock } from '@/context/auth-context-mock';
import { cn } from '@/lib/utils';
import { LogOut, Menu, UserCircle } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import Image from 'next/image';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout, isLoading } = useAuthMock();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
      </div>
    );
  }

  const userNavLinks = navLinks.filter(link => link.roles.includes(user.role));

  const SidebarContentNav = () => (
    <nav className="flex flex-col gap-1 px-2">
      {userNavLinks.filter(link => !link.isBottom).map((link) => (
        <Button
          key={link.href}
          variant={pathname === link.href ? 'secondary' : 'ghost'}
          className={cn(
            "w-full justify-start gap-2",
            pathname === link.href ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          )}
          asChild
        >
          <Link href={link.href}>
            <link.icon className="h-5 w-5" />
            {link.label}
          </Link>
        </Button>
      ))}
    </nav>
  );


  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex h-screen w-64 flex-col border-r bg-sidebar shadow-lg">
        <div className="flex h-16 items-center border-b px-6 bg-sidebar-primary">
          <AppLogo colorClassName="text-sidebar-primary-foreground" />
        </div>
        <ScrollArea className="flex-1 py-4">
          <SidebarContentNav />
        </ScrollArea>
        <div className="mt-auto p-4 border-t border-sidebar-border">
            <Button onClick={logout} variant="ghost" className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
              <LogOut className="h-5 w-5" />
              Logout
            </Button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        {/* Header for Mobile and Desktop */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 sm:px-6 shadow-sm">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 bg-sidebar p-0 flex flex-col">
                 <div className="flex h-16 items-center border-b px-6 bg-sidebar-primary">
                    <AppLogo colorClassName="text-sidebar-primary-foreground" />
                  </div>
                  <ScrollArea className="flex-1 py-4">
                    <SidebarContentNav />
                  </ScrollArea>
                   <div className="mt-auto p-4 border-t border-sidebar-border">
                      <Button onClick={logout} variant="ghost" className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                        <LogOut className="h-5 w-5" />
                        Logout
                      </Button>
                  </div>
              </SheetContent>
            </Sheet>
          </div>
          <div className="flex-1">
            {/* Optional: Breadcrumbs or Page Title can go here */}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-foreground">
              {user.name} ({user.role})
            </span>
            <UserCircle className="h-8 w-8 text-muted-foreground" />
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
