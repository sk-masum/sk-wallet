import type { ReactNode } from 'react';

import {
  ListingFilterDesktopSection,
  ListingFilterMobileSection,
} from '@/components/shared/listing-filter-panels';
import { ListingFilterSelect } from '@/components/shared/listing-filter-select';

export type ListingFilterSelectSectionConfig = {
  id: string;
  desktopLabel: string;
  mobileLabel: string;
  mobileIcon: ReactNode;
  value: string;
  onValueChange: (value: string) => void;
  ariaLabel: string;
  placeholder: string;
  options: Array<{ value: string; label: string }>;
  allOption?: { value: string; label: string };
};

type ListingFilterSelectSectionsProps = {
  sections: ListingFilterSelectSectionConfig[];
};

export function ListingFilterDesktopSelectSections({ sections }: ListingFilterSelectSectionsProps) {
  return (
    <>
      {sections.map((section) => (
        <ListingFilterDesktopSection key={section.id} label={section.desktopLabel}>
          <ListingFilterSelect
            value={section.value}
            onValueChange={section.onValueChange}
            ariaLabel={section.ariaLabel}
            placeholder={section.placeholder}
            allOption={section.allOption}
            options={section.options}
          />
        </ListingFilterDesktopSection>
      ))}
    </>
  );
}

export function ListingFilterMobileSelectSections({ sections }: ListingFilterSelectSectionsProps) {
  return (
    <>
      {sections.map((section) => (
        <ListingFilterMobileSection
          key={section.id}
          label={section.mobileLabel}
          icon={section.mobileIcon}
        >
          <ListingFilterSelect
            value={section.value}
            onValueChange={section.onValueChange}
            ariaLabel={section.ariaLabel}
            placeholder={section.placeholder}
            allOption={section.allOption}
            options={section.options}
          />
        </ListingFilterMobileSection>
      ))}
    </>
  );
}
