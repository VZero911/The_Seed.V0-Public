import { achievementIconFor, tierColor } from './AchievementIcon'

describe('achievement icons', () => {
  it('follows the kind when it is known', () => {
    expect(achievementIconFor('x', 'victories')).toBe('swords')
    expect(achievementIconFor('x', 'checkin_days')).toBe('calendar')
    expect(achievementIconFor('x', 'arena_rival_wins')).toBe('wings')
  })

  it('reads the id when the kind is not sent (the API only sends ids)', () => {
    expect(achievementIconFor('victories-100')).toBe('swords')
    expect(achievementIconFor('tower-hard-50')).toBe('tower')
    expect(achievementIconFor('zone-3-hell')).toBe('tower')
    expect(achievementIconFor('element-fire-10')).toBe('paw')
    expect(achievementIconFor('rune-level-12')).toBe('hammer')
    expect(achievementIconFor('arena-day-7')).toBe('wings')
    expect(achievementIconFor('first-clear:z1-1')).toBe('crown')
    expect(achievementIconFor('checkin-365')).toBe('calendar')
  })

  it('always gives an icon, a medal by default', () => {
    expect(achievementIconFor('something-new-42')).toBe('medal')
  })

  it('has one colour per tier, all different', () => {
    const colours = (['basique', 'avancé', 'difficile', 'légendaire'] as const).map(tierColor)
    expect(new Set(colours).size).toBe(4)
  })
})
