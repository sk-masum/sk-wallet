# Workspace Menu - Implementation Guide

## Overview
A workspace menu component has been created to provide navigation between all major sections of the app. The menu mimics the design from the SiteLedger example with a dark theme and sliding panel interface.

## Components Created

### 1. **WorkspaceMenu** (`workspace-menu.tsx`)
The main menu panel component that slides in from the left side.

**Features:**
- Dark theme with glassmorphism
- Menu items with icons, labels, and descriptions
- Quick navigation to all sections
- User profile display at the bottom
- Logout functionality
- Overlay backdrop that closes the menu on click
- Responsive design for mobile and desktop

**Menu Items:**
- 📊 Dashboard → `/`
- 💳 Cards → `/card`
- 📄 Documents → `/doc`
- 🔐 Credentials → `/credential`
- ⚙️ Settings → `/settings`

### 2. **AppHeader** (`app-header.tsx`)
The top navigation header that appears on all pages.

**Features:**
- Sticky positioning
- Menu button (hamburger) for mobile
- User profile display on desktop
- Branding/logo area
- Responsive layout

### 3. **LayoutWrapper** (`layout-wrapper.tsx`)
A client component that wraps your pages and provides the header + menu system.

**Features:**
- Automatically gets user info from NextAuth session
- Displays app header on all wrapped pages
- Provides menu button functionality

## Usage

### Option 1: Wrap Your Page Layout
```tsx
// In your page or layout component
import { LayoutWrapper } from '@/components/layout';

export default function Page() {
  return (
    <LayoutWrapper>
      <YourPageContent />
    </LayoutWrapper>
  );
}
```

### Option 2: Use Components Individually
```tsx
'use client';

import { AppHeader, WorkspaceMenu } from '@/components/layout';
import { useState } from 'react';

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <AppHeader 
        user={{ email: 'user@example.com', name: 'John Doe' }}
        showMenuButton={true}
      />
      <WorkspaceMenu 
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        user={{ email: 'user@example.com', name: 'John Doe' }}
      />
      <main>Your content here</main>
    </>
  );
}
```

## Component Props

### AppHeader
```typescript
type AppHeaderProps = {
  user?: {
    email: string;
    name?: string;
  };
  showMenuButton?: boolean; // Default: true
};
```

### WorkspaceMenu
```typescript
type WorkspaceMenuProps = {
  isOpen: boolean;              // Controls menu visibility
  onClose: () => void;          // Callback when menu should close
  user?: {
    email: string;
    name?: string;
  };
};
```

## Styling

The menu uses a dark slate theme with:
- **Primary Background**: `bg-slate-950`
- **Hover States**: `hover:bg-slate-800/50`
- **Accent Color**: Blue (`blue-400`, `blue-600`)
- **Text**: White/slate gray
- **Icons**: From lucide-react

All styling is done with Tailwind CSS utilities and uses the `cn()` utility for conditional classes.

## Customization

### Change Menu Items
Edit the `menuItems` array in `workspace-menu.tsx`:

```typescript
const menuItems = [
  {
    label: 'Your Label',
    description: 'Your description',
    href: '/your-path',
    icon: YourIcon, // From lucide-react
  },
  // Add more items...
];
```

### Change Colors
Modify the Tailwind classes:
- Background: Change `bg-slate-950` to your preferred color
- Hover: Modify `hover:bg-slate-800/50`
- Accent: Update `text-blue-400`, `text-blue-600`

### Change Logout Endpoint
In `workspace-menu.tsx`, modify the fetch call:

```typescript
const response = await fetch('/api/auth/logout', { method: 'POST' });
```

Change `/api/auth/logout` to match your authentication setup.

## Page Links Summary

| Page | URL | Icon | Description |
|------|-----|------|-------------|
| Dashboard | `/` | 📊 | View your overview |
| Cards | `/card` | 💳 | Manage your cards |
| Documents | `/doc` | 📄 | View your documents |
| Credentials | `/credential` | 🔐 | Manage credentials |
| Settings | `/settings` | ⚙️ | Configure preferences |

## Browser Support
- Works on all modern browsers (Chrome, Firefox, Safari, Edge)
- Fully responsive for mobile, tablet, and desktop
- Touch-friendly interface for mobile devices

## Accessibility
- Proper ARIA labels for buttons
- Keyboard navigation support (from Next.js Link components)
- High contrast text for readability
- Semantic HTML structure

## Notes
- The menu automatically closes when a navigation link is clicked
- User profile is fetched from NextAuth session
- Logout functionality depends on your authentication API
- The overlay closes the menu when clicked
- Menu animations use smooth transitions (300ms)
