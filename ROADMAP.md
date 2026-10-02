# Prediction: the future of The Seed in 10 steps

> Written by SYSTEM for V on 2026-10-02, updated at every scan (norm `NORME.md` §7).
> Each step says **where we go**, **what we automate** (small, medium, big) and gives a ready-to-
> paste **prompt** to start the working session. Detailed tasks live in the registry
> `agents/backlog.json` (`make automation-sync` → console, "Automation" section).
>
> The common thread: make **absolutely everything automatic**, until AI agents and MCP servers do,
> under V's control, the work V and SYSTEM do today.

## Where we stand (2026-10-02, evening)

- **Back**: contracts (11, 336 tests, 100 % coverage), the full game API, on-chain marketplace,
  indexer, on-chain polls and achievements, background jobs: about **50 %** of the target.
- **Front**: 2D Expo game (V1, the market in V2), web tool, console V2 with the 3D chain and
  wallets: about **30 %**.
- **Automation**: `make all-up` and a 2-hour routine (backup, POC, GitHub, fast-forward of `main`,
  public showcase, norms scan), a registry with a priority model, an MCP server and two agents
  (issues, polls); the SYSTEM autopilot exists but is off.

---

## Step 1: clean foundations (done)

One branch, written norms, an automation registry in the database, a public showcase.
- Small: `make bootstrap` / `make all-up` (everything in one command), automatic ABI export.
- Small: `make public-sync` (allowlisted showcase), `make automation-sync` (registry → database).
- **Done when**: a new session starts with `make all-up` and reads everything in `NORME.md`.

## Step 2: the front catches up with the back (in progress)

**V2** graphics (design tokens in `sdk/`, synced to the game and the web), market screens, console
V2 (players, market, wallets in the 3D, tools, agentic tasks).
- Medium: `make sdk-sync` copies the shared tokens and rules into each client.
- Big: every server feature has its screens (market, POT transfers, automations, dev notes).
- Big: the Village becomes a floating island with a frightening tower (#12); older screens move to
  the V2 kit.
- **Done when**: no player-facing API route is without a screen.

> Prompt: "Step 2 of `prompts/PREDICTIONS.md`. List the API routes without a screen, build the
> screens with the SDK's V2 tokens, screenshots in `docs/screenshots/`, tests, PR."

## Step 3: the project maintains itself (in progress)

- Done: `make security-scan`, `make test-stats`, contribution POC computed from commits, a
  background task settling ended auctions, Dependabot, the 2-hour routine, `make norms-scan`.
- To do: `make status-report` (handoff numbers), automatic screenshots (Playwright), GitHub
  comments on issues and PRs generated from the handoff, SYSTEM dev notes published by the routine.
- **Done when**: a SYSTEM session no longer does any repetitive task by hand.

> Prompt: "Step 3 of `prompts/PREDICTIONS.md`: take the registry's `step: 3` tasks one by one,
> with preview, log and tests."

## Step 4: the first agents (local, started)

- Done: an **MCP server** reading and updating the automation registry and the `agent_runs` log;
  the issues agent and the polls follow-up agent (an ended poll becomes a GitHub issue, V keeps the
  veto).
- Big: a **reward distributor agent** (within the MintManager's budget), each agent with a bounded
  mandate account (ERC-4337), revocable by V; the autopilot turned on by V.
- **Done when**: a voted poll becomes a PR without human action, and V keeps the veto.

> Prompt: "Step 4: the reward distributor agent, mandate in `agents/agents.json`, each run in
> `agent_runs`, the console shows the agentic tasks."

## Step 5: 3D

3D battles (three.js, then a dedicated engine if needed) plugged into the existing battle log: the
server decides, the 3D replays. The SDK carries the data models shared by 2D, web and 3D.
- **Done when**: a battle replays in 3D on the web and on mobile.

> Prompt: "Step 5: replay a logged battle in 3D (three.js) from the SDK, with the V2 tokens,
> keeping 2D as a fallback."

## Step 6: a real mobile game

Automatic mobile builds (Expo EAS), offline and manual battles, PvP arena, guild raids. A balance
simulation run on every content change (V: long progression).

> Prompt: "Step 6: asynchronous PvP arena and manual battle, balance simulation in CI, a test
> mobile build."

## Step 7: the public testnet

Base Sepolia with a real signer for SYSTEM (KMS or a budgeted wallet, with a nonce lock), one-gesture
deployment (rehearsal, deploy, verify, report), audit preparation.

> Prompt: "Step 7: full testnet pipeline, real signer, deployment report, audit checklist.
> Nothing without V's go."

## Step 8: the open economy

Wallet-to-wallet POT transfers, items and runes as ERC-1155 sold on the market, guild content with
chests, fees and emissions set by polls.

## Step 9: governance by the players

Polls drive the content; agents apply the votes (automatic PRs), V keeps the veto; everything is
public on chain.

## Step 10: the ecosystem

A public SDK, community modules, pluggable AI agents (game spec §8 sexies), a public stable version,
mainnet **after an audit** and on V's decision. Then The Seed OS.

---

## How this prediction lives

1. Each SYSTEM session runs a **scan** (code, visual, norms) and adds what it saw as repetitive to
   the registry `agents/backlog.json` and here (the relevant step).
2. Selected tasks go to the game spec (§8 octies), then to an issue.
3. `make automation-sync` loads the registry into the database: the console shows it, the agents
   read it through the MCP server.
