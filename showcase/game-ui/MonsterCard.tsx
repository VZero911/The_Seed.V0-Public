import { Pressable, StyleSheet, View } from 'react-native'
import { Text } from '../i18n/Text'
import type { GameMonster } from '../api/types'
import { familyOf, ROLES } from '../game/format'
import { ElementEmblem } from './art/ElementEmblem'
import { MonsterArt } from './art/MonsterArt'
import { Stars } from './components'
import { colors, radius, space } from './theme'

/** A monster tile used by the collection, the team picker and the summon result. */
export function MonsterCard({
  monster,
  onPress,
  selected,
  badge,
}: {
  monster: GameMonster
  onPress?: () => void
  selected?: boolean
  badge?: string
}) {
  return (
    <Pressable
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={`${monster.name}, niveau ${String(monster.level)}`}
      accessibilityState={{ selected: !!selected }}
      disabled={!onPress}
      onPress={onPress}
      style={[styles.card, selected && styles.selected]}
    >
      {badge ? <Text style={styles.badge}>{badge}</Text> : null}
      <MonsterArt
        family={familyOf(monster)}
        element={monster.element}
        stars={monster.stars}
        awakened={monster.awakened}
      />
      <View style={styles.emblem}>
        <ElementEmblem element={monster.element} size={24} />
      </View>
      <Text style={styles.name} numberOfLines={1}>
        {monster.display_name}
      </Text>
      <Stars count={monster.stars} awakened={monster.awakened} grey={monster.grey} />
      <Text style={styles.meta}>
        Niv. {monster.level} · {ROLES[monster.role] ?? monster.role}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    width: 150,
    alignItems: 'center',
    gap: space.xs,
    backgroundColor: colors.panel,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: space.md,
  },
  emblem: { position: 'absolute', top: space.xs, left: space.xs },
  selected: { borderColor: colors.gold, backgroundColor: colors.panelHigh },
  name: { color: colors.text, fontWeight: '700', fontSize: 15 },
  meta: { color: colors.muted, fontSize: 12 },
  badge: {
    position: 'absolute',
    top: space.xs,
    right: space.xs,
    backgroundColor: colors.gold,
    color: colors.bg,
    fontWeight: '800',
    paddingHorizontal: 6,
    borderRadius: 8,
    overflow: 'hidden',
  },
})
