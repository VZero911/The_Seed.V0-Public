/**
 * The icon of an achievement (V, 2026-10-03): a ring in the colour of its tier, the icon of its
 * family inside, a padlock when it is not obtained yet and a shine over the legendary ones.
 */
import { useEffect, useState } from 'react'
import { Animated, Easing, Platform, StyleSheet, View } from 'react-native'
import type { AchievementTier } from '../../api/types'
import { Motion, Pop, useReduceMotion } from '../motion'
import { colors } from '../theme'
import { Icon, type IconName } from './Icon'

/** The family icon of an achievement, from its kind (the kind lives in the content, not the API). */
const KIND_ICONS: Record<string, IconName> = {
  victories: 'swords',
  clears: 'map',
  clear_stage: 'tower',
  clear_all: 'crown',
  summons: 'scroll',
  summon_stars: 'star',
  monster_stars: 'star',
  stars6_owned: 'crown',
  monsters_owned: 'paw',
  species_owned: 'book',
  families_owned: 'book',
  max_level_monsters: 'flame',
  awakened: 'flame',
  runes: 'rune',
  rune_best_level: 'hammer',
  runes_legendary: 'gem',
  runes_mythic: 'gem',
  checkin_days: 'calendar',
  market_sales: 'shop',
  market_purchases: 'shop',
  friends: 'people',
  guild: 'shield',
  guild_level: 'shield',
  account_level: 'crown',
  social_level: 'people',
  world_boss_attacks: 'skull',
  world_boss_kill: 'skull',
  poll_votes: 'ballot',
  poc: 'trophy',
  arena_rival_wins: 'wings',
  arena_day_best: 'wings',
}

/** The icon to draw for an achievement id like `victories-100` or `element-fire-10`. */
export function achievementIconFor(id: string, kind?: string): IconName {
  if (kind && KIND_ICONS[kind]) return KIND_ICONS[kind]
  const prefix = id.split(':')[0] ?? id
  if (prefix.startsWith('first-clear')) return 'crown'
  if (prefix.startsWith('element-')) return 'paw'
  if (prefix.startsWith('tower') || prefix.startsWith('dungeon') || prefix.startsWith('zone')) {
    return 'tower'
  }
  const family = prefix.replace(/-\d+$/, '')
  const byPrefix: Record<string, IconName> = {
    victories: 'swords',
    summons: 'scroll',
    'summons-more': 'scroll',
    owned: 'paw',
    species: 'book',
    families: 'book',
    maxed: 'flame',
    'six-star': 'crown',
    'awaken-more': 'flame',
    'rune-level': 'hammer',
    'runes-more': 'rune',
    'runes-legend': 'gem',
    'runes-mythic': 'gem',
    checkin: 'calendar',
    sales: 'shop',
    purchases: 'shop',
    'friends-more': 'people',
    'boss-more': 'skull',
    'votes-more': 'ballot',
    'level-more': 'crown',
    'social-more': 'people',
    'guild-more': 'shield',
    'arena-wins': 'wings',
    'arena-day': 'wings',
    'clears-more': 'map',
  }
  return byPrefix[family] ?? 'medal'
}

export const TIER_COLORS: Record<AchievementTier, string> = {
  basique: '#cfd3e6',
  avancé: '#6fb3ff',
  difficile: '#c58bff',
  légendaire: colors.gold,
}

/** The ring colour of a tier. */
export const tierColor = (tier: AchievementTier): string => TIER_COLORS[tier]

export function AchievementIcon({
  id,
  kind,
  tier,
  unlocked,
  size = 44,
  pop = false,
}: {
  id: string
  kind?: string
  tier: AchievementTier
  unlocked: boolean
  size?: number
  /** The icon springs in (a freshly unlocked achievement). */
  pop?: boolean
}) {
  const color = unlocked ? tierColor(tier) : colors.muted
  const body = (
    <View
      style={[
        styles.ring,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderColor: color,
          backgroundColor: unlocked ? `${color}22` : colors.panel,
          shadowColor: color,
          shadowOpacity: unlocked ? 0.7 : 0,
        },
      ]}
    >
      <Icon name={achievementIconFor(id, kind)} size={size * 0.52} color={color} />
      {!unlocked ? (
        <View style={[styles.lock, { width: size * 0.34, height: size * 0.34 }]}>
          <Icon name="lock" size={size * 0.24} color={colors.text} />
        </View>
      ) : null}
      {unlocked && tier === 'légendaire' ? <Shine size={size} /> : null}
    </View>
  )
  return pop && unlocked ? <Pop>{body}</Pop> : body
}

/** A light band sweeping over a legendary frame now and then. */
function Shine({ size }: { size: number }) {
  const reduce = useReduceMotion()
  const [x] = useState(() => new Animated.Value(0))
  useEffect(() => {
    if (reduce) return
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(1800),
        Animated.timing(x, {
          toValue: 1,
          duration: Motion.pulse.ms,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.timing(x, { toValue: 0, duration: 0, useNativeDriver: Platform.OS !== 'web' }),
      ]),
    )
    loop.start()
    return () => loop.stop()
  }, [reduce, x])
  if (reduce) return null
  return (
    <View
      style={[StyleSheet.absoluteFill, styles.clip, { borderRadius: size / 2 }]}
      pointerEvents="none"
    >
      <Animated.View
        style={[
          styles.band,
          {
            height: size * 1.6,
            transform: [
              { translateX: x.interpolate({ inputRange: [0, 1], outputRange: [-size, size] }) },
              { rotate: '20deg' },
            ],
          },
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  ring: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
  },
  lock: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    borderRadius: 99,
    backgroundColor: colors.panelHigh,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clip: { overflow: 'hidden' },
  band: { position: 'absolute', top: -8, width: 10, backgroundColor: 'rgba(255,255,255,0.45)' },
})
