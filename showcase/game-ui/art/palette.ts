import type { Element } from '../../api/types'

/** Colours of each element: main, dark (shadows), light (highlights), glow. */
export const ELEMENT_COLORS: Record<
  Element,
  { main: string; dark: string; light: string; glow: string; label: string }
> = {
  fire: { main: '#ff6a3d', dark: '#9c2410', light: '#ffc078', glow: '#ff8a4c', label: 'Feu' },
  water: { main: '#3fa3ff', dark: '#103f87', light: '#a8dcff', glow: '#5ec2ff', label: 'Eau' },
  wind: { main: '#4fd6a0', dark: '#0f6b4a', light: '#b8f5d9', glow: '#6ef0b8', label: 'Vent' },
  earth: { main: '#c48a4a', dark: '#5c3714', light: '#ecc796', glow: '#d9a35f', label: 'Terre' },
  lightning: {
    main: '#f5d23b',
    dark: '#8a6a00',
    light: '#fff2a6',
    glow: '#ffe45c',
    label: 'Foudre',
  },
  light: { main: '#fff1b8', dark: '#b08a2e', light: '#ffffff', glow: '#fff6cc', label: 'Lumière' },
  dark: { main: '#9b5cff', dark: '#2e0f5c', light: '#d2b3ff', glow: '#b07dff', label: 'Ténèbres' },
  unknown: { main: '#8b8a99', dark: '#26242f', light: '#d6d4e0', glow: '#a9a7b8', label: '?' },
}

/** Frame colour by stars: bronze, silver, gold, then precious colours up to the 7-star prism. */
export const STAR_FRAMES: Record<number, [string, string]> = {
  1: ['#8a5a3c', '#c48a63'],
  2: ['#8a5a3c', '#d9a77f'],
  3: ['#8b95a8', '#e3e9f2'],
  4: ['#b8892a', '#ffe08a'],
  5: ['#7b3fd6', '#e2b8ff'],
  6: ['#d63f5c', '#ffd27a'],
  7: ['#3fd6c8', '#ff9df5'],
  8: ['#1b1830', '#e8e6ff'],
}

export const GREY = {
  main: '#5d5a6e',
  dark: '#2c2a38',
  light: '#9b98ad',
  glow: '#6d6a80',
  label: '',
}

/** One colour per rune set (grinds, gems, set badges). */
export const SET_COLORS: Record<string, string> = {
  fureur: '#ff5a4f',
  celerite: '#3fd6c8',
  acharnement: '#ff9f1c',
  vampire: '#b0103a',
  vitalite: '#5fd38d',
  rempart: '#8b95a8',
  ferveur: '#ffd23f',
  precision: '#4aa3f0',
  resolution: '#9b5cff',
  lame: '#e86a9a',
  garde: '#6b8cff',
  seve: '#9be15d',
}

/** Material tiers 1-5: common to mythic. */
export const TIER_COLORS = ['#b8b4c8', '#5fd38d', '#4aa3f0', '#c46cf0', '#f2a94e'] as const

/** Scroll colours by summon: [paper, ribbon]. */
export const SCROLL_COLORS: Record<string, [string, string]> = {
  basic: ['#d9c79a', '#8a6a3c'],
  standard: ['#9ccfff', '#2a62b8'],
  light_dark: ['#e9d8ff', '#6b2fbf'],
  legendary: ['#ffe2a8', '#d98a1c'],
  mythic: ['#ffd27a', '#c2272d'],
  all_attributes: ['#d6f5ff', '#1f9e8f'],
  light_dark_mythic: ['#fff4d6', '#4b1a8f'],
}
