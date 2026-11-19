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
  User,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type WorkspaceMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  user?: {
    email: string;
    name?: string;
  };
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

export function WorkspaceMenu({ isOpen, onClose, user }: WorkspaceMenuProps) {
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
      {/* Overlay */}
      <div
        className='fixed inset-0 z-40 bg-black/50 backdrop-blur-sm'
        onClick={onClose}
      />

      {/* Menu Slide */}
      <div className='fixed inset-y-0 left-0 z-50 w-full max-w-sm overflow-y-auto bg-slate-950 shadow-2xl transition-transform duration-300 ease-out'>
        {/* Header */}
        <div className='sticky top-0 border-b border-slate-800 bg-slate-950/95 backdrop-blur px-6 py-4 flex items-center justify-between'>
          <div>
            <h1 className='text-xl font-bold text-white'>sk-wallet</h1>
            <p className='text-xs text-slate-400 uppercase tracking-wider'>
              Workspace Menu
            </p>
          </div>
          <button
            onClick={onClose}
            className='rounded-lg p-2 hover:bg-slate-800 transition-colors'
            aria-label='Close menu'
          >
            <X className='h-5 w-5 text-slate-400' />
          </button>
        </div>

        {/* Menu Items */}
        <div className='p-6 space-y-6'>
          <div>
            <p className='text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4'>
              Navigate
            </p>
            <div className='space-y-2'>
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      'group flex items-start gap-4 rounded-lg px-4 py-3',
                      'transition-all duration-200',
                      'hover:bg-slate-800/50 active:bg-slate-700',
                      'text-slate-300 hover:text-white'
                    )}
                  >
                    <Icon className='mt-0.5 h-5 w-5 flex-shrink-0 text-slate-400 group-hover:text-blue-400 transition-colors' />
                    <div className='flex-1 min-w-0'>
                      <h3 className='text-sm font-semibold'>{item.label}</h3>
                      <p className='text-xs text-slate-500'>{item.description}</p>
                    </div>
                    <ChevronRight className='mt-0.5 h-5 w-5 text-slate-600 group-hover:text-blue-400 transition-colors' />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer - User Section */}
        <div className='sticky bottom-0 border-t border-slate-800 bg-slate-950/95 backdrop-blur px-6 py-4 space-y-3'>
          {user && (
            <div className='rounded-lg bg-slate-900/50 p-3 border border-slate-800'>
              <div className='flex items-center gap-3'>
                <div className='flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600'>
                  <User className='h-5 w-5 text-white' />
                </div>
                <div className='flex-1 min-w-0'>
                  {user.name && (
                    <p className='text-sm font-semibold text-white truncate'>
                      {user.name}
                    </p>
                  )}
                  <p className='text-xs text-slate-400 truncate'>{user.email}</p>
                </div>
              </div>
            </div>
          )}

          <Button
            onClick={handleLogout}
            disabled={isLoggingOut}
            variant='outline'
            className={cn(
              'w-full gap-2 justify-center',
              'border-slate-700 hover:border-red-500/50 hover:bg-red-500/10',
              'text-slate-300 hover:text-red-400'
            )}
          >
            <LogOut className='h-4 w-4' />
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </Button>
        </div>
      </div>
    </>
  );
}
