/** Colours and spacing shared by every screen: the V2 design tokens (SDK) under the old key names. */
import { brand, currency, stars, status, surface, text } from '../sdk/tokens'

export const colors = {
  bg: surface.bg,
  panel: surface.panel,
  panelHigh: surface.panelHigh,
  border: surface.border,
  text: text.primary,
  muted: text.secondary,
  accent: brand.accent,
  accentText: text.onAccent,
  gold: brand.gold,
  awakened: stars.awakened,
  mana: currency.mana,
  danger: status.danger,
  success: status.success,
  hpHigh: status.success,
  hpMid: status.warning,
  hpLow: status.danger,
  devBanner: '#7a3b00',
} as const

export const space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 } as const
export const radius = { sm: 6, md: 10, lg: 16 } as const
