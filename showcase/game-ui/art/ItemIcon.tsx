/**
 * A unique icon for every item: the shape tells the kind (essence, scroll, grind, gem, material
 * by category), the colour the element, the summon, the rune set or the material tier, and a
 * letter or pips tell same-shaped items apart.
 */
import Svg, {
  Circle,
  Defs,
  G,
  Path,
  Polygon,
  RadialGradient,
  Rect,
  Stop,
  Text,
} from 'react-native-svg'
import type { Element } from '../../api/types'
import { ELEMENT_COLORS, SCROLL_COLORS, SET_COLORS, TIER_COLORS } from './palette'

export interface ItemLike {
  id: string
  kind: string
  element?: Element | null
  pool?: string | null
  set?: string | null
  category?: string | null
  tier?: number | null
}

export function ItemIcon({ item, size = 36 }: { item: ItemLike; size?: number }) {
  const gid = `it-${item.id}`
  return (
    <Svg width={size} height={size} viewBox="0 0 40 40" accessibilityLabel={item.id}>
      <Defs>
        <RadialGradient id={gid} cx="50%" cy="40%" r="60%">
          <Stop offset="0" stopColor="#ffffff" stopOpacity={0.35} />
          <Stop offset="1" stopColor="#000000" stopOpacity={0} />
        </RadialGradient>
      </Defs>
      <Rect x={1} y={1} width={38} height={38} rx={9} fill="#1b1830" stroke="#3a3555" />
      {shape(item)}
      <Rect x={1} y={1} width={38} height={38} rx={9} fill={`url(#${gid})`} />
    </Svg>
  )
}

function letter(value: string, color = '#fff') {
  return (
    <Text x={20} y={24} fontSize={10} fontWeight="900" fill={color} textAnchor="middle">
      {value.charAt(0).toUpperCase()}
    </Text>
  )
}

function pips(tier: number, color: string) {
  return (
    <G>
      {Array.from({ length: tier }, (_, i) => (
        <Circle key={i} cx={20 - (tier - 1) * 3 + i * 6} cy={35} r={1.8} fill={color} />
      ))}
    </G>
  )
}

function shape(item: ItemLike) {
  switch (item.kind) {
    case 'essence': {
      const c = ELEMENT_COLORS[item.element ?? 'fire']
      return (
        <G>
          <Circle cx={20} cy={20} r={12} fill={c.dark} stroke={c.main} strokeWidth={2} />
          <Path d="M20 10c4 4 6 7 6 10a6 6 0 0 1-12 0c0-3 2-6 6-10z" fill={c.light} />
          <Circle cx={17} cy={17} r={2} fill="#fff" opacity={0.7} />
        </G>
      )
    }
    case 'scroll': {
      const [paper, ribbon] = SCROLL_COLORS[item.pool ?? 'basic'] ?? SCROLL_COLORS.basic!
      return (
        <G>
          <Rect x={9} y={10} width={22} height={20} rx={3} fill={paper} />
          <Rect x={7} y={8} width={26} height={5} rx={2.5} fill={ribbon} />
          <Rect x={7} y={27} width={26} height={5} rx={2.5} fill={ribbon} />
          <Path d="M13 17h14M13 21h10" stroke={ribbon} strokeWidth={1.5} />
          {item.pool === 'mythic' || item.pool === 'light_dark_mythic' ? (
            <Circle cx={27} cy={24} r={3.5} fill="#ffd23f" />
          ) : null}
          {item.pool === 'legendary' ? (
            <Path
              d="M27 20l1.2 2.6 2.8.3-2.1 1.9.6 2.8-2.5-1.4-2.5 1.4.6-2.8-2.1-1.9 2.8-.3z"
              fill="#ffd23f"
            />
          ) : null}
          {item.pool === 'all_attributes' ? (
            <G>
              <Circle cx={24} cy={24} r={2} fill="#ff6b4a" />
              <Circle cx={28} cy={24} r={2} fill="#4ab8ff" />
              <Circle cx={26} cy={20.5} r={2} fill="#ffd23f" />
            </G>
          ) : null}
          {item.pool === 'light_dark' || item.pool === 'light_dark_mythic' ? (
            <Path d="M24 19a4 4 0 1 0 4 5a3 3 0 0 1-4-5z" fill="#ffd23f" />
          ) : null}
        </G>
      )
    }
    case 'grind': {
      const color = SET_COLORS[item.set ?? ''] ?? '#8b95a8'
      return (
        <G>
          <Polygon
            points="8,26 14,12 32,12 26,26"
            fill="#6d6a80"
            stroke="#b8b4c8"
            strokeWidth={1}
          />
          <Polygon points="11,22 15,15 29,15 25,22" fill={color} />
          {letter(item.set ?? '?', '#1b1830')}
          <Path d="M10 30h20" stroke={color} strokeWidth={2} strokeLinecap="round" />
        </G>
      )
    }
    case 'gem': {
      const color = SET_COLORS[item.set ?? ''] ?? '#8b95a8'
      return (
        <G>
          <Polygon
            points="20,7 31,15 27,31 13,31 9,15"
            fill={color}
            stroke="#fff"
            strokeWidth={1}
          />
          <Polygon points="20,7 25,15 20,31 15,15" fill="#ffffff" opacity={0.25} />
          {letter(item.set ?? '?')}
        </G>
      )
    }
    case 'material':
      return material(item.category ?? '', item.tier ?? 1)
    case 'chest': {
      const [wood, metal] = CHEST_STYLES[Math.min(4, Math.max(1, item.tier ?? 1)) - 1]!
      return (
        <G>
          <Path d="M8 17a12 7 0 0 1 24 0v3H8z" fill={wood} stroke={metal} strokeWidth={1.5} />
          <Rect
            x={8}
            y={19}
            width={24}
            height={13}
            rx={2}
            fill={wood}
            stroke={metal}
            strokeWidth={1.5}
          />
          <Rect x={8} y={18} width={24} height={3} fill={metal} />
          <Rect x={17.5} y={17} width={5} height={7} rx={1} fill={metal} />
          <Circle cx={20} cy={21.5} r={1.2} fill="#2a1a10" />
        </G>
      )
    }
    case 'points': {
      const [main, letterOf] = POINT_STYLES[item.id] ?? ['#8b95a8', '?']
      return (
        <G>
          <Circle cx={20} cy={20} r={13} fill={main} stroke="#fff" strokeWidth={1.5} />
          <Circle cx={20} cy={20} r={9.5} fill="none" stroke="#ffffff" strokeOpacity={0.5} />
          {letter(letterOf)}
        </G>
      )
    }
    default:
      return letter(item.id)
  }
}

/** Chests by tier (bronze, silver, gold, legendary): [wood, metal]. */
const CHEST_STYLES: [string, string][] = [
  ['#7a4e2a', '#c8844a'],
  ['#6b4a35', '#d6dbe4'],
  ['#7a4a1e', '#ffd23f'],
  ['#4b1a8f', '#ff9f3f'],
]

/** Point currencies: [colour, letter]. */
const POINT_STYLES: Record<string, [string, string]> = {
  point_guild: ['#3f7d4f', 'G'],
  point_social: ['#c2558b', 'S'],
  point_arena: ['#b8452f', 'A'],
  point_tower: ['#5a5fc4', 'T'],
}

function material(category: string, tier: number) {
  const color = TIER_COLORS[Math.min(5, Math.max(1, tier)) - 1]!
  const body =
    category === 'ore' ? (
      <Polygon
        points="9,26 13,13 22,9 31,16 29,28 17,31"
        fill="#5c5870"
        stroke={color}
        strokeWidth={2}
      />
    ) : category === 'wood' ? (
      <G>
        <Rect
          x={8}
          y={14}
          width={24}
          height={11}
          rx={5.5}
          fill="#7a4e2a"
          stroke={color}
          strokeWidth={2}
        />
        <Circle cx={27} cy={19.5} r={3.5} fill="#c48a4a" />
      </G>
    ) : category === 'hide' ? (
      <Path d="M10 11h20l-3 7 3 12H10l3-12z" fill="#a0724e" stroke={color} strokeWidth={2} />
    ) : category === 'monster_part' ? (
      <Path
        d="M14 8c8 4 14 12 12 24-3-8-8-12-14-14 3-3 3-6 2-10z"
        fill="#ece3cf"
        stroke={color}
        strokeWidth={2}
      />
    ) : category === 'crystal' ? (
      <G>
        <Polygon points="20,6 25,16 20,30 15,16" fill={color} />
        <Polygon points="12,14 15,20 12,29 9,20" fill={color} opacity={0.7} />
        <Polygon points="28,14 31,20 28,29 25,20" fill={color} opacity={0.7} />
      </G>
    ) : (
      <G>
        <Circle cx={20} cy={19} r={11} fill="#b08a2e" stroke={color} strokeWidth={2} />
        <Path d="M20 12l2 5h5l-4 3 2 5-5-3-5 3 2-5-4-3h5z" fill="#ffe08a" />
      </G>
    )
  return (
    <G>
      {body}
      {pips(tier, color)}
    </G>
  )
}
