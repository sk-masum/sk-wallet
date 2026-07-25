import { useState } from 'react';

type FilterDialogState = {
  mobileOpen: boolean;
  desktopOpen: boolean;
  openMobileFilters: () => void;
  setMobileOpen: (open: boolean) => void;
  closeMobileFilters: () => void;
  toggleDesktopFilters: () => void;
  closeDesktopFilters: () => void;
};

export function useFilterDialogState(): FilterDialogState {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(false);

  return {
    mobileOpen,
    desktopOpen,
    openMobileFilters: () => setMobileOpen(true),
    setMobileOpen,
    closeMobileFilters: () => setMobileOpen(false),
    toggleDesktopFilters: () => setDesktopOpen((prev) => !prev),
    closeDesktopFilters: () => setDesktopOpen(false),
  };
}
