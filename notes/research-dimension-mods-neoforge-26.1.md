# Research: dimension mods from Beyond Depth → NeoForge 26.1.2

Research date: 2026-11-25. Question: do The Undergarden, Deeper and Darker,
Voidscape and Cracker's Wither Storm Mod have builds for Minecraft 26.1.2 /
NeoForge 26.1.2.97, what is their status/dependencies/compatibility, and do
their common compat addons exist for 26.1?

**Assumption stated**: the brief said "read-only / do not modify files" but also
demands a saved findings file. This file is *new*, in `notes/` (repo-only
folder, not in the packwiz export), and nothing else was touched.

---

## TL;DR verdicts

| Mod | NeoForge 26.1.2 available | Newest supported (NeoForge) | Status |
|---|---|---|---|
| The Undergarden | **YES** (0.9.8 beta, 2026-08-24) | 26.1.2 | Active |
| Deeper and Darker | **NO** (newest NeoForge: 1.21.1 v1.4.1) — 26.1 port in progress, unreleased | 1.21.1 | Active (dev effort on Fabric 2.0 rewrite) |
| Voidscape (Tamaized) | **YES** (1.11.660, 2026-11-25) | 26.1.2 | Very active |
| Cracker's Wither Storm | **NO** (newest: 1.20.1 Forge/NeoForge) | 1.20.1 | Stalled for new MC versions |

---

## 1. The Undergarden (mod id `undergarden`, CF 379849, Modrinth `the-undergarden`)

**NeoForge 26.1.2 available: YES — `The_Undergarden-26.1.2-0.9.8.jar` (beta channel, 2026-08-24).**

- Modrinth version API lists 0.9.8 with `"game_versions":["26.1.2"]`,
  `"loaders":["neoforge"]`, `"version_type":"beta"`, `"dependencies":[]`.
  0.9.7 (2026-07-14) is the previous 26.1.2 build. Source:
  https://api.modrinth.com/v2/project/the-undergarden/version
  ("The Undergarden 0.9.8 … game_versions [\"26.1.2\"] … loaders [\"neoforge\"]").
  CurseForge files page agrees (0.9.8 / 0.9.7, "26.1.2, NeoForge", marked B=beta):
  https://curseforge.com/minecraft/mc-mods/the-undergarden/files/all
- Note both 26.1.2 builds are on the **beta** channel (all Undergarden releases are).
- **Status: actively maintained.** Repo https://github.com/quek04/undergarden has
  a `26.1` branch; latest commits 2026-11-15 (`d901b87`, "fix #264") and
  2026-10-14 (merge of "Fix infection effect not working with shaders", PR #263).
  Source: https://api.github.com/repos/quek04/undergarden/commits
- **Required dependencies: none** (Modrinth `dependencies: []` on every version).
- **Dimension**: `undergarden:undergarden` (ATM9 dimension list:
  https://github.com/AllTheMods/alltheguides/blob/Gitbook/all-the-mods-9/dimension-list.md
  — "undergarden:undergarden").
- **Portal mechanic — claim verified**: nether-portal-shaped vertical rectangular
  frame built from the stone-bricks family, activated with a **Catalyst**
  (not flint & steel). The Undergarden wiki: "built as a vertical, rectangular
  frame of either Stone [Bricks]…"
  (https://the-undergarden-mod.fandom.com/wiki/Undergarden_portal); guide:
  "You get there through a portal made of Stone Bricks, which you light with a
  Catalyst instead of Flint and Steel"
  (https://minecraft-guides.com/mod/the-undergarden). The 0.9.5 changelog
  ("Added more valid portal frame blocks – Cracked Stone Bricks, Chiseled Stone
  Bricks, Cracked Deepslate Bricks, Cracked Deepslate Tiles") and 0.8.20
  ("Catalyst can now be used on any inner face of the portal frame") corroborate
  (https://api.modrinth.com/v2/project/the-undergarden/version).
- **Known compatibility problems** (relevant to a kitchen-sink pack):
  - **Jade plugin broken on 26.1.2 with Jade 26.1.12** — issue #264: "The
    Undergarden's Jade plugin fails to load on both the client and the dedicated
    server; Jade then reloads without it … compiled against an older Jade API"
    (https://github.com/quek04/undergarden/issues/264, opened 2026-10-20 against
    `The_Undergarden-26.1.2-0.9.8`). Fixed in git 2026-11-15 (commit d901b87)
    but **not yet in any released build** — 0.9.8 remains the newest release.
    Expect log spam / missing Jade tooltips until 0.9.9 ships, or build from source.
  - Shaders interaction: infection overlay broke with Iris/shaders; fixed via
    PR #263 merged 2026-10-14 (also unreleased as of 2026-11-25). Relevant since
    this pack ships shaderpacks.
  - Historical (fixed): creative-inventory crash with Aether (0.9.3 changelog),
    Create-train portal compatibility (0.9.2 changelog).
- **Popularity / regard**: 3.1M downloads and 477 followers on Modrinth
  (https://modrinth.com/mod/the-undergarden); 235K downloads for the 0.9.8 file
  alone on CurseForge. Well-regarded long-running dimension mod (3+ years),
  218 GitHub stars. *(Opinion: worth integrating — the only target mod with a
  shipped 26.1.2 build besides Voidscape, and the outstanding issues are minor.)*

## 2. Deeper and Darker (mod id `deeperdarker`, CF 659011, Modrinth `deeperdarker`)

**NeoForge 26.1.2 available: NO (newest supported: 1.21.1 — `deeperdarker-neoforge-1.21.1-1.4.1.jar`, 2026-06-05).**

- Modrinth version API: only NeoForge builds are 1.4 / 1.4.1 for **1.21.1**
  (`"[NeoForge 1.21.1] 1.4.1"`, dependencies `[]`). The newest uploads overall
  are `2.0.0s-beta.1` (2026-11-22) which are **Fabric-only** (1.21.1/1.21.2 and
  1.20.1). Source: https://api.modrinth.com/v2/project/deeperdarker/version
- CurseForge files page game-version filter tops out at 1.21.1
  ("1.21.1, 1.21, 1.20.4, … 1.19"): https://www.curseforge.com/minecraft/mc-mods/deeperdarker/files/all
- GitHub releases confirm: latest release tag v1.4.1 targets branch
  `neoforge-1.21`, asset `deeperdarker-neoforge-1.21.1-1.4.1.jar`
  (https://api.github.com/repos/KyaniteMods/DeeperAndDarker/releases).
- **A NeoForge 26.1 port is in progress but unpublished**: the repo has branches
  `neoforge-26.1` and `l10n_neoforge-26.1`
  (https://api.github.com/repos/KyaniteMods/DeeperAndDarker/branches); code
  commits on `neoforge-26.1` run to 2026-06-24 ("remove old armor material
  registry"), with a Crowdin translation merge 2026-11-22. No build is published
  on CF, Modrinth, or GitHub releases as of 2026-11-25.
  (https://api.github.com/repos/KyaniteMods/DeeperAndDarker/commits?sha=neoforge-26.1)
- **Status: active but split**. Multi-loader team (README credits "NewJumper:
  NeoForge & Forge Developer; AndroidDr: Fabric Developer",
  https://github.com/KyaniteMods/DeeperAndDarker). The current dev effort is the
  Fabric-first "2.0.0s" rewrite; the NeoForge line (1.4.x) last shipped Jun 2026.
- **Required dependencies (NeoForge build)**: none declared (Modrinth
  `dependencies: []` for 1.4/1.4.1). Fabric builds require Fabric API etc.
- **Dimension**: `deeperdarker:otherside` (ATM9 dimension list, URL above).
- **Portal mechanic — claim verified**: the large **reinforced deepslate archway
  at the centre of an Ancient City** (opening 20×6 blocks), activated by using a
  **Heart of the Deep** (dropped by the Warden) on the frame; the Heart is
  consumed; not lit with flint and steel.
  "Access begins at an Ancient City portal frame. After clearing the portal
  opening and obtaining the Heart of the Deep from the Warden, use the heart on
  the reinforced deepslate frame to activate the [portal]"
  (https://deeperanddarkermod.com/guides/deeper-and-darker-mod-otherside);
  "The frame is the large archway of Reinforced Deepslate at the heart of the
  city, with an opening 20 blocks wide and 6 blocks tall"
  (https://minecraft-guides.com/mod/deeper-and-darker/wiki/otherside-portal);
  official wiki: "The portal to the Otherside is located at the center of all
  ancient cities. These portals are encompassed by reinforced deepslate"
  (https://github.com/KyaniteMods/DeeperAndDarker/wiki/Starting-Guide).
  Caveat: the *unreleased* Fabric 2.0.0s rewrite replaces this with an
  "Otherside fire striker" crafted from a sculk bone shard **sheared** from the
  Warden (no kill needed) — 2.0.0s-alpha changelog,
  https://api.modrinth.com/v2/project/deeperdarker/version.
- **Known compatibility problems** (from release notes):
  - 1.3.3: "fixed Otherside dimension effects overlapping with the Nether's -
    #386" — dimension-effect clashes with other dimension mods were real.
  - 1.3.4: "fixed improper Otherside dimension effects registration - #389"
    (server crash on startup).
  - 1.3.5: "fixed trying to roll loot tables for Crystallized Amber during world
    gen - #454" — **server freeze during worldgen**, fixed 2025-04.
  - 1.4.1: "fixes a server crash for improperly generated Crystallized Amber
    blocks - #521".
  (All: https://api.github.com/repos/KyaniteMods/DeeperAndDarker/releases)
- **Popularity / regard**: Modrinth 16.5M downloads, 2.5K followers
  (https://modrinth.com/mod/deeperdarker); CurseForge page displays "97.0M
  Downloads" (https://www.curseforge.com/minecraft/mc-mods/deeperdarker).
  *(Opinion: the most popular of the four by far, but the NeoForge 26.1 story is
  "wait for the port" — a published `neoforge-26.1` branch suggests it may land,
  but nothing is releasable today.)*

## 3. Voidscape (mod id `voidscape`, CF 251730 / slug `voidscape`)

**Identity note**: the dimension mod with `voidscape:void` is **Tamaized's
Voidscape** on CurseForge ("Voidscape … By Tamaized",
https://www.curseforge.com/minecraft/mc-mods/voidscape), not "Voidscape by
Quarris" — no mod by that author was found. Beware a *different, unrelated*
Modrinth project also called "Voidscape" (a sci-fi space mod,
https://modrinth.com/mod/voidscape). Tamaized's is the one shipped in ATM9.

**NeoForge 26.1.2 available: YES — `Voidscape-26.1.2-1.11.660.jar` (2026-11-25), NeoForge.**

- CurseForge files page: `Voidscape-26.1.2-1.11.660.jar` uploaded **Nov 25, 2026**;
  prior 26.1.2 builds 1.10.654/1.10.653 (Sep 26, 2026), 1.10.649 (Sep 18, 2026),
  1.10.646 (Aug 29, 2026). All NeoForge.
  https://www.curseforge.com/minecraft/mc-mods/voidscape/files/all
- **Status: very active.** Repo https://github.com/Tamaized/Voidscape (1,254
  commits, source visible but "All Rights Reserved") has a `26.1` branch with
  commits **the same day**: "Fix #104", "Fix #105", "Version bump" (2026-11-25).
  (https://api.github.com/repos/Tamaized/Voidscape/commits)
- **Required dependencies: none.** `neoforge.mods.toml` on the 26.1 branch
  declares only `neoforge` `versionRange="[26.1.2,)"` as required
  (https://raw.githubusercontent.com/Tamaized/Voidscape/26.1/src/main/resources/META-INF/neoforge.mods.toml).
  So the 26.1.2 builds want NeoForge ≥ 26.1.2 — the pack's 26.1.2.97 satisfies this.
  CF description mentions built-in **Aether compatibility**.
- **Dimension**: `voidscape:void` (official wiki "Void Biome" page: "ID
  voidscape:void", https://voidscape.tamaized.com/index.php/Void_Biome; also
  ATM9 dimension list).
- **Entry mechanic — claim verified**: "To enter the Void you can either stand on
  top of Bedrock for a period of time or construct a Void Portal."
  (https://voidscape.tamaized.com/index.php/Main_Page). Community reports put
  the wait at several minutes (e.g. "I left my pc for 8 minutes and now Im in the
  underworld", https://reddit.com/r/allthemods/comments/1msiakr/; an ATM9 guide
  says ~5 minutes). The alternative craftable Void Portal is framed from Voidic
  Crystal Blocks nether-style and lit with a Charred Bone
  (https://voidscape.tamaized.com/index.php/Void_Portal). A 1.21.1 changelog
  confirms the bedrock trigger: "you must stand directly on top of Bedrock to
  teleport to the dimension. You can no longer teleport on demand"
  (https://curseforge.com/minecraft/mc-mods/voidscape/files/4745194).
- **Known compatibility problems**:
  - **Voidscape vs Ice and Fire: the report exists.** Tamaized/Voidscape issue
    #79 "Incompatible with Ice and Fire" (2024-03-26, MC 1.19.2): "the dimension
    never loads and crashes the game with Ice and Fire on/installed"
    (crash: https://pastebin.com/wjv3AMj4). Tamaized diagnosed the fault as
    **Ice and Fire's library Citadel** — "the problem is with their library mod
    'citadel' … `com.github.alexthe666.citadel.config.biome.SpawnBiomeData$SpawnBiomeEntry.matches`"
    — and closed it as "Other Mod" (2024-05-06).
    https://github.com/Tamaized/Voidscape/issues/79
    **Open question: whether this still reproduces on 26.1.2 with current
    Ice and Fire/Citadel was not verified.** If this pack adds Ice and Fire,
    test the Void dimension entry before shipping.
  - Rendering history: "Rendering Overlay Crash 1.20.1" (#85, closed Nov 2024)
    shows past overlay/render conflicts; no open rendering-mod (Embeddium/Oculus)
    incompatibilities found in a scan of the tracker (84 issues total,
    https://github.com/Tamaized/Voidscape/issues).
  - QoL caveat: "add way to disable standing on bedrock warp?" (#94) — the
    bedrock-teleport has been requested as configurable; assume it is not
    (closed May 2026). In a kitchen-sink pack, players AFK/standing on bedrock
    get involuntarily teleported — worth a wiki/quest note.
- **Popularity / regard**: 10.4M downloads on CurseForge
  (https://www.curseforge.com/minecraft/mc-mods/voidscape); shipped in ATM9, so
  familiar to kitchen-sink players. *(Opinion: lowest integration cost of the
  four — zero deps, native 26.1.2, actively fixed; the bedrock-teleport is the
  main UX consideration.)*

## 4. Cracker's Wither Storm Mod (mod id `witherstormmod`, CF 621405) — availability only

**NeoForge 26.1.2 available: NO (newest supported: 1.20.1, Forge/NeoForge).**

- CurseForge game-version filter: "1.20.1, 1.19.4, 1.19.3, 1.19.2, 1.19, 1.18.2,
  1.16.5"; loaders Forge/NeoForge; "Last Update Aug 11, 2024"
  (https://www.curseforge.com/minecraft/mc-mods/crackers-wither-storm-mod/files/all
  and …/crackers-wither-storm-mod). Modrinth shows the same top version 1.20.1
  (https://modrinth.com/mod/crackers-wither-storm-mod/versions).
- **Status: stalled on new MC versions; not officially discontinued.** A repo
  collaborator said in Jul 2025 the 1.21 port "will be on NeoForge … Next few
  months hopefully" (https://github.com/nonamecrackers2/crackers-wither-storm-mod/discussions/2280);
  as of Nov 2026 users are still asking (comments May–Aug 2026 on the same
  thread). A "1.21.1 NeoForge?" request (issue #2545) was closed as **not
  planned / Invalid** (2025-10-26):
  https://github.com/nonamecrackers2/crackers-wither-storm-mod/issues/2545.
- Known compat (for the 1.20.1 line only): "Older versions of Modern Fix are
  known to crash with Cracker's Wither Storm Mod. Please use versions at or
  above 5.18.0"
  (https://github.com/nonamecrackers2/crackers-wither-storm-mod/wiki/Known-Compatibility-Issues).
- Popularity: 11.7M CF downloads, 2M Modrinth. No 26.1 path — exclude from the
  26.1.2 pack (unless/until a port appears).

---

## Compat addons commonly paired with these mods

| Addon | Purpose | Newest build | NeoForge 26.1? |
|---|---|---|---|
| [NoCube's] Undergarden Delight | Farmer's Delight × Undergarden foods | `undergardendelight-2.0.2-neoforge-1.21.1.jar` (CF files page) | **NO** — 1.21.1 max |
| Boss Checklist – Voidscape Compatibility | Boss Checklist entries for Voidscape bosses | `Boss Checklist - Voidscape Compatibility 1.21.1 1.0.0 NeoForge.jar` (2026-02-04); only 3 files ever (1.21.1, 1.20.1 ×2), ~4K downloads | **NO** — 1.21.1 max |
| Deeper and Darker: Spellbooks | Iron's Spells × D&D addon | exists on CF (project page updated 2026-10) | not verified; versions seen were 1.21.1-era |

- Undergarden Delight listings:
  https://curseforge.com/minecraft/mc-mods/undergarden-delight/files/all and
  https://modrinth.com/mod/undergarden-delight (latest "1.2.1 … NeoForge …
  1.21.1" on Modrinth; 2.0.2 on CF).
- Boss Checklist – Voidscape Compatibility:
  https://www.curseforge.com/minecraft/mc-mods/boss-checklist-voidscape-compatibility/files/all
  (game versions "1.21.1, 1.20.1"; author theexiiedfeiiow_).
- **Gating note (opinion/fact mix)**: Undergarden Delight also needs Farmer's
  Delight, which itself has no official 26.1 build — however *unofficial*
  NeoForge ports exist for 26.1.2 ("Farmer's Delight: NeoForge",
  https://curseforge.com/minecraft/mc-mods/farmers-delight-modern-neoforge —
  "Minecraft 1.21.11 / 26.1.2 / 26.2 / 26.3"; also "Farmer's Delight 26 Neo
  Ver", https://curseforge.com/minecraft/mc-mods/farmers-delight-26-neo-ver).
  Even so, Undergarden Delight itself would need a rebuild against the 26.1
  Undergarden/FD APIs — none exists today.

---

## Conflicting / unverified evidence

- **Deeper and Darker CurseForge download count**: the CF project page renders
  "97.0M Downloads" while Modrinth shows 16.5M. Both figures are as-displayed;
  97.0M is plausible for CF but was not independently confirmed.
- **Voidscape "by Quarris"**: the brief's attribution contradicts every source
  found (CF credits Tamaized; the wiki is voidscape.tamaized.com). Treated as a
  brief error; the correct project is CF 251730 / Tamaized.
- **Voidscape vs Ice and Fire on 26.1.2**: the only crash report found is from
  MC 1.19.2 (2024) and was blamed on Citadel, not Voidscape. No report exists
  for 1.21.x/26.1.x; reproducibility today is unknown.
- **Undergarden portal wiki page** (fandom) returned bot_blocked on direct fetch;
  quoted from search snippet plus two independent guides (minecraft-guides.com,
  forgebase.johnhalls.com) and the mod's own changelogs.
- Exact Voidscape bedrock-wait duration is community folklore (~5–8 min); the
  official wiki only says "for a period of time".
