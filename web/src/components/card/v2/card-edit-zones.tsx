'use client';

import React from 'react';
import {
  Wifi,
  CreditCard,
  Type,
  Calendar,
  Palette,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type CardEditZonesProps = {
  activeZone?: string;
  onZoneClick: (zone: string) => void;
};

type Zone = {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  icon: React.ReactNode;
};

/**
 * Defines the interactive zones on a credit card for editing.
 * Coordinates are in percentages relative to the card dimensions.
 */
const ZONES: Zone[] = [
  {
    id: 'network',
    label: 'Network',
    x: 10,
    y: 8,
    width: 20,
    height: 15,
    icon: <Wifi size={14} />,
  },
  {
    id: 'card-number',
    label: 'Card Number',
    x: 10,
    y: 45,
    width: 80,
    height: 15,
    icon: <CreditCard size={14} />,
  },
  {
    id: 'card-name',
    label: 'Card Name',
    x: 10,
    y: 72,
    width: 50,
    height: 15,
    icon: <Type size={14} />,
  },
  {
    id: 'expiry',
    label: 'Expiry Date',
    x: 70,
    y: 72,
    width: 20,
    height: 15,
    icon: <Calendar size={14} />,
  },
  {
    id: 'theme',
    label: 'Theme & Pattern',
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    icon: <Palette size={14} />,
  },
];

export function CardEditZones({
  activeZone,
  onZoneClick,
}: CardEditZonesProps) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ zIndex: 10 }}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {/* Define gradients for hover effects */}
      <defs>
        <linearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="hoverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgb(107, 114, 128)" stopOpacity="0.1" />
          <stop offset="100%" stopColor="rgb(107, 114, 128)" stopOpacity="0.03" />
        </linearGradient>
      </defs>

      {/* Render zones from back to front, except theme which should be last */}
      {ZONES.filter((z) => z.id !== 'theme').map((zone) => (
        <g key={zone.id}>
          {/* Filled rectangle for hover/active state */}
          <rect
            x={zone.x}
            y={zone.y}
            width={zone.width}
            height={zone.height}
            fill={activeZone === zone.id ? 'url(#activeGradient)' : 'none'}
            className="transition-all duration-200 hover:fill-url(#hoverGradient)"
          />

          {/* Border with dashed style for inactive, solid for active */}
          <rect
            x={zone.x}
            y={zone.y}
            width={zone.width}
            height={zone.height}
            fill="none"
            stroke={activeZone === zone.id ? 'rgb(59, 130, 246)' : 'rgb(209, 213, 219)'}
            strokeWidth={activeZone === zone.id ? 1.5 : 1}
            strokeDasharray={activeZone === zone.id ? 'none' : '3,2'}
            onClick={() => onZoneClick(zone.id)}
            className="cursor-pointer transition-all duration-200 hover:stroke-rgb(107,114,128)"
            style={{ pointerEvents: 'auto' }}
          />

          {/* Label and icon for active or hover state */}
          {activeZone === zone.id && (
            <>
              {/* Semi-transparent background for label */}
              <rect
                x={zone.x + zone.width / 2 - 25}
                y={zone.y + zone.height / 2 - 10}
                width="50"
                height="20"
                rx="4"
                fill="rgb(59, 130, 246)"
                opacity="0.9"
              />
              {/* Label text */}
              <text
                x={zone.x + zone.width / 2}
                y={zone.y + zone.height / 2 + 3}
                textAnchor="middle"
                className="text-xs font-semibold"
                fill="white"
              >
                {zone.label}
              </text>
            </>
          )}
        </g>
      ))}

      {/* Theme zone is a full-card overlay shown when active */}
      {activeZone === 'theme' && (
        <g>
          <rect
            x="0"
            y="0"
            width="100"
            height="100"
            fill="url(#activeGradient)"
            onClick={() => onZoneClick('theme')}
            className="cursor-pointer"
          />
          <rect
            x="0"
            y="0"
            width="100"
            height="100"
            fill="none"
            stroke="rgb(59, 130, 246)"
            strokeWidth="1.5"
            onClick={() => onZoneClick('theme')}
            className="cursor-pointer"
          />
          {/* Centered label for theme zone */}
          <rect
            x="25"
            y="45"
            width="50"
            height="20"
            rx="4"
            fill="rgb(59, 130, 246)"
            opacity="0.9"
          />
          <text
            x="50"
            y="58"
            textAnchor="middle"
            className="text-xs font-semibold"
            fill="white"
          >
            Theme & Pattern
          </text>
        </g>
      )}
    </svg>
  );
}
