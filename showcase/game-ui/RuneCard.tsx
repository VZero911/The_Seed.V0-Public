import { Pressable, StyleSheet, Text, View } from 'react-native'
import type { Rune } from '../api/types'
import { RARITY, statValue } from '../game/runes'
import { colors, radius, space } from './theme'

/** A rune tile: slot, stars, level, set, main stat and substats. */
export function RuneCard({
  rune,
  onPress,
  selected,
  compact,
}: {
  rune: Rune
  onPress?: () => void
  selected?: boolean
  compact?: boolean
}) {
  const rarity = RARITY[rune.rarity]
  return (
    <Pressable
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={`Rune ${rune.set.name} slot ${String(rune.slot)} +${String(rune.level)}`}
      disabled={!onPress}
      onPress={onPress}
      style={[styles.card, { borderColor: selected ? colors.gold : rarity.color }]}
    >
      <View style={styles.head}>
        <Text style={[styles.slot, { color: rarity.color }]}>{rune.slot}</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.title} numberOfLines={1}>
            {rune.set.name} +{rune.level}
          </Text>
          <Text style={styles.stars}>{'★'.repeat(rune.stars)}</Text>
        </View>
      </View>
      <Text style={[styles.rarity, { color: rarity.color }]}>{rarity.label}</Text>
      {rune.main ? (
        <Text style={styles.main}>
          {rune.main.label} {statValue(rune.main.stat, rune.main.value)}
        </Text>
      ) : (
        <Text style={styles.muted}>Slot neutre</Text>
      )}
      {rune.innate ? (
        <Text style={styles.innate}>
          ✦ {rune.innate.label} {statValue(rune.innate.stat, rune.innate.value)}
        </Text>
      ) : null}
      {compact
        ? null
        : rune.substats.map((s) => (
            <Text key={s.stat} style={styles.sub}>
              {s.label} {statValue(s.stat, s.value)}
              <Text style={styles.rolls}> ({String(rune.value.rolls[s.stat] ?? 0)} jet)</Text>
              {s.grind > 0 ? <Text style={styles.grind}> (+{s.grind})</Text> : null}
              {s.changed ? <Text style={styles.changed}> ◆</Text> : null}
            </Text>
          ))}
      <Text style={styles.value}>
        Rang {rune.value.rank} · {rune.value.score}/100
        {rune.level < rune.max_level
          ? ` (potentiel ${rune.value.potential_rank} ${String(rune.value.potential)})`
          : ''}
      </Text>
      {rune.equipped_on ? <Text style={styles.muted}>Équipée sur #{rune.equipped_on}</Text> : null}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    width: 170,
    backgroundColor: colors.panel,
    borderWidth: 2,
    borderRadius: radius.lg,
    padding: space.md,
    gap: 2,
  },
  head: { flexDirection: 'row', gap: space.sm, alignItems: 'center' },
  slot: { fontSize: 24, fontWeight: '900', width: 26, textAlign: 'center' },
  title: { color: colors.text, fontWeight: '700' },
  stars: { color: colors.gold, fontSize: 11 },
  rarity: { fontSize: 12, fontWeight: '700' },
  main: { color: colors.text, fontWeight: '700', fontSize: 14 },
  sub: { color: colors.muted, fontSize: 12 },
  grind: { color: colors.success },
  changed: { color: colors.accent },
  muted: { color: colors.muted, fontSize: 11 },
  value: { color: colors.gold, fontSize: 11, fontWeight: '700' },
  innate: { color: colors.accent, fontSize: 12, fontWeight: '700' },
  rolls: { color: colors.muted, fontSize: 10 },
})
