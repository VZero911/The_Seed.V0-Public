/**
 * The Seed — design tokens V2 (NORME.md §10, game spec §8 nonies).
 *
 * The single source of the look of every client: the Expo game (mobile and web), the web tool and
 * console, and the future 3D client. `make sdk-sync` copies this file into each client; never edit
 * the copies. Colours are hex strings; the 3D client reads them with `hexToNumber`.
 *
 * Direction V2: "dark magic video game" — a night sky deep in violet, gold frames, elemental
 * glows, rarity colours readable at a glance, and motion that feels like a summon.
 */

/** Base surfaces, from the deepest background to the highest panel. */
export const surface = {
  void: '#07060f',
  bg: '#0d0b1c',
  panel: '#171430',
  panelHigh: '#221d44',
  panelGlass: 'rgba(34, 29, 68, 0.72)',
  border: '#352d63',
  borderGold: '#b8913a',
} as const

export const text = {
  primary: '#f4f0ff',
  secondary: '#b9b2dc',
  muted: '#7f78a6',
  onAccent: '#ffffff',
  onGold: '#1d1407',
} as const

/** The accent of the brand (violet) and the gold of frames, stars and rewards. */
export const brand = {
  accent: '#8f6cf0',
  accentBright: '#b49bff',
  accentDeep: '#5a3fd0',
  gold: '#f2c14e',
  goldBright: '#ffe08a',
  goldDeep: '#a57a1c',
} as const

/** The elements of the game: base colour, glow, and a dark tint for card backgrounds. */
export const elements = {
  fire: { base: '#ff6b3d', glow: '#ffb27a', tint: '#3a1610' },
  water: { base: '#3fa9ff', glow: '#9ad4ff', tint: '#0e2238' },
  wind: { base: '#5fe0a8', glow: '#b3f5d8', tint: '#0f2e22' },
  earth: { base: '#c98a4b', glow: '#ecc191', tint: '#2e1f10' },
  lightning: { base: '#f2d24e', glow: '#fff09a', tint: '#33290d' },
  light: { base: '#fff3c4', glow: '#ffffff', tint: '#38331f' },
  dark: { base: '#a15cff', glow: '#d2a8ff', tint: '#22113a' },
  unknown: { base: '#9a96b0', glow: '#d6d3e6', tint: '#1d1b2b' },
} as const
export type Element = keyof typeof elements

/** Rarity of runes, items and summons: one colour each, from grey to mythic red. */
export const rarity = {
  normal: '#9a96b0',
  uncommon: '#5fd38d',
  rare: '#3fa9ff',
  hero: '#b06cff',
  legendary: '#ff9d3d',
  mythic: '#ff4d6d',
} as const
export type Rarity = keyof typeof rarity

/** Stars: gold (natural), blue (awakened), grey (food, no evolution). */
export const stars = { gold: '#f2c14e', awakened: '#5fb8ff', grey: '#8a86a3' } as const

/** States and currencies. */
export const status = {
  success: '#5fd38d',
  warning: '#f2c14e',
  danger: '#ef5d6c',
  info: '#5fb8ff',
} as const
export const currency = {
  mana: '#6fc3ff',
  crystal: '#ff7ad9',
  poc: '#5fd38d',
  pot: '#f2c14e',
  energy: '#ffd84e',
} as const

/** Spacing (px), on a 4 px grid. */
export const space = { xxs: 2, xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32, huge: 48 } as const

/** Corner radii (px). */
export const radius = { sm: 6, md: 10, lg: 16, xl: 24, pill: 999 } as const

/** Type scale (px) and weights. One display font for titles, one sans for the rest. */
export const font = {
  display: "'Cinzel', 'Trajan Pro', Georgia, serif",
  body: "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",
  mono: "'JetBrains Mono', ui-monospace, monospace",
  size: { xs: 11, sm: 13, md: 15, lg: 18, xl: 22, xxl: 28, title: 36 },
  weight: { regular: '400', medium: '600', bold: '800' },
} as const

/** Glows and shadows, as CSS box-shadow strings (React Native reads `elevation`). */
export const glow = {
  soft: '0 4px 18px rgba(0, 0, 0, 0.45)',
  accent: '0 0 18px rgba(143, 108, 240, 0.55)',
  gold: '0 0 22px rgba(242, 193, 78, 0.55)',
  danger: '0 0 18px rgba(239, 93, 108, 0.55)',
} as const
export const elevation = { card: 4, raised: 8, modal: 16 } as const

/** Motion: durations (ms) and the curve of every UI animation. */
export const motion = {
  fast: 120,
  base: 220,
  slow: 420,
  summon: 1600,
  easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
} as const

/** Gradients of the frames of a card by its rarity: [top, bottom]. */
export function frameGradient(r: Rarity): [string, string] {
  return [rarity[r], surface.panel]
}

/** `#rrggbb` -> 0xrrggbb, for three.js. */
export function hexToNumber(hex: string): number {
  const clean = hex.replace('#', '')
  if (!/^[0-9a-fA-F]{6}$/.test(clean)) throw new Error(`not a #rrggbb colour: ${hex}`)
  return parseInt(clean, 16)
}

/** Relative luminance (WCAG) of a `#rrggbb` colour, 0 (black) to 1 (white). */
export function luminance(hex: string): number {
  const n = hexToNumber(hex)
  const channel = (v: number) => {
    const c = v / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  }
  return (
    0.2126 * channel((n >> 16) & 255) + 0.7152 * channel((n >> 8) & 255) + 0.0722 * channel(n & 255)
  )
}

/** WCAG contrast ratio between two `#rrggbb` colours (1 to 21). */
export function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number]
  return (hi + 0.05) / (lo + 0.05)
}

export const tokens = {
  surface,
  text,
  brand,
  elements,
  rarity,
  stars,
  status,
  currency,
  space,
  radius,
  font,
  glow,
  elevation,
  motion,
} as const
