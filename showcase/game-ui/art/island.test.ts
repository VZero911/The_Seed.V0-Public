import { boltPath, towerTiers, underRockPath } from './island'

test('a bolt is deterministic and zig-zags downwards', () => {
  const d = boltPath(100, 0, 4, 10)
  expect(d).toBe(boltPath(100, 0, 4, 10))
  expect(d.startsWith('M100 0')).toBe(true)
  expect(d.split('L')).toHaveLength(5)
  expect(d.endsWith('40')).toBe(true)
})

test('the rock underneath is closed and hangs below its top line', () => {
  const d = underRockPath(40, 340, 120, 60)
  expect(d.endsWith('z')).toBe(true)
  const ys = [...d.matchAll(/L\d+ (\d+)/g)].map((m) => Number(m[1]))
  expect(Math.max(...ys)).toBe(180)
  expect(Math.min(...ys)).toBe(120)
})

test('tower tiers stack upwards and narrow', () => {
  const tiers = towerTiers(200, 100, 4)
  expect(tiers).toHaveLength(4)
  const [bottom, , , top] = tiers
  expect(bottom?.w).toBeGreaterThan(top?.w ?? Infinity)
  expect(top?.y).toBeLessThan(bottom?.y ?? 0)
  expect(tiers.every((t) => t.w >= 10)).toBe(true)
})
