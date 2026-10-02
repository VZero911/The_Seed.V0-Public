# sdk — what every client of The Seed shares

The single source of what the Expo game (mobile and web), the web tool and console, and the future
3D client have in common (game spec §8 nonies, `NORME.md` §10).

| File | What | Used by |
|---|---|---|
| `src/tokens.ts` | **Design tokens V2** ("dark magic video game"): surfaces, text, brand gold and violet, the 8 elements (base, glow, tint), rarities, stars, currencies, spacing, radii, fonts, glows, motion; `hexToNumber` for three.js; WCAG `contrast` | game (`src/ui/v2.tsx`, marketplace), web |
| `src/market.ts` | Marketplace rules, identical to the contract (ADR 0024): fee, seller proceeds, next minimum bid, anti-snipe end, duration presets, `formatPot` / `parsePot` | game marketplace screens, web |

## Use

```bash
make sdk-sync        # copies src/tokens.ts and src/market.ts into game/src/sdk and web/src/sdk
cd sdk && npm test   # 12 tests: colours valid, WCAG contrast of text and elements, rules = contract
```

The copies carry a `GENERATED` header: edit `sdk/src` only, then `make sdk-sync`. Copies rather than
a package link because Expo's bundler does not import outside `game/`.

## Next (prediction, steps 2 and 5)

- Typed API client and EIP-712 builders shared by the game and the web tool.
- The data models of the 3D client (battle replay from the server's log), so 2D, web and 3D read
  the same structures.

---

*© 2026 V (VZero911). Built by V with SYSTEM, an AI agent powered by Claude (Anthropic). See [NOTICE](../NOTICE.md).*
