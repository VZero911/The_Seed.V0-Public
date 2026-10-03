/** The game's SVG icon set (one `IconName` per drawing, coloured by the caller). */
import Svg, { Circle, Path, Rect } from 'react-native-svg'

export type IconName =
  | 'village'
  | 'swords'
  | 'scroll'
  | 'paw'
  | 'mail'
  | 'altar'
  | 'tower'
  | 'rune'
  | 'book'
  | 'map'
  | 'crystal'
  | 'energy'
  | 'mana'
  | 'poc'
  | 'pot'
  | 'shop'
  | 'skull'
  | 'trophy'
  | 'people'
  | 'ballot'
  | 'gift'
  | 'robot'
  | 'gem'
  | 'hammer'
  | 'medal'
  | 'shield'
  | 'wings'
  | 'star'
  | 'crown'
  | 'flame'
  | 'calendar'
  | 'lock'

/** Line icons of the game (24x24), one colour. */
export function Icon({
  name,
  size = 24,
  color = '#fff',
}: {
  name: IconName
  size?: number
  color?: string
}) {
  const p = {
    stroke: color,
    strokeWidth: 1.8,
    fill: 'none',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
  const f = { fill: color }
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {name === 'village' ? (
        <>
          <Path d="M3 21V10l5-4 5 4v11" {...p} />
          <Path d="M13 21v-7l4-3 4 3v7" {...p} />
          <Path d="M2 21h20M7 21v-4h2v4" {...p} />
        </>
      ) : name === 'swords' ? (
        <>
          <Path d="M4 4l10 10M4 4h4M4 4v4M14 14l2-2 2 2-2 2zM16 16l4 4" {...p} />
          <Path d="M20 4L10 14M20 4h-4M20 4v4M10 14l-2-2-2 2 2 2zM8 16l-4 4" {...p} />
        </>
      ) : name === 'scroll' ? (
        <>
          <Path d="M6 4h11a2 2 0 0 1 2 2v12a2 2 0 0 0 2 2H8a2 2 0 0 1-2-2z" {...p} />
          <Path d="M6 4a2 2 0 0 0-2 2v2h2M9 9h7M9 13h7" {...p} />
        </>
      ) : name === 'paw' ? (
        <>
          <Circle cx={7} cy={9} r={1.8} {...f} />
          <Circle cx={11} cy={6} r={1.8} {...f} />
          <Circle cx={15} cy={6.5} r={1.8} {...f} />
          <Circle cx={18} cy={10} r={1.8} {...f} />
          <Path
            d="M12 11c-3 0-6 4-6 7a2 2 0 0 0 2 2c1.5 0 2.5-1 4-1s2.5 1 4 1a2 2 0 0 0 2-2c0-3-3-7-6-7z"
            {...f}
          />
        </>
      ) : name === 'mail' ? (
        <>
          <Rect x={3} y={6} width={18} height={13} rx={2} {...p} />
          <Path d="M3 8l9 6 9-6" {...p} />
        </>
      ) : name === 'altar' ? (
        <>
          <Path d="M5 21h14M7 21v-6h10v6M5 15h14l-2-3H7z" {...p} />
          <Path d="M12 3c1.5 2 3 3 3 5a3 3 0 0 1-6 0c0-2 1.5-3 3-5z" {...p} />
        </>
      ) : name === 'tower' ? (
        <>
          <Path d="M8 21V8h8v13M6 8h12V4h-2v2h-2V4h-4v2H8V4H6zM11 21v-4h2v4M11 11h2" {...p} />
        </>
      ) : name === 'rune' ? (
        <>
          <Path d="M12 2l8 5v10l-8 5-8-5V7z" {...p} />
          <Path d="M12 7v10M9 9l3 3 3-3" {...p} />
        </>
      ) : name === 'book' ? (
        <>
          <Path d="M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2z" {...p} />
          <Path d="M4 19V5M9 7h6" {...p} />
        </>
      ) : name === 'map' ? (
        <>
          <Path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z" {...p} />
          <Path d="M9 4v14M15 6v14" {...p} />
        </>
      ) : name === 'crystal' ? (
        <Path d="M12 2l6 6-6 14-6-14zM6 8h12M12 2v20" {...p} />
      ) : name === 'energy' ? (
        <Path d="M13 2L4 14h7l-1 8 9-12h-7z" {...f} />
      ) : name === 'pot' ? (
        <>
          <Circle cx={12} cy={12} r={9} {...p} />
          <Path d="M8 10h8l-2.5-2.5M16 14H8l2.5 2.5" {...p} />
        </>
      ) : name === 'shop' ? (
        <>
          <Path
            d="M4 9l1.5-5h13L20 9M4 9h16v11H4zM4 9a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0 2.7 2.7 0 0 0 5.3 0"
            {...p}
          />
          <Path d="M10 20v-5h4v5" {...p} />
        </>
      ) : name === 'skull' ? (
        <>
          <Path d="M12 3a8 8 0 0 0-5 14v3h10v-3a8 8 0 0 0-5-14z" {...p} />
          <Circle cx={9} cy={11} r={1.6} {...f} />
          <Circle cx={15} cy={11} r={1.6} {...f} />
          <Path d="M10 20v-2M14 20v-2" {...p} />
        </>
      ) : name === 'trophy' ? (
        <>
          <Path d="M7 4h10v5a5 5 0 0 1-10 0zM7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4" {...p} />
          <Path d="M12 14v3M8 21h8M9 21v-2h6v2" {...p} />
        </>
      ) : name === 'people' ? (
        <>
          <Circle cx={9} cy={8} r={3} {...p} />
          <Circle cx={17} cy={9} r={2.5} {...p} />
          <Path d="M3 20a6 6 0 0 1 12 0M14 20a4.5 4.5 0 0 1 7 0" {...p} />
        </>
      ) : name === 'ballot' ? (
        <>
          <Rect x={4} y={10} width={16} height={10} rx={2} {...p} />
          <Path d="M8 10V4h8v6M10 7l1.5 1.5L14 6" {...p} />
        </>
      ) : name === 'gift' ? (
        <>
          <Rect x={3} y={8} width={18} height={4} rx={1} {...p} />
          <Path
            d="M5 12v9h14v-9M12 8v13M12 8C10 4 6 4 7 7c.5 1 3 1 5 1zM12 8c2-4 6-4 5-1-.5 1-3 1-5 1z"
            {...p}
          />
        </>
      ) : name === 'robot' ? (
        <>
          <Rect x={5} y={8} width={14} height={11} rx={3} {...p} />
          <Path d="M12 4v4M9 13h.01M15 13h.01M9 16h6" {...p} />
          <Circle cx={12} cy={3.5} r={1} {...f} />
        </>
      ) : name === 'gem' ? (
        <Path d="M6 4h12l3 5-9 11L3 9zM3 9h18M9 4l3 16 3-16" {...p} />
      ) : name === 'medal' ? (
        <>
          <Path d="M8 3l2.5 6M16 3l-2.5 6" {...p} />
          <Circle cx={12} cy={15} r={6} {...p} />
          <Path d="M12 12l1 2h2l-1.5 1.5.5 2-2-1-2 1 .5-2L9 14h2z" {...f} />
        </>
      ) : name === 'star' ? (
        <Path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" {...p} />
      ) : name === 'crown' ? (
        <>
          <Path d="M3 18l2-10 5 5 2-7 2 7 5-5 2 10z" {...p} />
          <Path d="M4 21h16" {...p} />
        </>
      ) : name === 'flame' ? (
        <Path
          d="M12 3c1 4 5 5.5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 .3 1.5 1 2 2 2-1-3-.5-5 1-8z"
          {...p}
        />
      ) : name === 'calendar' ? (
        <>
          <Rect x="4" y="6" width="16" height="14" rx="2" {...p} />
          <Path d="M4 11h16M8 3v4M16 3v4" {...p} />
          <Path d="M9 15l2 2 4-4" {...p} />
        </>
      ) : name === 'lock' ? (
        <>
          <Rect x="5" y="11" width="14" height="9" rx="2" {...p} />
          <Path d="M8 11V8a4 4 0 0 1 8 0v3" {...p} />
        </>
      ) : name === 'wings' ? (
        <>
          <Path
            d="M12 20c-1-4-1-9 0-15M12 5C9 3 5 3 2 5c1 5 4 9 10 11M12 5c3-2 7-2 10 0-1 5-4 9-10 11"
            {...p}
          />
          <Path d="M7 9c1.5.5 3 1.5 4 3M17 9c-1.5.5-3 1.5-4 3" {...p} />
        </>
      ) : name === 'shield' ? (
        <>
          <Path d="M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6z" {...p} />
          <Path d="M9 12l2 2 4-4" {...p} />
        </>
      ) : name === 'hammer' ? (
        <>
          <Path d="M14 4l6 6-3 3-6-6zM12 9l-8 8 3 3 8-8" {...p} />
        </>
      ) : name === 'mana' ? (
        <>
          <Circle cx={12} cy={12} r={8} {...p} />
          <Path d="M12 7l3 5-3 5-3-5z" {...f} />
        </>
      ) : (
        <>
          <Circle cx={12} cy={12} r={8} {...p} />
          <Path d="M9 15V9h3a2 2 0 0 1 0 4H9" {...p} />
        </>
      )}
    </Svg>
  )
}
