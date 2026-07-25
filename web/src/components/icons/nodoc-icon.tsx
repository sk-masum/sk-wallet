import type { SvgIconProps } from '@/models/icon';

const NoDocIcon = ({ className, ...props }: SvgIconProps) => (
  <svg
    viewBox='0 0 240 140'
    role='img'
    aria-label='No matching documents'
    className={className}
    {...props}
  >
    <rect
      x='12'
      y='14'
      width='132'
      height='96'
      rx='10'
      className='fill-muted stroke-border'
      strokeWidth='2'
    />
    <rect x='32' y='34' width='72' height='8' rx='4' className='fill-border' />
    <rect x='32' y='52' width='90' height='8' rx='4' className='fill-border/80' />
    <rect x='32' y='70' width='62' height='8' rx='4' className='fill-border/60' />
    <circle cx='174' cy='84' r='36' className='fill-background stroke-primary/40' strokeWidth='4' />
    <line
      x1='150'
      y1='60'
      x2='198'
      y2='108'
      className='stroke-muted-foreground'
      strokeWidth='4'
      strokeLinecap='round'
    />
    <line
      x1='198'
      y1='60'
      x2='150'
      y2='108'
      className='stroke-muted-foreground'
      strokeWidth='4'
      strokeLinecap='round'
    />
  </svg>
);

export default NoDocIcon;
