import { useEffect, useState } from 'react';

type UseScrollActivityOptions = {
  idleDelayMs?: number;
};

export function useScrollActivity(options: UseScrollActivityOptions = {}): boolean {
  const { idleDelayMs = 140 } = options;
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let idleTimeout: ReturnType<typeof setTimeout> | null = null;

    const handleScroll = () => {
      setIsActive(true);

      if (idleTimeout) {
        clearTimeout(idleTimeout);
      }

      idleTimeout = setTimeout(() => {
        setIsActive(false);
      }, idleDelayMs);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (idleTimeout) {
        clearTimeout(idleTimeout);
      }
    };
  }, [idleDelayMs]);

  return isActive;
}
