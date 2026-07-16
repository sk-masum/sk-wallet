import type { SVGProps } from 'react'
import { CardNetwork } from './card'

export type SvgIconProps = SVGProps<SVGSVGElement>

export type BrandLogoProps = {
  className?: string
}

export interface NetworkLogoProps {
  brand: CardNetwork;
  className?: string
}