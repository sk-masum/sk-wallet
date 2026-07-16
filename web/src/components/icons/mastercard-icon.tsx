import type { SvgIconProps } from '@/models/icon'

const MastercardIcon = (props: SvgIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    viewBox="0 0 24 24"
    {...props}
  >
    <g fill="none" fillRule="evenodd">
      <circle cx={7} cy={12} r={7} fill="#EA001B" />
      <circle cx={17} cy={12} r={7} fill="#FFA200" fillOpacity={0.8} />
    </g>
  </svg>
)
export default MastercardIcon
