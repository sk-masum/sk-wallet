# Workspace Menu - Visual Structure

```
┌────────────────────────────────────────────┐
│          HEADER (AppHeader)                │
│  ☰ [Menu]  sk-wallet    [User] [Avatar]    │
└────────────────────────────────────────────┘

MENU PANEL (Slides from left when ☰ clicked)
┌──────────────────────────────┐
│ ✕                            │  ← Header with close button
│ sk-wallet                    │
│ WORKSPACE MENU               │
├──────────────────────────────┤
│                              │
│ NAVIGATE                     │
│                              │
│ 📊 Dashboard                 │  ← Menu item with icon
│    View your overview        │
│                              │
│ 💳 Cards                     │
│    Manage your cards         │
│                              │
│ 📄 Documents                 │
│    View your documents       │
│                              │
│ 🔐 Credentials               │
│    Manage credentials        │
│                              │
│ ⚙️ Settings                  │
│    Configure preferences     │
│                              │
├──────────────────────────────┤
│                              │
│ [👤] John Doe               │  ← User profile section
│      john@example.com        │
│                              │
│ [Logout]                     │  ← Logout button
│                              │
└──────────────────────────────┘
     ↑
   Overlay (semi-transparent, closes menu on click)
```

## Desktop View (1024px+)
```
┌──────────────────────────────────────────────────────┐
│          HEADER (AppHeader)                          │
│  sk-wallet              [John Doe] [👤]              │
│                        john@example.com             │
└──────────────────────────────────────────────────────┘

              [Main Content Area]
        Menu button is hidden on desktop
```

## Mobile View (< 1024px)
```
┌───────────────────────────────┐
│ ☰   sk-wallet           [👤]  │
└───────────────────────────────┘

[Overlay + Menu Slides In]

      [Main Content Area]
   Menu button visible on mobile
```

## Color Scheme

### Dark Theme
- **Background**: `#0F172A` (slate-950)
- **Secondary**: `#1E293B` (slate-800)
- **Text Primary**: `#FFFFFF` (white)
- **Text Secondary**: `#94A3B8` (slate-400)
- **Accent**: `#60A5FA` (blue-400)
- **Accent Dark**: `#2563EB` (blue-600)
- **Border**: `#1E293B` (slate-800)
- **Overlay**: `rgba(0, 0, 0, 0.5)` with blur

## Components Hierarchy

```
LayoutWrapper
├── AppHeader
│   ├── Menu Button (Mobile)
│   ├── Branding (sk-wallet)
│   └── User Profile
│       ├── Name (Desktop)
│       ├── Email (Desktop)
│       └── Avatar
│
└── WorkspaceMenu
    ├── Overlay (Backdrop)
    ├── Menu Slide Panel
    │   ├── Header
    │   │   ├── Branding
    │   │   └── Close Button
    │   │
    │   ├── Menu Items Section
    │   │   ├── Dashboard
    │   │   ├── Cards
    │   │   ├── Documents
    │   │   ├── Credentials
    │   │   └── Settings
    │   │
    │   └── User Section
    │       ├── User Profile Card
    │       │   ├── Avatar
    │       │   ├── Name
    │       │   └── Email
    │       │
    │       └── Logout Button
```

## Responsive Breakpoints

| Screen Size | Behavior |
|------------|----------|
| < 640px | Menu button visible, header compact |
| 640px - 1024px | Menu button visible, mobile layout |
| ≥ 1024px | Menu button hidden, desktop layout |

## Animations

- **Menu Slide**: 300ms ease-out transition
- **Menu Item Hover**: 200ms ease-out color transition
- **Icon Color Hover**: Smooth blue highlight
- **Button Hover**: Background and border transitions

## Interaction Flow

1. User clicks menu button (☰) in header
2. Menu opens with slide-in animation from left
3. Overlay backdrop appears
4. User can:
   - Click menu item → navigates and closes menu
   - Click overlay → closes menu
   - Click close button (✕) → closes menu
5. Menu closes with reverse animation

## Accessibility Features

- ✓ ARIA labels on interactive elements
- ✓ Semantic HTML (nav, button, links)
- ✓ Keyboard navigation support
- ✓ High contrast colors (WCAG AA compliant)
- ✓ Focus states on interactive elements
- ✓ Proper heading hierarchy
- ✓ Touch-friendly click areas (minimum 44x44px)
