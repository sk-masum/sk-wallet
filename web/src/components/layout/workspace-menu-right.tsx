'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  X,
  ChevronRight,
  LayoutDashboard,
  Settings,
  CreditCard,
  FileText,
  Lock,
  LogOut,
  Menu,
  Plus,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type WorkspaceMenuRightProps = {
  isOpen: boolean;
  onClose: () => void;
  user?: {
    email: string;
    name?: string;
  };
  onAddClick?: () => void;
};

const menuItems = [
  {
    label: 'Dashboard',
    description: 'View your overview',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    label: 'Cards',
    description: 'Manage your cards',
    href: '/card',
    icon: CreditCard,
  },
  {
    label: 'Documents',
    description: 'View your documents',
    href: '/doc',
    icon: FileText,
  },
  {
    label: 'Credentials',
    description: 'Manage credentials',
    href: '/credential',
    icon: Lock,
  },
  {
    label: 'Settings',
    description: 'Configure preferences',
    href: '/settings',
    icon: Settings,
  },
];

export function WorkspaceMenuRight({ isOpen, onClose, user, onAddClick }: WorkspaceMenuRightProps) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const response = await fetch('/api/auth/logout', { method: 'POST' });
      if (response.ok) {
        router.push('/auth');
        onClose();
      }
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay Backdrop */}
      <div
        className='fixed inset-0 z-40 bg-black/50 backdrop-blur-sm'
        onClick={onClose}
      />

      {/* Menu Slide from Right - SiteLedger Template Style */}
      <div className='fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-background shadow-2xl transition-transform duration-300 ease-out flex flex-col'>
        {/* Header with Logo and Close */}
        <div
          className='border-b border-white/14 bg-background px-6 pb-6 flex items-center justify-between'
          style={{ paddingTop: 'max(1.5rem, env(safe-area-inset-top))' }}
        >
          <div>
            <h1 className='text-2xl font-bold tracking-tight text-foreground'>
              Sk Wallet<span className='text-primary'>.</span>
            </h1>
            <p className='text-xs text-text-subtle uppercase tracking-widest mt-2'>
              wallet to manage card, ids, creds.
            </p>
          </div>
          <button
            onClick={onClose}
            className='rounded-full p-2 hover:bg-white/8 transition-colors focus-visible:outline-2 outline-offset-2 outline-primary'
            aria-label='Close menu'
          >
            <X className='h-5 w-5 text-text-soft' />
          </button>
        </div>

        {/* Main Content - Menu Items */}
        <div className='flex-1 overflow-y-auto'>
          <div className='px-6 py-8'>
            {/* Section Label */}
            <p className='text-xs font-semibold text-text-subtle uppercase tracking-widest mb-8'>
              Manage your workspace
            </p>

            {/* Navigation Items */}
            <nav aria-label='Workspace navigation' className='space-y-8'>
              {menuItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      'group flex items-start justify-between w-full',
                      'transition-all duration-300 ease-out',
                      'animation-menu-reveal',
                      'hover:translate-x-1'
                    )}
                    style={{
                      animationDelay: `${80 + index * 60}ms`,
                    } as React.CSSProperties}
                  >
                    <div className='flex-1 flex items-start gap-4'>
                      <IconComponent className='h-6 w-6 text-primary/60 group-hover:text-primary transition-colors duration-300 shrink-0 mt-1' />
                      <div className='flex-1'>
                        <h3 className='text-2xl font-normal text-foreground group-hover:text-primary transition-colors duration-300'>
                          {item.label}
                        </h3>
                        <p className='text-sm text-text-soft mt-2 group-hover:text-primary/80 transition-colors duration-300'>
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className='h-6 w-6 text-primary/40 group-hover:text-primary transition-all duration-300 flex-shrink-0 ml-4 mt-1' />
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Bottom Bar - User Info and Logout */}
        <div className='border-t border-white/14 bg-background px-6 py-5 flex items-center justify-between'>
          {/* User Info on Left */}
          {user && (
            <div className='min-w-0 flex-1'>
              {user.name && (
                <p className='text-sm font-medium text-foreground truncate'>
                  {user.name}
                </p>
              )}
              <p className='text-xs text-text-soft truncate'>{user.email}</p>
            </div>
          )}

          {/* Logout Button on Right */}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={cn(
              'shrink-0 p-2 ml-4',
              'rounded-lg hover:bg-white/8 transition-colors',
              'text-destructive hover:text-destructive',
              'focus-visible:outline-2 outline-offset-2 outline-primary',
              'disabled:opacity-50 disabled:cursor-wait'
            )}
            aria-label={isLoggingOut ? 'Logging out' : 'Logout'}
            title={isLoggingOut ? 'Logging out...' : 'Logout'}
          >
            <LogOut className='h-5 w-5 text-rose-400' />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes menu-reveal {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animation-menu-reveal {
          animation: menu-reveal 400ms cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .animation-menu-reveal {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}

export function MenuButtonRight() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setMenuOpen(true)}
        className={cn(
          'inline-flex items-center justify-center',
          'h-10 w-10 px-0',
          'rounded-lg border border-white/14',
          'bg-white/8 hover:bg-primary/10',
          'text-text-soft hover:text-primary',
          'transition-all duration-200 ease-out',
          'focus-visible:outline-2 outline-offset-2 outline-primary',
          'cursor-pointer'
        )}
        aria-label='Open workspace menu'
        aria-haspopup='dialog'
        aria-expanded={menuOpen}
      >
        <Menu className='h-5 w-5' />
      </button>

      <WorkspaceMenuRight
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
}
