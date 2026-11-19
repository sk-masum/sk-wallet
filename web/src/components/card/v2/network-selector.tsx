'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { CardNetwork } from '@/models/card';
import { NetworkLogo } from '@/components/icons/network-logo';
import { CARD_NETWORKS } from '@/constants/card/networks';
import { cn } from '@/lib/utils';

export type NetworkSelectorProps = {
  currentNetwork: CardNetwork;
  onChange: (network: CardNetwork) => void;
  disabled?: boolean;
};

export function NetworkSelector({
  currentNetwork,
  onChange,
  disabled,
}: NetworkSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const currentNetworkMeta = CARD_NETWORKS.find((n) => n.code === currentNetwork);
  const currentNetworkLabel = currentNetworkMeta?.formLabel || 'Select Network';

  const handleSelect = (network: CardNetwork) => {
    onChange(network);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-full">
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          'flex items-center gap-2 px-4 py-2 w-full border rounded-lg transition-colors',
          disabled
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
            : 'border-gray-300 hover:bg-gray-50 hover:border-gray-400 cursor-pointer',
        )}
      >
        <NetworkLogo brand={currentNetwork} className="w-6 h-6" />
        <span className="flex-1 text-left">{currentNetworkLabel}</span>
        <ChevronDown
          className={cn(
            'w-4 h-4 transition-transform flex-shrink-0',
            isOpen ? 'rotate-180' : '',
          )}
        />
      </button>

      {isOpen && !disabled && (
        <div className="absolute top-full mt-1 w-full border border-gray-300 rounded-lg bg-white shadow-lg z-50">
          {CARD_NETWORKS.map((network) => (
            <button
              key={network.code}
              type="button"
              onClick={() => handleSelect(network.code)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 w-full text-left transition-colors',
                currentNetwork === network.code
                  ? 'bg-blue-50 hover:bg-blue-100 font-semibold'
                  : 'hover:bg-gray-50',
              )}
            >
              <NetworkLogo brand={network.code} className="w-6 h-6" />
              <span>{network.formLabel}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
