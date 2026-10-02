import Svg, { Circle, Defs, LinearGradient, Path, Polygon, Stop } from 'react-native-svg'
import type { Element } from '../../api/types'
import { ELEMENT_COLORS } from './palette'

/** The symbol of each element, drawn in a 24x24 box centred on (12, 12). */
const SYMBOLS: Record<Element, string> = {
  // flame with an inner tongue
  fire: 'M12 2c1 4 6 6 6 12a6 6 0 0 1-12 0c0-3 2-5 3-7 0 2 1 3 2 3 0-3-1-5 1-8z M12 13c1.5 1.5 3 2.5 3 4a3 3 0 0 1-6 0c0-1.5 1.5-2.5 3-4z',
  // drop with a ripple
  water:
    'M12 2c3 5 7 9 7 13a7 7 0 0 1-14 0c0-4 4-8 7-13z M8 15a4 4 0 0 0 4 4v-1.6a2.4 2.4 0 0 1-2.4-2.4z',
  // triple swirl
  wind: 'M3 8h11a3 3 0 1 0-3-3h-2a5 5 0 1 1 5 5H3z M3 12h15a3 3 0 1 1-3 3h2a1 1 0 1 0 1-1H3z M3 16h8a2 2 0 1 1-2 2H7a4 4 0 1 0 4-4H3z',
  // twin peaks over a crystal
  earth: 'M2 20l6-11 3 5 3-8 8 14z M12 9l1.5 3h-3z',
  // lightning bolt
  lightning: 'M13 2L4 14h6l-2 8 10-13h-6l3-7z',
  // eight-pointed sun
  light: 'M12 1l2 6 5-3-3 5 6 2-6 2 3 5-5-3-2 6-2-6-5 3 3-5-6-2 6-2-3-5 5 3z',
  // eclipse: crescent with a star
  dark: 'M15 3a9 9 0 1 0 6 15A8 8 0 0 1 15 3z M17 7l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z',
  // a question mark: the element of the secret monsters
  unknown:
    'M8 8a4 4 0 1 1 6 3.5c-1.2.7-2 1.4-2 2.8V15h-2.4v-1c0-2 1-3.1 2.4-4a1.8 1.8 0 1 0-2.6-1.6z M10.8 17h2.4v2.4h-2.4z',
}

/** A coloured element emblem: the symbol on a hexagonal badge (V: a bigger, invented distinctive). */
export function ElementEmblem({ element, size = 28 }: { element: Element; size?: number }) {
  const c = ELEMENT_COLORS[element]
  const id = `emb-${element}`
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" accessibilityLabel={c.label}>
      <Defs>
        <LinearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={c.light} />
          <Stop offset="1" stopColor={c.dark} />
        </LinearGradient>
      </Defs>
      <Polygon
        points="16,1 29,8.5 29,23.5 16,31 3,23.5 3,8.5"
        fill={`url(#${id})`}
        stroke={c.main}
        strokeWidth={1.5}
      />
      <Circle cx={16} cy={16} r={10.5} fill={c.dark} opacity={0.55} />
      <Path
        d={SYMBOLS[element]}
        fill={c.light}
        transform="translate(5 5) scale(0.9)"
        fillRule="evenodd"
      />
    </Svg>
  )
}
