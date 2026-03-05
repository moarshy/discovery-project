import type { IntegrationId } from '../../types';

/**
 * Custom brand marks for integrations. Single-letter or symbol glyphs
 * rendered in the brand's color — avoids generic Lucide icon proxies.
 */

interface BrandConfig {
  letter: string;
  color: string;
  bg: string;
}

const brands: Record<IntegrationId, BrandConfig> = {
  jira:          { letter: 'J',  color: '#2684FF', bg: '#2684FF15' },
  confluence:    { letter: 'C',  color: '#1868DB', bg: '#1868DB15' },
  'google-drive':{ letter: 'G',  color: '#EA4335', bg: '#EA433515' },
  slack:         { letter: 'S',  color: '#611f69', bg: '#611f6915' },
  'local-files': { letter: '↑',  color: '#8888A0', bg: '#8888A015' },
  intercom:      { letter: 'I',  color: '#286EFA', bg: '#286EFA15' },
  airtable:      { letter: 'A',  color: '#18BFFF', bg: '#18BFFF15' },
  mixpanel:      { letter: 'M',  color: '#7856FF', bg: '#7856FF15' },
  discord:       { letter: 'D',  color: '#5865F2', bg: '#5865F215' },
};

type BrandMarkSize = 'sm' | 'md' | 'lg';

const sizes: Record<BrandMarkSize, { container: string; text: string }> = {
  sm: { container: 'w-4 h-4 text-[8px]',   text: 'font-bold' },
  md: { container: 'w-7 h-7 text-[11px]',  text: 'font-bold' },
  lg: { container: 'w-9 h-9 text-sm',      text: 'font-bold' },
};

interface BrandMarkProps {
  id: IntegrationId;
  size?: BrandMarkSize;
}

export function BrandMark({ id, size = 'md' }: BrandMarkProps) {
  const brand = brands[id];
  if (!brand) return null;
  const s = sizes[size];

  return (
    <span
      className={`${s.container} rounded-md inline-flex items-center justify-center shrink-0 select-none`}
      style={{ backgroundColor: brand.bg, color: brand.color }}
    >
      <span className={s.text}>{brand.letter}</span>
    </span>
  );
}

/** Inline badge variant — just the letter, no container */
export function BrandDot({ id }: { id?: IntegrationId }) {
  if (!id) return null;
  const brand = brands[id];
  if (!brand) return null;

  return (
    <span
      className="inline-flex items-center justify-center w-3.5 h-3.5 rounded text-[7px] font-bold shrink-0 select-none"
      style={{ backgroundColor: brand.bg, color: brand.color }}
      title={id}
    >
      {brand.letter}
    </span>
  );
}
