<div align="center">

# 🌱 The Seed — showcase

**A monster-collecting game in the spirit of *Summoners War*, bigger, on the blockchain, with AI
agents.** Your identity is a wallet, trades between players go through smart contracts, and every
action is signed for free.

<img src="screenshots/30-chain-3d.png" alt="The chain in 3D" width="880" />

</div>

This repository is the **public showcase** of the project: the interface, the graphics, the 3D
view of the blockchain and the roadmap. The full code (contracts, server, security) stays private
for now; a stable public version will come later. It is updated automatically every 2 hours.

## See

| | |
|---|---|
| 🎮 Game screenshots (summons, battles, runes, marketplace…) | [`screenshots/`](screenshots/) |
| ⛓️ The chain in 3D (standalone demo, three.js) | [`showcase/chain-3d/index.html`](showcase/chain-3d/index.html) |
| 🎨 Design tokens V2, "dark magic" | [`showcase/sdk/tokens.ts`](showcase/sdk/tokens.ts), [`showcase/design/tokens-v2.html`](showcase/design/tokens-v2.html) |
| 🧩 Game UI components (React Native) | [`showcase/game-ui/`](showcase/game-ui/) |
| 🔮 The roadmap in 10 steps | [`ROADMAP.md`](ROADMAP.md) |

<p align="center">
  <img src="screenshots/04-summon-reveal.png" width="270" />
  <img src="screenshots/07-battle.png" width="270" />
  <img src="screenshots/13-monster.png" width="270" />
</p>

## 🏆 The Seed Top Contributor

The ranking of the people who build The Seed, by **POC** (Point of Contribution: earned, never
bought). SYSTEM (the AI agent) and V lead it, rewarded every 2 hours for each commit. Someday,
someone may catch up.

## 🌍 In real life: why tokenize assets

The game proves what a blockchain brings to real assets. **Not for today**: real value needs
audits and a legal frame first.

| In the game | In real life |
|---|---|
| A monster NFT belongs to its wallet: nobody can take or copy it | Verifiable ownership of a title, a ticket, a certificate |
| The marketplace holds the asset and the payment in escrow; 2.5 % of each sale goes to the system's creator (royalties) | Trades without a trusted middleman, public fees and royalties |
| Every sale is recorded on-chain | Traceability: provenance, authenticity |
| The rules are written in the contract | Programmable royalties, rights, deadlines |
| On-chain polls, with V's veto | Verifiable community governance |

## 🖤 Next: The Seed OS

*Same seed, another soil.* An operating system, from an Arch Linux base, where the wallet is the
identity and the AI is part of the system. **Nothing more for now.** 👁️

## Stack

Solidity + Foundry (OpenZeppelin Upgradeable, UUPS) · Python 3.12 + FastAPI + PostgreSQL ·
Expo / React Native · React + Vite + wagmi + three.js · TypeScript strict · AI agents and MCP.

<p align="center"><img src="screenshots/31-design-tokens-v2.png" width="640" /></p>

A project by **V** ([@VZero911](https://github.com/VZero911)), built with **SYSTEM** (Claude Code).

---

*© 2026 V (VZero911). Built by V with SYSTEM, an AI agent powered by Claude (Anthropic). See [NOTICE](NOTICE.md).*
