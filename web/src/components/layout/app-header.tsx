'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import { WorkspaceMenu } from './workspace-menu';

type AppHeaderProps = {
  user?: {
    email: string;
    name?: string;
  };
  showMenuButton?: boolean;
};

export function AppHeader({ user, showMenuButton = true }: AppHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className='sticky top-0 z-30 border-b border-slate-800 bg-slate-950/95 backdrop-blur-md'>
        <div className='flex items-center justify-between px-4 py-3 md:px-6'>
          <div className='flex items-center gap-3'>
            {showMenuButton && (
              <button
                onClick={() => setMenuOpen(true)}
                className='rounded-lg p-2 hover:bg-slate-800 transition-colors lg:hidden'
                aria-label='Open menu'
              >
                <Menu className='h-6 w-6 text-slate-300' />
              </button>
            )}
            <div>
              <h1 className='text-lg font-bold text-white'>sk-wallet</h1>
            </div>
          </div>

          {user && (
            <div className='flex items-center gap-3'>
              <div className='text-right hidden sm:block'>
                <p className='text-sm font-medium text-white'>{user.name || 'User'}</p>
                <p className='text-xs text-slate-400'>{user.email}</p>
              </div>
              <div className='flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600'>
                <span className='text-sm font-semibold text-white'>
                  {user.name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          )}
        </div>
      </header>

      <WorkspaceMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        user={user}
      />
    </>
  );
}
