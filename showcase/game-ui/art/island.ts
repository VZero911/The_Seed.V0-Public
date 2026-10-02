/** Pure geometry of the floating island scene (kept out of the component so it can be tested). */

export const SCENE_W = 400
export const SCENE_H = 220

/** A jagged lightning bolt from (x, y) going down: deterministic, no randomness. */
export function boltPath(x: number, y: number, segments: number, step: number): string {
  let d = `M${String(x)} ${String(y)}`
  let cx = x
  let cy = y
  for (let i = 0; i < segments; i += 1) {
    cx += i % 2 === 0 ? -step * 0.6 : step * 0.9
    cy += step
    d += ` L${String(Math.round(cx * 10) / 10)} ${String(cy)}`
  }
  return d
}

/** Rock spikes hanging under the island, from left to right, as a closed path. */
export function underRockPath(left: number, right: number, top: number, depth: number): string {
  const teeth = 6
  const w = (right - left) / teeth
  let d = `M${String(left)} ${String(top)}`
  for (let i = 0; i < teeth; i += 1) {
    const tip = top + depth * (i === 2 || i === 3 ? 1 : 0.55 + (i % 2) * 0.2)
    d += ` L${String(Math.round(left + w * (i + 0.5)))} ${String(Math.round(tip))}`
    d += ` L${String(Math.round(left + w * (i + 1)))} ${String(top)}`
  }
  return `${d}z`
}

/** Tower tiers, bottom to top: each one narrower than the last. */
export function towerTiers(
  cx: number,
  baseY: number,
  tiers: number,
): { x: number; y: number; w: number; h: number }[] {
  const out: { x: number; y: number; w: number; h: number }[] = []
  let y = baseY
  for (let i = 0; i < tiers; i += 1) {
    const w = Math.max(10, 44 - i * 8)
    const h = 22
    y -= h
    out.push({ x: cx - w / 2, y, w, h })
  }
  return out
}
