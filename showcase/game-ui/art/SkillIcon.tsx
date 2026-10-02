/**
 * Spell icons (V: "qu'on voie mieux les sorts"): one badge per kind of skill, drawn in SVG, framed
 * in the colour of the caster's element. The kind is read from what the skill does in the battle
 * log (several targets, heals, buffs, debuffs, stun) or, for the skill list, from its definition.
 */
import Svg, { Circle, Defs, Path, RadialGradient, Rect, Stop } from 'react-native-svg'
import type { Element } from '../../api/types'
import { ELEMENT_COLORS } from './palette'

export type SkillKind = 'strike' | 'area' | 'heal' | 'buff' | 'debuff' | 'stun' | 'spell'

export const SKILL_KIND_LABELS: Record<SkillKind, string> = {
  strike: 'Attaque',
  area: 'Attaque de zone',
  heal: 'Soin',
  buff: 'Renforcement',
  debuff: 'Affaiblissement',
  stun: 'Étourdissement',
  spell: 'Sort',
}

/** Kind of a skill from its definition (skill list) — `slot` is its 1-based place. */
export function skillKindOf(skill: {
  target?: string
  effects?: { effect: string }[]
  heal?: number | null
  stun_chance?: number
  slot?: number
}): SkillKind {
  const effects = skill.effects?.map((e) => e.effect) ?? []
  if (skill.stun_chance) return 'stun'
  if (skill.heal || skill.target === 'ally' || skill.target === 'all_allies') {
    return effects.some((e) => e.endsWith('_up')) ? 'buff' : 'heal'
  }
  if (effects.includes('stun')) return 'stun'
  if (skill.target === 'all_enemies') return 'area'
  if (effects.some((e) => e.endsWith('_down') || e === 'burn')) return 'debuff'
  if (effects.some((e) => e.endsWith('_up') || e === 'regen')) return 'buff'
  return skill.slot === 1 || skill.slot === undefined ? 'strike' : 'spell'
}

/** Kind of an action from the battle log. */
export function actionKindOf(action: {
  hits: unknown[]
  heals: unknown[]
  effects?: { effect: string; resisted?: boolean }[]
  skill: string
}): SkillKind {
  const effects = (action.effects ?? []).map((e) => e.effect)
  if (effects.includes('stun')) return 'stun'
  if (action.heals.length > 0 && action.hits.length === 0) return 'heal'
  if (action.hits.length > 1) return 'area'
  if (action.hits.length === 0 && effects.some((e) => e.endsWith('_up') || e === 'regen')) {
    return 'buff'
  }
  if (effects.some((e) => e.endsWith('_down') || e === 'burn')) return 'debuff'
  return action.skill.endsWith('_1') ? 'strike' : 'spell'
}

const GLYPHS: Record<SkillKind, string> = {
  // Sword
  strike: 'M17 4l3 0 0 3-9 9-3-3zM6 15l3 3-2 2-1-1-2 2-1-1 2-2-1-1z',
  // Burst
  area: 'M12 2l2 6 6-2-4 5 5 3-6 1 1 6-4-4-4 4 1-6-6-1 5-3-4-5 6 2z',
  // Cross
  heal: 'M9 3h6v6h6v6h-6v6H9v-6H3V9h6z',
  // Arrow up
  buff: 'M12 3l7 8h-4v10H9V11H5z',
  // Arrow down
  debuff: 'M12 21l-7-8h4V3h6v10h4z',
  // Spiral stars
  stun: 'M12 4a8 8 0 1 0 8 8h-3a5 5 0 1 1-5-5zM18 2l1 2 2 1-2 1-1 2-1-2-2-1 2-1z',
  // Rune star
  spell: 'M12 2l2.6 6.6L21 9l-5 4.4L17.5 21 12 17.2 6.5 21 8 13.4 3 9l6.4-.4z',
}

const KIND_TINT: Record<SkillKind, string> = {
  strike: '#ffffff',
  area: '#ffd36b',
  heal: '#7dffb0',
  buff: '#8fc4ff',
  debuff: '#ff8f9a',
  stun: '#d7b4ff',
  spell: '#ffffff',
}

export function SkillIcon({
  kind,
  element,
  size = 32,
}: {
  kind: SkillKind
  element: Element
  size?: number
}) {
  const colors = ELEMENT_COLORS[element]
  const id = `sk-${kind}-${element}`
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      accessibilityLabel={SKILL_KIND_LABELS[kind]}
    >
      <Defs>
        <RadialGradient id={id} cx="50%" cy="35%" r="70%">
          <Stop offset="0" stopColor={colors.glow} stopOpacity={1} />
          <Stop offset="1" stopColor={colors.dark} stopOpacity={1} />
        </RadialGradient>
      </Defs>
      <Rect x={1} y={1} width={30} height={30} rx={8} fill={`url(#${id})`} />
      <Rect
        x={1}
        y={1}
        width={30}
        height={30}
        rx={8}
        fill="none"
        stroke={colors.main}
        strokeWidth={2}
      />
      <Circle cx={16} cy={16} r={11} fill="#000" opacity={0.18} />
      <Path d={GLYPHS[kind]} fill={KIND_TINT[kind]} transform="translate(4 4)" />
    </Svg>
  )
}
