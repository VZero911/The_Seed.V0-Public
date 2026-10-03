import { useEffect, useState } from 'react'
import { Animated, Easing, StyleSheet, View } from 'react-native'
import { Text } from '../i18n/Text'
import Svg, { Circle, G, Path } from 'react-native-svg'
import type { GameMonster } from '../api/types'
import { ELEMENT_COLORS, STAR_FRAMES } from './art/palette'
import { MonsterArt } from './art/MonsterArt'
import { ElementEmblem } from './art/ElementEmblem'
import { familyOf } from '../game/format'
import { Button, Stars } from './components'
import { colors, radius, space } from './theme'

/** How big the show is (V): a plain flip, a special one for 4-5 stars, a huge one for 6 stars. */
export type RevealTier = 'common' | 'rare' | 'mythic'

export function revealTier(naturalStars: number): RevealTier {
  return naturalStars >= 6 ? 'mythic' : naturalStars >= 4 ? 'rare' : 'common'
}

const CHEERS: Record<RevealTier, (stars: number) => string> = {
  common: () => 'Nouveau monstre !',
  rare: (stars) => (stars >= 5 ? 'Invocation légendaire !' : 'Superbe invocation !'),
  mythic: () => 'INVOCATION MYTHIQUE !',
}

/**
 * The summon reveal. Every card spins face down then flips to the monster; then:
 * - 4-5 stars: light rays turn behind the card, sparkles burst, the card shakes;
 * - 6 stars: the screen darkens, shock rings spread, two crowns of rays turn in opposite
 *   directions, the card falls from above and lands with a flash, golden sparkles rain.
 */
export function SummonReveal({ monster, onDone }: { monster: GameMonster; onDone: () => void }) {
  const tier = revealTier(monster.natural_stars)
  const [flip] = useState(() => new Animated.Value(0))
  const [glow] = useState(() => new Animated.Value(0))
  const [spin] = useState(() => new Animated.Value(0))
  const [burst] = useState(() => new Animated.Value(0))
  const [drop] = useState(() => new Animated.Value(tier === 'mythic' ? 0 : 1))
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const flipTime = tier === 'mythic' ? 1500 : tier === 'rare' ? 1200 : 900
    const show = Animated.sequence([
      ...(tier === 'mythic'
        ? [
            Animated.timing(drop, {
              toValue: 1,
              duration: 900,
              easing: Easing.bounce,
              useNativeDriver: false,
            }),
          ]
        : []),
      Animated.timing(flip, {
        toValue: 1,
        duration: flipTime,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: false,
      }),
      Animated.parallel([
        Animated.timing(burst, {
          toValue: 1,
          duration: tier === 'mythic' ? 1600 : 1000,
          easing: Easing.out(Easing.quad),
          useNativeDriver: false,
        }),
        Animated.loop(
          Animated.sequence([
            Animated.timing(glow, { toValue: 1, duration: 700, useNativeDriver: false }),
            Animated.timing(glow, { toValue: 0.4, duration: 700, useNativeDriver: false }),
          ]),
          { iterations: tier === 'common' ? 3 : 6 },
        ),
      ]),
    ])
    show.start()
    // The rays turn forever: stopped when the reveal goes away (else the timers keep running).
    const rays =
      tier === 'common'
        ? null
        : Animated.loop(
            Animated.timing(spin, {
              toValue: 1,
              duration: tier === 'mythic' ? 6000 : 9000,
              easing: Easing.linear,
              useNativeDriver: false,
            }),
          )
    rays?.start()
    const id = flip.addListener(({ value }) => {
      if (value >= 0.5) setShown(true)
    })
    return () => {
      flip.removeListener(id)
      show.stop()
      rays?.stop()
    }
  }, [flip, glow, spin, burst, drop, tier])

  const frame = STAR_FRAMES[Math.min(8, Math.max(1, monster.natural_stars))]!
  const element = ELEMENT_COLORS[monster.element]
  const rayColor = tier === 'mythic' ? '#ffd27a' : frame[1]
  const turn = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] })
  const turnBack = spin.interpolate({ inputRange: [0, 1], outputRange: ['360deg', '0deg'] })
  const stage = tier === 'mythic' ? 420 : 320

  return (
    <View
      style={[styles.wrap, tier === 'mythic' && styles.mythicWrap]}
      accessibilityLabel={`Invocation : ${monster.display_name}`}
    >
      <View style={[styles.stage, { width: stage, height: stage }]}>
        {tier !== 'common' && shown ? (
          <Animated.View style={[styles.layer, { transform: [{ rotate: turn }] }]}>
            <Rays size={stage} color={rayColor} count={tier === 'mythic' ? 18 : 12} />
          </Animated.View>
        ) : null}
        {tier === 'mythic' && shown ? (
          <>
            <Animated.View
              style={[styles.layer, { transform: [{ rotate: turnBack }], opacity: 0.6 }]}
            >
              <Rays size={stage * 0.8} color={frame[0]} count={10} />
            </Animated.View>
            {[0, 0.25, 0.5].map((delay) => (
              <Animated.View
                key={delay}
                style={[
                  styles.layer,
                  {
                    opacity: burst.interpolate({
                      inputRange: [0, delay, Math.min(1, delay + 0.5), 1],
                      outputRange: [0, 0.9, 0, 0],
                    }),
                    transform: [
                      {
                        scale: burst.interpolate({
                          inputRange: [0, delay, 1],
                          outputRange: [0.2, 0.2, 1.6],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <Svg width={stage} height={stage} viewBox="0 0 100 100">
                  <Circle cx={50} cy={50} r={40} stroke="#ffd27a" strokeWidth={2.5} fill="none" />
                </Svg>
              </Animated.View>
            ))}
          </>
        ) : null}
        <Animated.View
          style={[
            styles.halo,
            {
              width: stage * 0.78,
              height: stage * 0.78,
              borderRadius: stage,
              backgroundColor: tier === 'common' ? element.glow : frame[1],
              opacity: glow.interpolate({
                inputRange: [0, 1],
                outputRange: [0, tier === 'common' ? 0.3 : tier === 'rare' ? 0.55 : 0.75],
              }),
              transform: [
                { scale: glow.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1.15] }) },
              ],
            },
          ]}
        />
        {tier !== 'common' && shown ? (
          <Animated.View
            style={[
              styles.layer,
              {
                opacity: burst.interpolate({ inputRange: [0, 0.1, 1], outputRange: [0, 1, 0] }),
                transform: [
                  { scale: burst.interpolate({ inputRange: [0, 1], outputRange: [0.5, 1.3] }) },
                ],
              },
            ]}
          >
            <Sparkles size={stage} color={rayColor} count={tier === 'mythic' ? 28 : 14} />
          </Animated.View>
        ) : null}
        <Animated.View
          style={[
            styles.card,
            tier === 'mythic' && styles.cardMythic,
            {
              borderColor: frame[1],
              transform: [
                {
                  translateY: drop.interpolate({ inputRange: [0, 1], outputRange: [-500, 0] }),
                },
                { perspective: 800 },
                {
                  rotateY: flip.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['180deg', '360deg'],
                  }),
                },
                {
                  translateX:
                    tier === 'common'
                      ? 0
                      : burst.interpolate({
                          inputRange: [0, 0.05, 0.1, 0.15, 0.2, 1],
                          outputRange: [0, -8, 8, -5, 0, 0],
                        }),
                },
              ],
            },
          ]}
        >
          {shown ? (
            <>
              <MonsterArt
                family={familyOf(monster)}
                element={monster.element}
                stars={monster.stars}
                awakened={monster.awakened}
                size={tier === 'mythic' ? 180 : 150}
              />
              <View style={styles.name}>
                <ElementEmblem element={monster.element} size={22} />
                <Text style={styles.title}>{monster.display_name}</Text>
              </View>
              <Stars count={monster.natural_stars} size={tier === 'mythic' ? 26 : 20} />
            </>
          ) : (
            <Text style={[styles.back, { color: frame[1] }]}>?</Text>
          )}
        </Animated.View>
      </View>
      {shown ? (
        <Text
          style={[
            styles.cheer,
            tier === 'rare' && styles.cheerRare,
            tier === 'mythic' && styles.cheerMythic,
            { color: tier === 'common' ? colors.gold : frame[1] },
          ]}
        >
          {CHEERS[tier](monster.natural_stars)}
        </Text>
      ) : null}
      <Button label="Continuer" onPress={onDone} />
    </View>
  )
}

/** Light rays from the centre (triangles), every other one fainter. */
function Rays({ size, color, count }: { size: number; color: string; count: number }) {
  const step = 360 / count
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <G>
        {Array.from({ length: count }, (_, i) => (
          <Path
            key={i}
            d="M50 50 L47 0 L53 0 Z"
            fill={color}
            opacity={i % 2 ? 0.25 : 0.55}
            transform={`rotate(${String(i * step)} 50 50)`}
          />
        ))}
      </G>
    </Svg>
  )
}

/** Four-point sparkles scattered around the card (fixed layout, so renders are stable). */
function Sparkles({ size, color, count }: { size: number; color: string; count: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {Array.from({ length: count }, (_, i) => {
        const angle = (i * 137.5 * Math.PI) / 180
        const radius_ = 22 + ((i * 7) % 26)
        const x = 50 + Math.cos(angle) * radius_
        const y = 50 + Math.sin(angle) * radius_
        const s = 1.5 + (i % 3)
        return (
          <Path
            key={i}
            d={`M${String(x)} ${String(y - s * 2)} L${String(x + s / 2)} ${String(y - s / 2)} L${String(x + s * 2)} ${String(y)} L${String(x + s / 2)} ${String(y + s / 2)} L${String(x)} ${String(y + s * 2)} L${String(x - s / 2)} ${String(y + s / 2)} L${String(x - s * 2)} ${String(y)} L${String(x - s / 2)} ${String(y - s / 2)} Z`}
            fill={i % 4 === 0 ? '#ffffff' : color}
          />
        )
      })}
    </Svg>
  )
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', gap: space.md, paddingVertical: space.lg },
  mythicWrap: {
    backgroundColor: '#07050f',
    borderRadius: radius.lg,
    borderWidth: 2,
    borderColor: '#ffd27a',
    paddingHorizontal: space.lg,
  },
  stage: { alignItems: 'center', justifyContent: 'center' },
  layer: { position: 'absolute', alignItems: 'center', justifyContent: 'center' },
  halo: { position: 'absolute' },
  card: {
    width: 200,
    minHeight: 250,
    borderWidth: 3,
    borderRadius: radius.lg,
    backgroundColor: colors.panel,
    alignItems: 'center',
    justifyContent: 'center',
    gap: space.sm,
    padding: space.md,
    backfaceVisibility: 'hidden',
  },
  cardMythic: { width: 240, minHeight: 300, borderWidth: 4 },
  back: { fontSize: 80, fontWeight: '900' },
  name: { flexDirection: 'row', alignItems: 'center', gap: space.xs },
  title: { color: colors.text, fontSize: 18, fontWeight: '800' },
  cheer: { fontSize: 20, fontWeight: '900' },
  cheerRare: { fontSize: 26, letterSpacing: 1 },
  cheerMythic: { fontSize: 34, letterSpacing: 3, textAlign: 'center' },
})
