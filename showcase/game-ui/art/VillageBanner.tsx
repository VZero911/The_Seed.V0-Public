import { useEffect, useState } from 'react'
import { Animated, Easing } from 'react-native'
import Svg, { Circle, Defs, G, LinearGradient, Path, Rect, Stop } from 'react-native-svg'

import { SCENE_H, SCENE_W, boltPath, towerTiers, underRockPath } from './island'

const AnimatedG = Animated.createAnimatedComponent(G)

/**
 * The Village: a magical island floating in a torn red sky, the seed tree on its grass, waterfalls
 * pouring into the void and, behind it, the giant dark tower. The island bobs slowly and the
 * lightning flickers (V's art direction, issue #12).
 */
export function VillageBanner({ maxHeight = 420 }: { maxHeight?: number }) {
  const [bob] = useState(() => new Animated.Value(0))
  const [flash] = useState(() => new Animated.Value(0))
  useEffect(() => {
    const bobbing = Animated.loop(
      Animated.sequence([
        Animated.timing(bob, {
          toValue: 1,
          duration: 3200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: false,
        }),
        Animated.timing(bob, {
          toValue: 0,
          duration: 3200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: false,
        }),
      ]),
    )
    const lightning = Animated.loop(
      Animated.sequence([
        Animated.delay(2600),
        Animated.timing(flash, { toValue: 1, duration: 70, useNativeDriver: false }),
        Animated.timing(flash, { toValue: 0.2, duration: 90, useNativeDriver: false }),
        Animated.timing(flash, { toValue: 1, duration: 60, useNativeDriver: false }),
        Animated.timing(flash, { toValue: 0, duration: 400, useNativeDriver: false }),
      ]),
    )
    bobbing.start()
    lightning.start()
    return () => {
      bobbing.stop()
      lightning.stop()
    }
  }, [bob, flash])
  const dy = bob.interpolate({ inputRange: [0, 1], outputRange: [0, -5] })

  return (
    <Svg
      width="100%"
      style={{ aspectRatio: SCENE_W / SCENE_H, maxHeight }}
      viewBox={`0 0 ${String(SCENE_W)} ${String(SCENE_H)}`}
      preserveAspectRatio="xMidYMax meet"
      accessibilityLabel="Le Village, une île flottante sous un ciel déchiré, face à la tour sombre"
    >
      <Defs>
        <LinearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#12071f" />
          <Stop offset="0.55" stopColor="#4a1238" />
          <Stop offset="1" stopColor="#c2412d" />
        </LinearGradient>
        <LinearGradient id="grass" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#5fd19a" />
          <Stop offset="1" stopColor="#1f7a52" />
        </LinearGradient>
        <LinearGradient id="rock" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#5a4a6e" />
          <Stop offset="1" stopColor="#1c1428" />
        </LinearGradient>
        <LinearGradient id="tower" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor="#0c0714" />
          <Stop offset="1" stopColor="#2b1d40" />
        </LinearGradient>
        <LinearGradient id="fall" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#bfe9ff" stopOpacity={0.9} />
          <Stop offset="1" stopColor="#bfe9ff" stopOpacity={0} />
        </LinearGradient>
      </Defs>
      <Rect x={0} y={0} width={SCENE_W} height={SCENE_H} fill="url(#sky)" />
      {/* The torn sky: a dark rift behind the tower. */}
      <Path d="M250 0 L270 30 L255 60 L285 95 L240 140 L300 0z" fill="#07030d" opacity={0.85} />
      {[20, 70, 120, 330, 372].map((x, i) => (
        <Circle key={x} cx={x} cy={14 + (i % 3) * 14} r={1.2} fill="#ffd9d0" opacity={0.7} />
      ))}
      {/* The giant dark tower, far behind the island. */}
      <G>
        <Path d="M262 150 L270 40 L282 30 L294 40 L302 150z" fill="url(#tower)" />
        {towerTiers(282, 150, 5).map((t) => (
          <Rect key={t.y} x={t.x} y={t.y} width={t.w} height={2} fill="#3a2858" opacity={0.7} />
        ))}
        <Path d="M276 30 L282 6 L288 30z" fill="#0c0714" />
        <Circle cx={282} cy={46} r={3} fill="#ff3b30" />
        <Circle cx={282} cy={46} r={7} fill="#ff3b30" opacity={0.25} />
      </G>
      {/* Red lightning, flickering. */}
      <AnimatedG opacity={flash}>
        <Path d={boltPath(236, 0, 6, 16)} stroke="#ff6a5a" strokeWidth={2} fill="none" />
        <Path d={boltPath(236, 0, 6, 16)} stroke="#fff" strokeWidth={0.7} fill="none" />
        <Path d={boltPath(330, 0, 5, 14)} stroke="#ff6a5a" strokeWidth={1.6} fill="none" />
      </AnimatedG>
      {/* Clouds drifting in the void. */}
      <Path
        d="M0 190 Q40 172 90 186 T200 184 T320 188 T400 182 V220 H0z"
        fill="#2a1230"
        opacity={0.75}
      />
      {/* The island, bobbing. */}
      <AnimatedG translateY={dy}>
        <Path d={underRockPath(52, 332, 140, 62)} fill="url(#rock)" />
        <Rect x={118} y={142} width={5} height={50} fill="url(#fall)" />
        <Rect x={262} y={142} width={5} height={46} fill="url(#fall)" />
        <Path
          d="M40 140 Q70 118 130 130 T250 124 T345 138 Q300 150 200 150 T40 140z"
          fill="url(#grass)"
        />
        <G>
          <Rect x={193} y={92} width={8} height={40} fill="#5c3714" />
          <Circle cx={197} cy={84} r={22} fill="url(#grass)" />
          <Circle cx={182} cy={96} r={13} fill="url(#grass)" />
          <Circle cx={212} cy={96} r={13} fill="url(#grass)" />
          <Circle cx={197} cy={78} r={4} fill="#fff6cc" opacity={0.9} />
        </G>
        {(
          [
            [70, 120],
            [104, 126],
            [292, 122],
            [322, 128],
          ] as const
        ).map(([x, y]) => (
          <G key={x}>
            <Rect x={x} y={y} width={22} height={14} fill="#4a3a6e" />
            <Path
              d={`M${String(x - 3)} ${String(y)} L${String(x + 11)} ${String(y - 10)} L${String(x + 25)} ${String(y)}z`}
              fill="#8a4f3c"
            />
            <Rect x={x + 7} y={y + 5} width={7} height={6} fill="#ffd27a" />
          </G>
        ))}
      </AnimatedG>
    </Svg>
  )
}
