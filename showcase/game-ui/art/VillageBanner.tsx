import Svg, { Circle, Defs, G, LinearGradient, Path, Rect, Stop } from 'react-native-svg'

/** The Village's scenery: dusk sky, hills, houses with lit windows and the great seed tree. */
export function VillageBanner({ height = 120 }: { height?: number }) {
  return (
    <Svg width="100%" height={height} viewBox="0 0 400 120" preserveAspectRatio="xMidYMid slice">
      <Defs>
        <LinearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#2a1d4f" />
          <Stop offset="0.6" stopColor="#6b3f7a" />
          <Stop offset="1" stopColor="#f2a65a" />
        </LinearGradient>
        <LinearGradient id="tree" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#7cf2b4" />
          <Stop offset="1" stopColor="#1f7a52" />
        </LinearGradient>
      </Defs>
      <Rect x={0} y={0} width={400} height={120} fill="url(#sky)" />
      <Circle cx={330} cy={30} r={14} fill="#fff1b8" opacity={0.9} />
      {[30, 80, 140, 210, 260, 370].map((x, i) => (
        <Circle key={x} cx={x} cy={12 + (i % 3) * 9} r={1.2} fill="#fff" opacity={0.8} />
      ))}
      <Path d="M0 90 Q60 60 130 85 T260 80 T400 88 V120 H0z" fill="#3b2d5c" />
      <Path d="M0 100 Q90 80 180 98 T400 96 V120 H0z" fill="#241c3a" />
      <G>
        <Rect x={196} y={52} width={8} height={48} fill="#5c3714" />
        <Circle cx={200} cy={45} r={24} fill="url(#tree)" />
        <Circle cx={184} cy={56} r={14} fill="url(#tree)" />
        <Circle cx={216} cy={56} r={14} fill="url(#tree)" />
        <Circle cx={200} cy={40} r={4} fill="#fff6cc" opacity={0.9} />
      </G>
      {(
        [
          [60, 84],
          [100, 88],
          [290, 86],
          [330, 90],
        ] as const
      ).map(([x, y]) => (
        <G key={x}>
          <Rect x={x} y={y} width={26} height={18} fill="#4a3a6e" />
          <Path
            d={`M${String(x - 3)} ${String(y)} L${String(x + 13)} ${String(y - 12)} L${String(x + 29)} ${String(y)}z`}
            fill="#8a4f3c"
          />
          <Rect x={x + 9} y={y + 6} width={8} height={7} fill="#ffd27a" />
        </G>
      ))}
    </Svg>
  )
}
