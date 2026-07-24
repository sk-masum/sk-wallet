'use client';

import { useEffect, useRef, useState } from 'react';

export type EntityDetailsSelection<TType extends string> = {
  id: string;
  type: TType;
  href: string;
};

type UseEntityDetailsDialogOptions<TType extends string, TData> = {
  fetchDetails: (item: EntityDetailsSelection<TType>) => Promise<TData>;
  getErrorMessage?: (item: EntityDetailsSelection<TType>) => string;
};

export function useEntityDetailsDialog<TType extends string, TData>({
  fetchDetails,
  getErrorMessage,
}: UseEntityDetailsDialogOptions<TType, TData>) {
  const [selectedItem, setSelectedItem] =
    useState<EntityDetailsSelection<TType> | null>(null);
  const [detailData, setDetailData] = useState<TData | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [detailsError, setDetailsError] = useState<string | null>(null);
  const fetchDetailsRef = useRef(fetchDetails);
  const getErrorMessageRef = useRef(getErrorMessage);

  useEffect(() => {
    fetchDetailsRef.current = fetchDetails;
    getErrorMessageRef.current = getErrorMessage;
  }, [fetchDetails, getErrorMessage]);

  useEffect(() => {
    if (!selectedItem) {
      setDetailData(null);
      setDetailsError(null);
      setLoadingDetails(false);
      return;
    }

    let cancelled = false;
    const activeItem = selectedItem;

    const loadDetails = async () => {
      setLoadingDetails(true);
      setDetailsError(null);
      setDetailData(null);

      try {
        const data = await fetchDetailsRef.current(activeItem);

        if (cancelled) return;
        setDetailData(data);
      } catch {
        if (cancelled) return;
        setDetailsError(
          getErrorMessageRef.current?.(activeItem) ?? 'Unable to load details.',
        );
      } finally {
        if (!cancelled) {
          setLoadingDetails(false);
        }
      }
    };

    void loadDetails();

    return () => {
      cancelled = true;
    };
  }, [selectedItem]);

  return {
    selectedItem,
    setSelectedItem,
    detailData,
    loadingDetails,
    detailsError,
    dialogOpen: Boolean(selectedItem),
    closeDialog: () => setSelectedItem(null),
  };
}
