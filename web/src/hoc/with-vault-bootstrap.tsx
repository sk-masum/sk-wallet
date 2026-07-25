'use client';

import { useEffect } from 'react';

import { showToast } from '@/lib/toast';

type WithVaultBootstrapConfig<Props, Item> = {
  useSetItems: () => (items: Item[]) => void;
  getItems: (props: Props) => Item[];
  getError?: (props: Props) => string | undefined;
};

export function withVaultBootstrap<Props extends object, Item>(
  Component: React.ComponentType<Props>,
  config: WithVaultBootstrapConfig<Props, Item>,
) {
  function WrappedComponent(props: Props) {
    const setItems = config.useSetItems();
    const items = config.getItems(props);
    const initialError = config.getError?.(props);

    useEffect(() => {
      setItems(items);
    }, [items, setItems]);

    useEffect(() => {
      if (!initialError) return;

      showToast({
        message: initialError,
        variant: 'error',
      });
    }, [initialError]);

    return <Component {...props} />;
  }

  WrappedComponent.displayName = `withVaultBootstrap(${Component.displayName || Component.name || 'Component'})`;

  return WrappedComponent;
}
