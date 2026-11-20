'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SkSidebarMenu } from '@seakh/ui-react';
import '@seakh/ui-core/styles.css';
import {
  LayoutDashboard,
  Settings,
  CreditCard,
  FileText,
  Lock,
  LogOut,
  Menu,
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
    id: 'dashboard',
    label: 'Dashboard',
    description: 'View your overview',
    href: '/',
  },
  {
    id: 'cards',
    label: 'Cards',
    description: 'Manage your cards',
    href: '/card',
  },
  {
    id: 'docs',
    label: 'Documents',
    description: 'View your documents',
    href: '/doc',
  },
  {
    id: 'creds',
    label: 'Credentials',
    description: 'Manage credentials',
    href: '/credential',
  },
  {
    id: 'settings',
    label: 'Settings',
    description: 'Configure preferences',
    href: '/settings',
  },
];

export function WorkspaceMenuRight({
  isOpen,
  onClose,
  user,
}: WorkspaceMenuRightProps) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!mounted) {
    return null;
  }

  return (
    <SkSidebarMenu
      open={isOpen}
      showTrigger={false}
      brandTitle="Sk Wallet"
      brandSubtitle="wallet to manage card, ids, creds."
      sectionLabel="Manage your workspace"
      variant="compact"
      theme="auto"
      placement="right"
      items={menuItems}
      onSkOpenChange={(e) => {
        if (!e.detail) {
          onClose();
        }
      }}
      onSkItemSelect={(e) => {
        if (e.detail.href) {
          router.push(e.detail.href);
        }
        onClose();
      }}
      suppressHydrationWarning
    >
      {/* Named Icon Slots */}
      <LayoutDashboard
        slot="icon-dashboard"
        className="h-6 w-6 text-lime-700 dark:text-primary/40 shrink-0 mt-1"
      />
      <CreditCard
        slot="icon-cards"
        className="h-6 w-6 text-lime-700 dark:text-primary/40 shrink-0 mt-1"
      />
      <FileText
        slot="icon-docs"
        className="h-6 w-6 text-lime-700 dark:text-primary/40 shrink-0 mt-1"
      />
      <Lock
        slot="icon-creds"
        className="h-6 w-6 text-lime-700 dark:text-primary/40 shrink-0 mt-1"
      />
      <Settings
        slot="icon-settings"
        className="h-6 w-6 text-lime-700 dark:text-primary/40 shrink-0 mt-1"
      />

      {/* Footer Slot - User Info and Logout */}
      <div
        slot="footer"
        className="flex w-full items-center justify-between"
        suppressHydrationWarning
      >
        {user && (
          <div className="min-w-0 flex-1">
            {user.name && (
              <p className="text-sm font-medium text-foreground truncate">
                {user.name}
              </p>
            )}
            <p className="text-xs text-text-soft truncate">{user.email}</p>
          </div>
        )}

        <button
          type="button"
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
          <LogOut className="h-5 w-5 text-rose-400" />
        </button>
      </div>
    </SkSidebarMenu>
  );
}

export function MenuButtonRight() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <WorkspaceMenuRight
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
}