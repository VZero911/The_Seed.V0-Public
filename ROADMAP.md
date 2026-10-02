# Prédiction — l'avenir de The Seed en 10 étapes

> Rédigée par SYSTEM pour V le 2026-10-02, à mettre à jour à chaque scan (norme `NORME.md` §7).
> Chaque étape dit **où on va**, **ce qu'on automatise** (petit, moyen, gros) et donne un
> **prompt** prêt à coller pour lancer la session de travail. Les tâches détaillées vivent dans le
> registre `agents/backlog.json` (`make automation-sync` → console, section « Automatisation »).
>
> Le fil rouge : rendre **absolument tout automatique**, jusqu'à ce que des agents IA et des
> serveurs MCP fassent, sous le contrôle de V, le travail que V et SYSTEM font aujourd'hui.

## Où on en est (2026-10-02)

- **Back** : contrats (11, 336 tests, couverture 100 %), API complète du jeu, marketplace on-chain,
  indexer, sondages et succès on-chain : environ **50 %** de la cible.
- **Front** : jeu Expo en 2D (V1), outil web, console V1 avec vue 3D : environ **25 %**.
- **Automatisation** : cibles `make`, CI, quelques outils dev ; aucun agent ne tourne encore.

---

## Étape 1 — Fondations propres (en cours)

Une branche, des normes écrites, un registre d'automatisation en base, une vitrine publique.
- Petit : `make bootstrap` (tout lancer en une commande), export des ABIs automatique.
- Petit : `make public-sync` (vitrine par liste blanche), `make automation-sync` (registre → base).
- **Fini quand** : une session neuve démarre avec `make bootstrap` et lit tout dans `NORME.md`.

> Prompt : « Lis `NORME.md` et `docs/HANDOFF.md`. Termine l'étape 1 de `prompts/PREDICTIONS.md` :
> `make bootstrap` idempotent, ABIs exportées par la pile, tests verts, doc et PR à jour. »

## Étape 2 — Le front rattrape le back

Graphismes **V2** (design tokens dans `sdk/`, synchronisés vers le jeu et le web), écrans du
marché, console V2 (joueurs, marché, portefeuilles dans la 3D, outils).
- Moyen : `make sdk-sync` copie les tokens et les règles partagées dans chaque client.
- Gros : chaque fonctionnalité serveur a ses écrans (marché, échanges de POT, automatisations).
- **Fini quand** : aucune route de l'API utile au joueur n'est sans écran.

> Prompt : « Étape 2 de `prompts/PREDICTIONS.md`. Liste les routes de l'API sans écran, fais les
> écrans avec les tokens V2 du SDK, captures dans `docs/screenshots/`, tests, PR. »

## Étape 3 — Le projet s'entretient de lui-même

- Petit : `make security-scan` (rapport unique), `make status-report` (chiffres de la passation),
  `make test-stats` (doublement des tests), POC de contribution calculés depuis les commits.
- Moyen : tâche de fond qui règle les enchères terminées ; captures automatiques (Playwright) ;
  routine GitHub (commentaires d'issues et PR générés depuis la passation) ; Dependabot.
- **Fini quand** : une session de SYSTEM ne fait plus aucune tâche répétitive à la main.

> Prompt : « Étape 3 de `prompts/PREDICTIONS.md` : prends les tâches `step: 3` du registre,
> une par une, avec aperçu, journal et tests. »

## Étape 4 — Les premiers agents (en local)

- Moyen : un **serveur MCP** qui lit et met à jour le registre d'automatisation et le journal
  `agent_runs` (les agents savent quoi faire et rendent compte).
- Gros : **agent de suivi des sondages** (lit les votes clos, ouvre une PR, attend le veto de V)
  et **agent distributeur de récompenses** (dans le budget du MintManager), chacun avec un compte
  à mandat borné (ERC-4337), révocable par V.
- **Fini quand** : un sondage voté devient une PR sans intervention humaine, et V garde le veto.

> Prompt : « Étape 4 : serveur MCP du registre (`MCP/`), puis l'agent de suivi des sondages en
> local, mandat dans `agents/agents.json`, chaque exécution dans `agent_runs`. »

## Étape 5 — La 3D

Combat en 3D (three.js, puis moteur dédié si besoin) branché sur le journal de combat existant :
le serveur décide, la 3D rejoue. Village devenu île flottante avec la tour (#12). Le SDK porte les
modèles de données communs au 2D, au web et à la 3D.
- **Fini quand** : un combat se rejoue en 3D sur le web et sur mobile.

> Prompt : « Étape 5 : rejoue un combat du journal en 3D (three.js) depuis le SDK, avec les
> tokens V2, en gardant le 2D comme repli. »

## Étape 6 — Un vrai jeu mobile

Builds mobiles automatiques (Expo EAS), combats hors ligne et manuels, arène PvP, raids de guilde.
Simulation d'équilibrage relancée à chaque changement de contenu (V : progression longue).

> Prompt : « Étape 6 : arène PvP asynchrone et combat manuel, simulation d'équilibrage dans la
> CI, build mobile de test. »

## Étape 7 — Le testnet public

Base Sepolia avec un vrai signataire pour SYSTEM (KMS ou portefeuille à budget), déploiement en un
geste (répétition, déploiement, vérification, rapport), préparation de l'audit.

> Prompt : « Étape 7 : pipeline testnet complet, signataire réel, rapport de déploiement, liste
> d'audit. Rien sans l'accord de V. »

## Étape 8 — L'économie ouverte

Échanges de POT de portefeuille à portefeuille, objets et runes en ERC-1155 vendus au marché,
contenu de guilde avec coffres, frais et émissions réglés par les sondages.

## Étape 9 — La gouvernance par les joueurs

Les sondages pilotent le contenu ; les agents appliquent les votes (PR automatiques), V garde le
veto ; tout est public sur la chaîne.

## Étape 10 — L'écosystème

SDK public, modules communautaires, agents IA connectables (cahier des charges §8 sexies),
version stable publique, mainnet **après audit** et sur décision de V.

---

## Comment cette prédiction vit

1. Chaque session de SYSTEM fait un **scan** (code et visuel) et ajoute ce qu'elle a vu de
   répétitif au registre `agents/backlog.json` et ici (étape concernée).
2. Les tâches retenues passent au cahier des charges (§8 octies), puis en issue.
3. `make automation-sync` charge le registre en base : la console l'affiche, les agents (étape 4)
   le liront par le serveur MCP.
