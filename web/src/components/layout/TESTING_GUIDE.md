# Testing Guide: Right-Sliding Workspace Menu

## Quick Start Testing

### 1. **Start the Development Server**
```bash
npm run dev
```
The app will be available at `http://localhost:3000`

### 2. **Navigate to Listing Pages**
Visit any of these pages to see the menu button:
- http://localhost:3000/card
- http://localhost:3000/doc
- http://localhost:3000/credential

### 3. **Test Menu Interactions**

#### Menu Button Appearance
- Look for the **menu icon (☰)** in the top-right of the page header
- It appears next to the user/profile area
- Should be responsive on all screen sizes

#### Opening the Menu
1. Click the menu button
2. Menu should **slide in smoothly from the right edge**
3. A semi-transparent overlay should appear behind the menu

#### Menu Contents
Inside the menu, you should see:
1. **Header Section** (top)
   - Close button (×)
   - "sk-wallet" branding
   - "Menu" label

2. **Navigation Items** (5 items)
   - Dashboard (with home icon)
   - Cards (with card icon)
   - Documents (with document icon)
   - Credentials (with lock icon)
   - Settings (with settings icon)
   - Each has a description underneath

3. **User Section** (bottom)
   - User avatar (blue gradient circle)
   - User name (if available)
   - User email
   - Logout button (red)

#### Closing the Menu
Test multiple close methods:
1. Click the **× button** in menu header → menu closes
2. Click the **overlay/backdrop** → menu closes
3. Click a **navigation item** → goes to page and menu closes
4. Press **Escape key** (bonus: if implemented)

#### Navigation Testing
From the Cards page menu, click:
- **Dashboard** → goes to `/`
- **Documents** → goes to `/doc`
- **Credentials** → goes to `/credential`
- **Settings** → goes to `/settings`

#### User Info Testing
- Verify your email displays correctly
- Verify your name displays (if set in your profile)
- Avatar should show with blue gradient background

#### Logout Testing
1. Click logout button in menu
2. Should redirect to auth page
3. User should be logged out

### 4. **Responsive Testing**

#### Mobile (< 640px)
- Menu should be full-width with max-width of 384px
- Should slide smoothly on small screens
- Overlay should be properly positioned
- Text should be readable

#### Tablet (640px - 1024px)
- Menu positioning should remain on right side
- Overlay coverage should be correct
- Items should have proper spacing

#### Desktop (> 1024px)
- Menu should still be accessible
- Should maintain consistent styling
- No horizontal scroll issues

### 5. **Visual Polish Checklist**

- [ ] Menu slides smoothly (300ms animation)
- [ ] Overlay has correct opacity (looks semi-transparent)
- [ ] Text contrast is good (readable)
- [ ] Icons are properly sized and aligned
- [ ] No layout shift when menu opens
- [ ] Menu closes properly on all triggers
- [ ] User info displays with proper spacing
- [ ] Logout button is visually distinct (red)
- [ ] Hover states work on menu items
- [ ] All page links work correctly

### 6. **Edge Cases to Test**

#### No User Session
- Try accessing menu while logged out
- Menu should still appear
- User section might be empty or show "Sign in"

#### Long User Names/Emails
- Test with very long email addresses
- Text should truncate properly with ellipsis
- Should not break layout

#### Multiple Pages
- Test menu on each listing page
- Menu should work identically on all pages
- Navigation should work correctly from each page

#### Fast Clicking
- Try opening and closing menu rapidly
- Should not cause layout issues
- Should handle clicks gracefully

### 7. **Console Checks**

Open browser DevTools (F12) and check:
- [ ] No console errors
- [ ] No console warnings
- [ ] Network requests complete successfully
- [ ] No TypeScript type errors

### 8. **Performance**

- Menu should open instantly (< 100ms perceived latency)
- No lag when clicking navigation items
- Smooth scroll behavior in menu (if content overflows)
- No unnecessary re-renders

---

## Expected Behavior Summary

| Action | Expected Result |
|--------|-----------------|
| Click menu button | Menu slides in from right, overlay appears |
| Click × button | Menu slides out, overlay disappears |
| Click overlay | Menu slides out, overlay disappears |
| Click nav item | Navigates to page, menu closes |
| Hover on item | Item background changes slightly |
| View user section | Shows email and name from session |
| Click logout | Signs out user, redirects to auth page |

---

## Troubleshooting

### Menu not appearing?
1. Clear browser cache (Ctrl+Shift+Delete)
2. Hard reload (Ctrl+Shift+R or Cmd+Shift+R)
3. Check browser console for errors
4. Verify you're on a listing page

### Menu not closing?
1. Check if `onClose` callback is being triggered
2. Verify click event handlers are attached
3. Check z-index conflicts in styles

### User info not showing?
1. Verify you're logged in
2. Check NextAuth session is working
3. Inspect `useSession()` hook in browser DevTools

### Styling issues?
1. Clear Next.js cache: `rm -rf .next`
2. Rebuild project: `npm run build`
3. Check if Tailwind CSS is loading
4. Verify dark theme CSS is applied

---

## Browser Compatibility

Tested and working on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## Performance Benchmarks

Target metrics:
- Menu open: < 300ms animation
- Menu close: < 300ms animation
- Navigation click: < 100ms redirect
- Initial load: No impact on page load time
