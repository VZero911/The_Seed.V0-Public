/**
 * Procedural monster portraits (SVG) until real 2D art exists (game spec: DA close to SW, 2D then
 * 3D). Each family maps to a silhouette (beast, bird, golem, mage...), coloured by the element,
 * framed by the star grade, with a glow once awakened. Unknown monsters (collection) are grey.
 */
import type { ReactNode } from 'react'
import Svg, {
  Circle,
  Defs,
  Ellipse,
  G,
  LinearGradient,
  Path,
  Polygon,
  RadialGradient,
  Rect,
  Stop,
} from 'react-native-svg'
import type { Element } from '../../api/types'
import { ELEMENT_COLORS, GREY, STAR_FRAMES } from './palette'

type Colors = { main: string; dark: string; light: string; glow: string }
type Archetype =
  | 'imp'
  | 'beast'
  | 'fairy'
  | 'golem'
  | 'bird'
  | 'shell'
  | 'plant'
  | 'serpent'
  | 'mage'
  | 'knight'
  | 'dragon'
  | 'angel'

/** Silhouette and its variant (horns, tusks, gears...) for each family. */
const FAMILIES: Record<string, { type: Archetype; variant?: string }> = {
  gobelin: { type: 'imp', variant: 'ears' },
  rat: { type: 'beast', variant: 'wolf' },
  champignon: { type: 'plant' },
  chauve_souris: { type: 'bird', variant: 'harpy' },
  scarabee: { type: 'shell' },
  feu_follet: { type: 'fairy', variant: 'swirl' },
  kobold: { type: 'imp', variant: 'helmet' },
  lutin: { type: 'imp', variant: 'hat' },
  grand_lutin: { type: 'imp', variant: 'hat-big' },
  lutin_ancestral: { type: 'imp', variant: 'crown' },
  loup: { type: 'beast', variant: 'wolf' },
  sanglier: { type: 'beast', variant: 'tusks' },
  minotaure: { type: 'beast', variant: 'horns' },
  behemoth: { type: 'beast', variant: 'big-horns' },
  fee: { type: 'fairy' },
  sylphe: { type: 'fairy', variant: 'swirl' },
  golem: { type: 'golem' },
  automate: { type: 'golem', variant: 'gear' },
  gardien: { type: 'golem', variant: 'rune' },
  golem_arcane: { type: 'golem', variant: 'orb' },
  colosse: { type: 'golem', variant: 'gear' },
  sentinelle: { type: 'golem', variant: 'visor' },
  titan: { type: 'golem', variant: 'crown' },
  harpie: { type: 'bird', variant: 'harpy' },
  corbeau: { type: 'bird' },
  phenix: { type: 'bird', variant: 'flame' },
  tortue: { type: 'shell' },
  mandragore: { type: 'plant' },
  naga: { type: 'serpent' },
  hydre: { type: 'serpent', variant: 'three' },
  chaman: { type: 'mage', variant: 'feather' },
  druide: { type: 'mage', variant: 'leaf' },
  pretresse: { type: 'mage', variant: 'halo' },
  oracle: { type: 'mage', variant: 'eye' },
  archimage: { type: 'mage', variant: 'star' },
  liche: { type: 'mage', variant: 'skull' },
  archer: { type: 'mage', variant: 'bow' },
  danseur: { type: 'knight', variant: 'blades' },
  chevalier_mage: { type: 'knight', variant: 'sword' },
  valkyrie: { type: 'knight', variant: 'wings' },
  ronin: { type: 'knight', variant: 'katana' },
  dragon: { type: 'dragon' },
  seraphin: { type: 'angel' },
  // V (2026-10-02): 20 families from 4 to 6 stars (silhouettes to refine in the art overhaul).
  lancier: { type: 'knight', variant: 'sword' },
  moine: { type: 'mage', variant: 'halo' },
  chimere: { type: 'beast', variant: 'horns' },
  assassin: { type: 'knight', variant: 'blades' },
  templier: { type: 'golem', variant: 'rune' },
  alchimiste: { type: 'mage', variant: 'star' },
  griffon: { type: 'bird', variant: 'harpy' },
  kitsune: { type: 'beast', variant: 'wolf' },
  vampire: { type: 'mage', variant: 'skull' },
  djinn: { type: 'fairy', variant: 'swirl' },
  gorgone: { type: 'serpent' },
  wyverne: { type: 'dragon' },
  paladin: { type: 'knight', variant: 'sword' },
  sirene: { type: 'fairy' },
  archange: { type: 'angel' },
  kraken: { type: 'serpent', variant: 'three' },
  leviathan: { type: 'serpent', variant: 'three' },
  chronomancien: { type: 'mage', variant: 'eye' },
  nephilim: { type: 'knight', variant: 'wings' },
  fenrir: { type: 'beast', variant: 'big-horns' },
}

export function MonsterArt({
  family,
  element,
  stars = 1,
  awakened = false,
  unknown = false,
  size = 72,
}: {
  family: string
  element: Element
  stars?: number
  awakened?: boolean
  unknown?: boolean
  size?: number
}) {
  if (family === 'secret') return <SecretArt stars={stars} size={size} />
  const c: Colors = unknown ? GREY : ELEMENT_COLORS[element]
  const shape = FAMILIES[family] ?? { type: 'imp' as const }
  const frame = unknown
    ? (['#3a3848', '#5a5870'] as const)
    : STAR_FRAMES[Math.min(8, Math.max(1, stars))]!
  const id = `${family}-${element}-${String(stars)}-${awakened ? 'a' : 'n'}-${unknown ? 'u' : 'k'}`
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Defs>
        <RadialGradient id={`bg-${id}`} cx="50%" cy="45%" r="65%">
          <Stop offset="0" stopColor={c.glow} stopOpacity={awakened ? 0.95 : 0.6} />
          <Stop offset="0.55" stopColor={c.dark} stopOpacity={0.9} />
          <Stop offset="1" stopColor="#0d0b16" />
        </RadialGradient>
        <LinearGradient id={`fr-${id}`} x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor={frame[1]} />
          <Stop offset="0.5" stopColor={frame[0]} />
          <Stop offset="1" stopColor={frame[1]} />
        </LinearGradient>
        <LinearGradient id={`body-${id}`} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={c.light} />
          <Stop offset="0.45" stopColor={c.main} />
          <Stop offset="1" stopColor={c.dark} />
        </LinearGradient>
      </Defs>
      <Rect x={3} y={3} width={94} height={94} rx={18} fill={`url(#bg-${id})`} />
      <Circle
        cx={50}
        cy={48}
        r={30}
        fill="none"
        stroke={c.light}
        strokeOpacity={0.12}
        strokeWidth={6}
      />
      <G>{creature(shape.type, shape.variant, c, `url(#body-${id})`)}</G>
      {awakened && !unknown ? sparkles(c) : null}
      <Rect
        x={3}
        y={3}
        width={94}
        height={94}
        rx={18}
        fill="none"
        stroke={`url(#fr-${id})`}
        strokeWidth={awakened ? 5 : 4}
      />
    </Svg>
  )
}

function sparkles(c: Colors): ReactNode {
  const star = (x: number, y: number, r: number) =>
    `M${x} ${y - r}L${x + r * 0.3} ${y - r * 0.3}L${x + r} ${y}L${x + r * 0.3} ${y + r * 0.3}L${x} ${y + r}L${x - r * 0.3} ${y + r * 0.3}L${x - r} ${y}L${x - r * 0.3} ${y - r * 0.3}Z`
  return (
    <G opacity={0.9}>
      <Path d={star(18, 20, 5)} fill="#fff" />
      <Path d={star(82, 26, 4)} fill={c.light} />
      <Path d={star(80, 78, 3)} fill="#fff" />
    </G>
  )
}

/** Glowing eyes shared by most silhouettes. */
function eyes(x1: number, x2: number, y: number, c: Colors, r = 2.6): ReactNode {
  return (
    <>
      <Circle cx={x1} cy={y} r={r + 1.5} fill={c.glow} opacity={0.5} />
      <Circle cx={x2} cy={y} r={r + 1.5} fill={c.glow} opacity={0.5} />
      <Circle cx={x1} cy={y} r={r} fill="#fff" />
      <Circle cx={x2} cy={y} r={r} fill="#fff" />
    </>
  )
}

function creature(
  type: Archetype,
  variant: string | undefined,
  c: Colors,
  body: string,
): ReactNode {
  const stroke = { stroke: c.dark, strokeWidth: 1.6, strokeLinejoin: 'round' as const }
  switch (type) {
    case 'imp':
      return (
        <>
          <Ellipse cx={50} cy={78} rx={14} ry={10} fill={body} {...stroke} />
          {variant === 'ears' || variant === undefined ? (
            <>
              <Path d="M33 50 L14 38 L32 60 Z" fill={body} {...stroke} />
              <Path d="M67 50 L86 38 L68 60 Z" fill={body} {...stroke} />
            </>
          ) : null}
          <Circle cx={50} cy={55} r={19} fill={body} {...stroke} />
          {variant === 'helmet' ? (
            <Path
              d="M30 52 Q50 24 70 52 L66 46 Q50 34 34 46 Z"
              fill={c.dark}
              stroke={c.light}
              strokeWidth={1.2}
            />
          ) : null}
          {variant?.startsWith('hat') ? (
            <Path
              d={variant === 'hat-big' ? 'M34 42 L50 8 L66 42 Z' : 'M38 42 L50 18 L62 42 Z'}
              fill={c.dark}
              stroke={c.light}
              strokeWidth={1.2}
            />
          ) : null}
          {variant === 'crown' ? (
            <Path
              d="M34 40 L36 26 L43 34 L50 22 L57 34 L64 26 L66 40 Z"
              fill="#ffd34d"
              stroke="#8a5a00"
              strokeWidth={1.2}
            />
          ) : null}
          {eyes(43, 57, 55, c)}
          <Path d="M44 64 Q50 69 56 64" fill="none" stroke={c.dark} strokeWidth={2} />
        </>
      )
    case 'beast':
      return (
        <>
          {variant === 'wolf' ? (
            <>
              <Path d="M30 40 L34 16 L46 34 Z" fill={body} {...stroke} />
              <Path d="M70 40 L66 16 L54 34 Z" fill={body} {...stroke} />
            </>
          ) : null}
          {variant === 'horns' || variant === 'big-horns' ? (
            <>
              <Path
                d={
                  variant === 'big-horns'
                    ? 'M32 40 Q8 30 14 8 Q22 30 40 34 Z'
                    : 'M33 40 Q18 34 20 18 Q26 32 40 35 Z'
                }
                fill={c.light}
                {...stroke}
              />
              <Path
                d={
                  variant === 'big-horns'
                    ? 'M68 40 Q92 30 86 8 Q78 30 60 34 Z'
                    : 'M67 40 Q82 34 80 18 Q74 32 60 35 Z'
                }
                fill={c.light}
                {...stroke}
              />
            </>
          ) : null}
          <Path
            d="M24 50 Q24 28 50 28 Q76 28 76 50 L72 72 Q50 90 28 72 Z"
            fill={body}
            {...stroke}
          />
          <Ellipse cx={50} cy={70} rx={14} ry={10} fill={c.light} opacity={0.85} />
          <Ellipse cx={50} cy={65} rx={5} ry={3.5} fill={c.dark} />
          {variant === 'tusks' ? (
            <>
              <Path
                d="M38 74 Q34 64 40 60"
                fill="none"
                stroke="#fff"
                strokeWidth={3}
                strokeLinecap="round"
              />
              <Path
                d="M62 74 Q66 64 60 60"
                fill="none"
                stroke="#fff"
                strokeWidth={3}
                strokeLinecap="round"
              />
            </>
          ) : null}
          {eyes(39, 61, 48, c, 3)}
        </>
      )
    case 'fairy':
      return (
        <>
          <Ellipse
            cx={30}
            cy={44}
            rx={16}
            ry={24}
            fill={c.light}
            opacity={0.45}
            transform="rotate(-25 30 44)"
          />
          <Ellipse
            cx={70}
            cy={44}
            rx={16}
            ry={24}
            fill={c.light}
            opacity={0.45}
            transform="rotate(25 70 44)"
          />
          <Ellipse
            cx={34}
            cy={68}
            rx={10}
            ry={14}
            fill={c.light}
            opacity={0.35}
            transform="rotate(30 34 68)"
          />
          <Ellipse
            cx={66}
            cy={68}
            rx={10}
            ry={14}
            fill={c.light}
            opacity={0.35}
            transform="rotate(-30 66 68)"
          />
          <Path d="M44 60 L56 60 L60 86 L40 86 Z" fill={body} {...stroke} />
          <Circle cx={50} cy={48} r={13} fill={body} {...stroke} />
          {variant === 'swirl' ? (
            <Path
              d="M38 38 Q50 22 62 38 Q52 30 44 36"
              fill="none"
              stroke={c.light}
              strokeWidth={2.5}
            />
          ) : (
            <Circle cx={50} cy={30} r={4} fill="#fff" opacity={0.9} />
          )}
          {eyes(45, 55, 48, c, 2.2)}
        </>
      )
    case 'golem':
      return (
        <>
          <Rect x={22} y={52} width={56} height={34} rx={6} fill={body} {...stroke} />
          <Rect x={14} y={54} width={12} height={26} rx={4} fill={c.dark} {...stroke} />
          <Rect x={74} y={54} width={12} height={26} rx={4} fill={c.dark} {...stroke} />
          <Rect x={30} y={22} width={40} height={32} rx={8} fill={body} {...stroke} />
          {variant === 'visor' ? (
            <Rect x={34} y={34} width={32} height={7} rx={3} fill={c.glow} />
          ) : (
            <Rect x={36} y={34} width={28} height={6} rx={3} fill={c.dark} />
          )}
          {variant === 'visor' ? null : eyes(43, 57, 37, c, 2.4)}
          {variant === 'gear' ? (
            <Circle
              cx={50}
              cy={68}
              r={9}
              fill="none"
              stroke={c.light}
              strokeWidth={3}
              strokeDasharray="4 3"
            />
          ) : null}
          {variant === 'rune' || variant === undefined ? (
            <Path
              d="M44 62 L50 74 L56 62 M50 74 V80"
              fill="none"
              stroke={c.glow}
              strokeWidth={2.5}
            />
          ) : null}
          {variant === 'orb' ? (
            <Circle cx={50} cy={68} r={7} fill={c.glow} stroke="#fff" strokeWidth={1.5} />
          ) : null}
          {variant === 'crown' ? (
            <Path
              d="M30 22 L33 10 L41 18 L50 6 L59 18 L67 10 L70 22 Z"
              fill="#ffd34d"
              stroke="#8a5a00"
              strokeWidth={1.2}
            />
          ) : null}
        </>
      )
    case 'bird':
      return (
        <>
          {variant === 'flame' ? (
            <Path
              d="M50 70 Q30 92 40 96 Q46 86 50 92 Q54 86 60 96 Q70 92 50 70 Z"
              fill={c.glow}
              opacity={0.9}
            />
          ) : null}
          <Path d="M48 50 Q20 30 8 46 Q22 52 18 64 Q34 58 46 64 Z" fill={body} {...stroke} />
          <Path d="M52 50 Q80 30 92 46 Q78 52 82 64 Q66 58 54 64 Z" fill={body} {...stroke} />
          <Ellipse cx={50} cy={62} rx={13} ry={18} fill={body} {...stroke} />
          {variant === 'harpy' ? (
            <Path d="M40 30 Q50 18 60 30 L58 42 Q50 46 42 42 Z" fill={c.light} {...stroke} />
          ) : null}
          <Circle cx={50} cy={40} r={11} fill={body} {...stroke} />
          <Path d="M46 44 L50 54 L54 44 Z" fill="#ffcf5a" stroke="#8a5a00" strokeWidth={1} />
          {eyes(45, 55, 39, c, 2.2)}
        </>
      )
    case 'shell':
      return (
        <>
          <Ellipse cx={22} cy={66} rx={9} ry={8} fill={c.light} {...stroke} />
          <Path d="M24 74 Q24 40 56 40 Q86 40 86 74 Z" fill={body} {...stroke} />
          <Path
            d="M40 74 L46 54 L62 52 L70 74 M46 54 L56 44 L62 52"
            fill="none"
            stroke={c.light}
            strokeWidth={2}
          />
          <Rect x={30} y={72} width={52} height={8} rx={3} fill={c.dark} />
          {eyes(19, 25, 64, c, 1.6)}
        </>
      )
    case 'plant':
      return (
        <>
          <Path d="M50 40 Q30 16 26 30 Q36 34 46 44 Z" fill={c.light} {...stroke} />
          <Path d="M50 40 Q70 16 74 30 Q64 34 54 44 Z" fill={c.light} {...stroke} />
          <Path d="M50 38 Q48 18 52 10 Q56 22 52 38 Z" fill={c.light} {...stroke} />
          <Path
            d="M32 56 Q32 40 50 40 Q68 40 68 56 Q68 80 50 86 Q32 80 32 56 Z"
            fill={body}
            {...stroke}
          />
          <Path d="M40 84 L34 94 M50 86 V96 M60 84 L66 94" stroke={c.dark} strokeWidth={2.5} />
          {eyes(43, 57, 56, c, 2.4)}
          <Ellipse cx={50} cy={68} rx={5} ry={4} fill={c.dark} />
        </>
      )
    case 'serpent': {
      const head = (x: number, y: number, s = 1) => (
        <G key={`${String(x)}-${String(y)}`}>
          <Ellipse cx={x} cy={y} rx={10 * s} ry={8 * s} fill={body} {...stroke} />
          {eyes(x - 4 * s, x + 4 * s, y - 1, c, 1.8 * s)}
          <Path
            d={`M${x - 2} ${y + 7 * s} L${x} ${y + 12 * s} L${x + 2} ${y + 7 * s}`}
            fill="#ff4d6d"
          />
        </G>
      )
      return (
        <>
          <Path
            d="M24 88 Q20 66 44 64 Q70 62 64 46 Q60 36 50 40"
            fill="none"
            stroke={c.dark}
            strokeWidth={16}
            strokeLinecap="round"
          />
          <Path
            d="M24 88 Q20 66 44 64 Q70 62 64 46 Q60 36 50 40"
            fill="none"
            stroke={c.main}
            strokeWidth={12}
            strokeLinecap="round"
          />
          {variant === 'three'
            ? [head(30, 30, 0.8), head(50, 26), head(70, 30, 0.8)]
            : head(50, 34)}
        </>
      )
    }
    case 'mage':
      return (
        <>
          <Path d="M50 24 L76 90 L24 90 Z" fill={body} {...stroke} />
          <Path d="M36 40 Q50 12 64 40 L60 56 Q50 62 40 56 Z" fill={c.dark} {...stroke} />
          {variant === 'skull' ? (
            <>
              <Circle cx={50} cy={46} r={9} fill="#e8e4d8" />
              <Circle cx={46} cy={45} r={2.4} fill={c.glow} />
              <Circle cx={54} cy={45} r={2.4} fill={c.glow} />
            </>
          ) : (
            eyes(45, 55, 46, c, 2.2)
          )}
          {variant === 'bow' ? (
            <Path
              d="M80 30 Q94 58 80 86 M80 30 V86"
              fill="none"
              stroke={c.light}
              strokeWidth={2.5}
            />
          ) : (
            <>
              <Path d="M80 28 V90" stroke="#8a6a3c" strokeWidth={3} />
              <Circle cx={80} cy={26} r={6} fill={c.glow} stroke="#fff" strokeWidth={1.4} />
            </>
          )}
          {variant === 'halo' ? (
            <Ellipse
              cx={50}
              cy={20}
              rx={14}
              ry={4}
              fill="none"
              stroke="#ffe27a"
              strokeWidth={2.5}
            />
          ) : null}
          {variant === 'leaf' ? (
            <Path d="M40 28 Q50 14 60 28 Q50 24 40 28 Z" fill="#7be08a" />
          ) : null}
          {variant === 'feather' ? (
            <Path d="M62 30 Q72 14 70 34" fill="none" stroke="#ff7a5c" strokeWidth={3} />
          ) : null}
          {variant === 'eye' ? (
            <Ellipse cx={50} cy={74} rx={8} ry={5} fill="#fff" stroke={c.dark} strokeWidth={1.5} />
          ) : null}
          {variant === 'star' ? (
            <Polygon
              points="50,66 53,74 61,74 55,79 57,87 50,82 43,87 45,79 39,74 47,74"
              fill="#ffe27a"
            />
          ) : null}
        </>
      )
    case 'knight':
      return (
        <>
          {variant === 'wings' ? (
            <>
              <Path d="M38 50 Q8 30 12 64 Q24 56 36 66 Z" fill={c.light} opacity={0.85} />
              <Path d="M62 50 Q92 30 88 64 Q76 56 64 66 Z" fill={c.light} opacity={0.85} />
            </>
          ) : null}
          <Path d="M32 56 L68 56 L72 90 L28 90 Z" fill={body} {...stroke} />
          <Path
            d="M34 36 Q34 18 50 18 Q66 18 66 36 L64 54 L36 54 Z"
            fill={c.dark}
            stroke={c.light}
            strokeWidth={1.4}
          />
          <Rect x={38} y={34} width={24} height={6} rx={2} fill={c.glow} />
          {variant === 'blades' ? (
            <>
              <Path d="M20 86 L30 50" stroke="#e8f0ff" strokeWidth={3.5} strokeLinecap="round" />
              <Path d="M80 86 L70 50" stroke="#e8f0ff" strokeWidth={3.5} strokeLinecap="round" />
            </>
          ) : null}
          {variant === 'sword' || variant === 'wings' ? (
            <>
              <Path d="M80 92 L80 40" stroke="#e8f0ff" strokeWidth={4} strokeLinecap="round" />
              <Path d="M74 80 H86" stroke="#ffd34d" strokeWidth={3} />
            </>
          ) : null}
          {variant === 'katana' ? (
            <Path
              d="M18 90 Q40 60 82 40"
              fill="none"
              stroke="#e8f0ff"
              strokeWidth={3}
              strokeLinecap="round"
            />
          ) : null}
        </>
      )
    case 'dragon':
      return (
        <>
          <Path d="M40 54 Q10 20 4 50 Q18 50 20 66 Q30 58 40 66 Z" fill={c.dark} {...stroke} />
          <Path d="M60 54 Q90 20 96 50 Q82 50 80 66 Q70 58 60 66 Z" fill={c.dark} {...stroke} />
          <Ellipse cx={50} cy={74} rx={18} ry={16} fill={body} {...stroke} />
          <Path d="M42 66 Q40 44 50 36 Q60 44 58 66 Z" fill={body} {...stroke} />
          <Path d="M36 30 Q50 18 64 30 L60 46 Q50 52 40 46 Z" fill={body} {...stroke} />
          <Path d="M38 28 L30 12 L44 24 Z" fill={c.light} {...stroke} />
          <Path d="M62 28 L70 12 L56 24 Z" fill={c.light} {...stroke} />
          {eyes(44, 56, 34, c, 2.4)}
          <Path d="M44 78 Q50 84 56 78" fill="none" stroke={c.light} strokeWidth={2} />
        </>
      )
    case 'angel':
      return (
        <>
          <Path d="M44 48 Q10 20 6 60 Q22 52 28 72 Q36 60 44 66 Z" fill="#fff" opacity={0.9} />
          <Path d="M56 48 Q90 20 94 60 Q78 52 72 72 Q64 60 56 66 Z" fill="#fff" opacity={0.9} />
          <Ellipse cx={50} cy={16} rx={13} ry={4} fill="none" stroke="#ffe27a" strokeWidth={3} />
          <Path d="M40 50 L60 50 L68 92 L32 92 Z" fill={body} {...stroke} />
          <Circle cx={50} cy={36} r={12} fill={c.light} {...stroke} />
          {eyes(45, 55, 36, c, 2)}
        </>
      )
  }
}

/** V: the secret monsters (7 and 8 stars) show no art: a veiled silhouette and a question mark. */
function SecretArt({ stars, size }: { stars: number; size: number }) {
  const frame = STAR_FRAMES[Math.min(8, Math.max(1, stars))]!
  const id = `secret-${String(stars)}`
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100" accessibilityLabel="Monstre secret">
      <Defs>
        <RadialGradient id={`bg-${id}`} cx="50%" cy="45%" r="65%">
          <Stop offset="0" stopColor="#5fb8ff" stopOpacity={0.55} />
          <Stop offset="0.6" stopColor="#1b1830" stopOpacity={0.95} />
          <Stop offset="1" stopColor="#0d0b16" />
        </RadialGradient>
        <LinearGradient id={`fr-${id}`} x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor={frame[1]} />
          <Stop offset="0.5" stopColor={frame[0]} />
          <Stop offset="1" stopColor={frame[1]} />
        </LinearGradient>
      </Defs>
      <Rect x={3} y={3} width={94} height={94} rx={18} fill={`url(#bg-${id})`} />
      <Ellipse cx={50} cy={62} rx={24} ry={28} fill="#0d0b16" opacity={0.85} />
      <Circle cx={50} cy={34} r={15} fill="#0d0b16" opacity={0.85} />
      <Path
        d="M41 38a9 9 0 1 1 13 8c-2.5 1.5-4 3-4 6v2h-5v-2.5c0-4 2-6.2 5-8a4 4 0 1 0-6-3.5z M45 59h5v5h-5z"
        fill="#e8e6ff"
        transform="translate(2 4) scale(1.05)"
      />
      <Rect
        x={3}
        y={3}
        width={94}
        height={94}
        rx={18}
        fill="none"
        stroke={`url(#fr-${id})`}
        strokeWidth={5}
      />
    </Svg>
  )
}
