# Research: Enhanced Falling Trees (add) + Theurgy/Occultism removal verification

**Date:** 2026-11-25 · **Pack:** Craftoria 2 v0.11.0 (MC 26.1.2, NeoForge 26.1.2.97, packwiz, CurseForge metadata mode)

All hashes/IDs below were verified against the Modrinth API, the CurseForge file listing,
the mod's own `neoforge.mods.toml` (extracted from the actual jar), and the GitHub source on
the `port/26.1` branch (the branch matching the shipped 26.1.2 jar). Nothing is guessed.

---

## Section A — Enhanced Falling Trees: metadata

| Field | Value |
|---|---|
| Display name | Enhanced Falling Trees |
| Modrinth project ID | `UJMd74i4` |
| Slug | `enhanced-falling-trees` |
| Author | `addavriance` (Modrinth user `3ViWWrzm`, sole owner; CF member id 102402749) |
| License | MIT |
| Sources | https://api.modrinth.com/v2/project/enhanced-falling-trees · https://api.modrinth.com/v2/project/enhanced-falling-trees/members |
| GitHub | https://github.com/addavriance/EnhancedFallingTrees (default branch `port/26.2`; the 26.1.2 jar's source is branch `port/26.1`) |
| Sides | `client_side: required`, `server_side: required` (Modrinth); all `neoforge.mods.toml` deps `side="BOTH"` → **packwiz `side = "both"`** |

### CurseForge listing — exists, same jar bytes

- CF project ID **1078653** (`https://www.curseforge.com/minecraft/mc-mods/enhanced-falling-trees`).
- Matching NeoForge 26.1.2 file: **file ID 9735093**, display "Enhanced Falling Trees 0.8.0-26.1.2+neoforge",
  filename `efallingtrees-0.8.0-26.1.2-neoforge.jar`, type `release`, 1,435,579 bytes, uploaded 2026-11-21T15:54:31Z.
  Source: https://api.cfwidget.com/minecraft/mc-mods/enhanced-falling-trees
- **Byte-identical to the Modrinth jar**: downloaded from the CF CDN
  (`https://mediafilez.forgecdn.net/files/9735/93/efallingtrees-0.8.0-26.1.2-neoforge.jar`) and hashed locally:
  - sha1 `1c57c8fa532559ffda1b1b1702a0f088ec0f6302` ✔ (same as Modrinth's)
  - sha512 `3405f0d7469ea734db8eddb2ecbfb93e899bbe41b22c5b1540631107740e9920c1924719294cc98b1424e8b5ac9c16d2d4bb3611fc54b17538cfe7c5483a62ee` ✔
- Only the *filename* differs (`-neoforge` on CF vs `+neoforge` on Modrinth — CF sanitizes `+`).

### Latest NeoForge / MC 26.1.2 build (0.8.0, release)

Source: https://api.modrinth.com/v2/project/enhanced-falling-trees/version?loaders=%5B%22neoforge%22%5D&game_versions=%5B%2226.1.2%22%5D

| Field | Value |
|---|---|
| Version number | `0.8.0-26.1.2+neoforge` |
| Modrinth version ID | `iJUikHdM` (file ID `FWl8HOp1`) |
| Filename (Modrinth) | `efallingtrees-0.8.0-26.1.2+neoforge.jar` |
| sha1 | `1c57c8fa532559ffda1b1b1702a0f088ec0f6302` |
| sha512 | `3405f0d7469ea734db8eddb2ecbfb93e899bbe41b22c5b1540631107740e9920c1924719294cc98b1424e8b5ac9c16d2d4bb3611fc54b17538cfe7c5483a62ee` |
| Released | 2026-11-21T15:36:18Z (type: **release**; the older 0.7.1-26.1.2 is a beta) |
| Dependencies (Modrinth API) | **required:** Cloth Config API (`9s6osm5g`). No optional project deps listed. |
| Jar `neoforge.mods.toml` | `modId="efallingtrees"`, version `0.8.0-26.1.2+neoforge`; requires `neoforge [26.1,26.2)`, `minecraft [26.1,26.2)`, `cloth_config [11.1.106,)` — all `side="BOTH"`. Extracted from the downloaded CF jar. |

Notes:
- The CF description badge "Architectury API REQUIRED" is stale/wrong for the NeoForge build — the jar's own
  `neoforge.mods.toml` declares only `cloth_config` as a mod dependency. The mod *uses* Architectury as a
  build platform but doesn't ship/declare it as a NeoForge runtime dep.
- Pack already contains Cloth Config: `cloth-config-26.1.154.jar` (≥ 11.1.106 — the version scheme moved to
  MC-based numbering in the 26.x line, 26.1.154 satisfies `[11.1.106,)`).
- Jade compat built in: `compat/Jade.java` registers a `@WailaPlugin` that hides the falling-tree entity
  tooltip (pack has Jade). Source: https://github.com/addavriance/EnhancedFallingTrees/blob/port/26.1/common/src/main/java/me/adda/enhanced_falling_trees/compat/Jade.java

### Ready-to-write packwiz `.pw.toml` (CurseForge metadata mode — preferred, exact same file as Modrinth)

Save as `mods/enhanced-falling-trees.pw.toml`:

```toml
name = "Enhanced Falling Trees"
filename = "efallingtrees-0.8.0-26.1.2-neoforge.jar"
side = "both"

[download]
hash-format = "sha1"
hash = "1c57c8fa532559ffda1b1b1702a0f088ec0f6302"
mode = "metadata:curseforge"

[update]
[update.curseforge]
file-id = 9735093
project-id = 1078653
```

Modrinth-mode alternative (if ever needed; same jar bytes, different filename):

```toml
name = "Enhanced Falling Trees"
filename = "efallingtrees-0.8.0-26.1.2+neoforge.jar"
side = "both"

[download]
hash-format = "sha1"
hash = "1c57c8fa532559ffda1b1b1702a0f088ec0f6302"
mode = "metadata:modrinth"

[update]
[update.modrinth]
mod-id = "UJMd74i4"
version = "iJUikHdM"
```

Bookkeeping per pack convention (AGENTS.md "Adding a mod" steps 2–3):

- `MODLIST.md` bullet:
  `  * [efallingtrees-0.8.0-26.1.2-neoforge.jar](https://www.curseforge.com/minecraft/mc-mods/enhanced-falling-trees/files/9735093) (by [addavriance](https://www.curseforge.com/members/addavriance/projects))`
- `config/crash_assistant/modlist.json` (UTF-8 BOM — preserve; entry keyed by jar filename, fields match
  the pack's existing entries, e.g. the Neo Vitae one):

  ```json
  "efallingtrees-0.8.0-26.1.2-neoforge.jar": {
    "jarName": "efallingtrees-0.8.0-26.1.2-neoforge.jar",
    "modId": "efallingtrees",
    "name": "Enhanced Falling Trees",
    "version": "0.8.0-26.1.2+neoforge",
    "curseForgeHash": 3710864500,
    "modrinthHash": "1c57c8fa532559ffda1b1b1702a0f088ec0f6302"
  }
  ```

  `curseForgeHash` is the CF murmur2 fingerprint (normalized bytes, seed 1) — computed locally from the
  exact jar, algorithm validated against the pack's existing Neo Vitae entry (`neovitae-26.1.2-1.1.15.jar`
  → 1272627339, matches). `version` follows the jar's `neoforge.mods.toml` version string, matching how
  the Neo Vitae entry (mods.toml `version="1.1.15"`) is recorded.
- Then `packwiz refresh` (repo root).

---

## Section B — Config requirements & tree detection

Sources (branch `port/26.1`, which matches the shipped jar's class list exactly):
- `config/common/FilterConfig.java`, `FeaturesConfig.java`, `PhysicsConfig.java`, `LimitationsConfig.java`, `TreeBreakingConfig.java`, `CommonConfig.java`, `ClientConfig.java`, `FallingTreesConfig.java`
- `trees/DefaultTree.java`, `api/TreeType.java`, `api/TreeRegistry.java`, `event/EventHandler.java`
- shipped jar's `assets/efallingtrees/lang/en_us.json` (all config keys present)
All under `https://raw.githubusercontent.com/addavriance/EnhancedFallingTrees/port/26.1/common/src/main/java/me/adda/enhanced_falling_trees/...`

⚠️ The stale `master` branch describes the 1.20-era code; don't cite it.

### Config file name & format

**JSON, not TOML.** Cloth Config `AutoConfig` + `GsonConfigSerializer` (code: `FallingTreesConfig.java`):

- `config/efallingtrees_common.json` — `@Config(name = "efallingtrees_common")`, synced client→server via `ConfigPacket` on save/join
- `config/efallingtrees_client.json` — `@Config(name = "efallingtrees_client")` (animation/sound/crouch-invert settings)

For the pack: ship overrides as `defaultconfigs/efallingtrees_common.json` (pack uses Default Options,
which copies from `defaultconfigs/`); otherwise the mod's defaults apply with no file present.

### Detection model — tag-based, zero per-tree config needed

`DefaultTree` (tree type `efallingtrees:default`) answers three filters (`FilterConfig`):

- **log filter** — default `whitelistedBlockTags = ["minecraft:logs"]` (`BlockTags.LOGS`), empty `whitelistedBlocks`/`blacklistedBlocks`.
  A block falls if it is in the tag (or explicitly whitelisted) and not blacklisted.
- **leaves filter** — default `"minecraft:leaves"`; leaves with `persistent=true` (player-placed) are always excluded.
- **tool filter** — default `whitelistedItemTags = ["minecraft:axes", "c:tools/paxels"]` (0.8.0 added paxels — changelog
  "Added paxels to the default tree-felling tool filter", closing GitHub issue #13).

Tree assembly (`DefaultTree.gatherTreeStructure`): BFS from the broken log collecting **the same log block type**
(unless `features.allowMixedTrees=true`, then any whitelisted log), bounded by `limitations.maxTreeDistance` (default 7,
horizontal) and a hard-coded 32-block height. Leaves: BFS from collected logs of the first-found leaf type
(respecting the vanilla `DISTANCE` blockstate property), bounded by `limitations.maxLeavesDistance` (default 7).

Fall gate (`TreeType.allowedToFall`): `treeFallRequirements.maxAmountType=BASE_BLOCK_AMOUNT`, `maxAmount=200`
base blocks, `minTreeHeight=2`, `onlyRequiredTool=false`; sneak behaviour via `isCrouchMiningAllowed` (default `true`
= sneaking still fells; set `false` to let players mine single blocks while sneaking) and client `invertCrouchMining`.

### Default config values (all categories, shipped-jar-verified)

```jsonc
// config/efallingtrees_common.json (defaults)
{
  "isCrouchMiningAllowed": true,
  "multiplyToolDamage": true,
  "multiplyFoodExhaustion": true,
  "leafParticleLifeTimeLength": 1.0,
  "leafParticleCount": 5,
  "treeLifetimeLength": 4.0,
  "cactusLifetimeLength": 2.5,
  "bambooLifetimeLength": 2.0,
  "chorusLifetimeLength": 4.0,
  "filter": {
    "log":    { "whitelistedBlockTags": ["minecraft:logs"],    "whitelistedBlocks": [], "blacklistedBlocks": [] },
    "leaves": { "whitelistedBlockTags": ["minecraft:leaves"], "whitelistedBlocks": [], "blacklistedBlocks": [] },
    "tool":   { "whitelistedItemTags": ["minecraft:axes", "c:tools/paxels"], "whitelistedItems": [], "blacklistedItems": [] }
  },
  "limitations": {
    "maxLeavesDistance": 7, "maxTreeDistance": 7,
    "treeFallRequirements":   { "maxAmountType": "BASE_BLOCK_AMOUNT", "maxAmount": 200, "minTreeHeight": 2, "onlyRequiredTool": false },
    "bambooFallRequirements": { "maxAmountType": "BASE_BLOCK_AMOUNT", "maxAmount": 200, "minTreeHeight": 2, "onlyRequiredTool": false },
    "chorusFallRequirements": { "maxAmountType": "BASE_BLOCK_AMOUNT", "maxAmount": 200, "minTreeHeight": 2, "onlyRequiredTool": false },
    "cactusFallRequirements": { "maxAmountType": "BASE_BLOCK_AMOUNT", "maxAmount": 200, "minTreeHeight": 2, "onlyRequiredTool": false }
  },
  "features": { "disableCactusTrees": false, "disableBambooTrees": false, "disableChorusTrees": true, "allowMixedTrees": false },
  "physics": { "treeDamage": true, "damagePerBlock": 1.5, "maxDamage": 20.0, "knockback": 1.0, "leavesPush": true, "solidTrunk": true },
  "treeBreaking": { "enableBreakingSpeedModification": true, "axeSpeedMultiplier": 80, "noAxeSpeedMultiplier": 30, "isLootDropOnSingleBlock": false }
}
// config/efallingtrees_client.json (defaults): invertCrouchMining=false; soundSettings (enabled true);
// animation fall/bounce lengths per tree/bamboo/cactus/chorus type.
```

(There is no `breakMode`/`allowedLogs`-style key — the fork of Panda's Falling Trees this mod derives from
used those; Enhanced Falling Trees replaced them with the three filters above.)

### Leaves decay

Handled automatically: natural leaves are gathered with the trunk and dropped along the fall line
(`TreeType.handleDrops`); `persistent=true` leaves are left standing; leaves beyond `maxLeavesDistance`
decay via vanilla once the logs are gone. Nothing to configure for leaves beyond `filter.leaves` and
`maxLeavesDistance`. Optional polish: `treeBreaking.isLootDropOnSingleBlock=true` concentrates drops.

### Compatibility with the pack's tree mods — defaults work, verified against each mod's data

| Mod | Evidence | Verdict |
|---|---|---|
| **Biomes O' Plenty** | 26.1.2 branch `common/src/main/resources/data/minecraft/tags/block/logs.json` adds `#biomesoplenty:hellbark_logs`; `logs_that_burn.json` adds all 13 other woods (fir, pine, maple, redwood, mahogany, jacaranda, palm, willow, dead, magic, umbran, empyreal, origin_oak) — all of these land in `#minecraft:logs` transitively (vanilla `logs` includes `#logs_that_burn`); `leaves.json` adds all BOP leaves. https://github.com/Glitchfiend/BiomesOPlenty/tree/26.1.2 | ✅ auto |
| **Ecologics** | 26.1-crossplatform branch: `logs_that_burn.json` = `#ecologics:coconut_logs, maple_logs, walnut_logs, azalea_logs, flowering_azalea_logs` → in `#minecraft:logs`; `leaves.json` adds coconut/walnut/maple leaves. https://github.com/samedifferent/Ecologics/tree/26.1-crossplatform | ✅ auto (incl. coconut & walnut) |
| **Croptopia** | v4 branch: only log blocks are `croptopia:cinnamon_log/_wood` (tagged `#croptopia:cinnamon_logs` → `minecraft:logs_that_burn`); fruit trees are vanilla-oak-log trunks with `croptopia:*_crop` blocks, which Croptopia adds to `minecraft:leaves`. https://github.com/ExcessiveAmountsOfZombies/Croptopia/tree/v4 | ✅ auto; if a fruit tree ever mixes oak leaves + fruit crops, only the first leaf type drops unless `allowMixedTrees=true` |
| **Eternal Nether** | Fuzs' 26.1.x branch has **no log/leaves blocks at all** (only withered blackstone/bone/soul stone variants). https://github.com/Fuzss/eternalnether/tree/26.1.x | N/A — nothing to configure |
| **Vanilla mangrove/cherry/pale oak** | All in `#minecraft:logs`/`#minecraft:leaves` by vanilla definition; mangrove *roots* are not logs (not felled — vanilla-consistent) | ✅ auto |

No GitHub issues exist for BOP/Ecologics/Croptopia/vanilla-tree problems; the issue tracker is about
other things (HT's TreeChop co-existence #14, Fabric saplings #18, config GUI #16 — none affecting NeoForge 26.1.2).
https://github.com/addavriance/EnhancedFallingTrees/issues?q=state=all

### Performance-relevant knobs (opinion-marked recommendations)

Defaults are already conservative for a 227-mod pack: 200-block tree cap, 7-block search radius, 32-block height
cap, `leafParticleCount=5`. Recommended (opinion): keep defaults; if desired —
`isCrouchMiningAllowed=false` (escape hatch to fell single blocks by sneaking), and reduce
`leafParticleCount`/`leafParticleLifeTimeLength` on weak clients. 0.8.0 also fixed
"falling trees disappearing when their chunks unload" and a Fabric dedicated-server crash
(Modrinth 0.8.0 changelog) — one more reason to take 0.8.0 over the 0.7.1 beta.

---

## Section C — Theurgy/Occultism required dependencies vs the pack

Modrinth dependency data for **NeoForge 26.1.2** builds (same sets on the pack's pinned versions
and on the latest releases):

| Mod | Version checked | Required | Optional |
|---|---|---|---|
| Theurgy (`uOVMgoil`) | `26.1.2-neoforge-1.114.0` (pack's) and `…-1.119.0` (latest, 2026-11-16) | **GeckoLib** (`8BmcQJ2H`), **Modonomicon** (`692GClaE`) | JEI, Magic Particles Lib, Jade |
| Occultism (`sbJh4AZw`) | `26.1.2-neoforge-1.248.1` (pack's) and `…-1.266.3` (latest, 2026-11-23) | **GeckoLib**, **Modonomicon**, **Curios** (`vvuO3ImH`) | JEI, EMI, Theurgy, Magic Particles Lib |

Sources: https://api.modrinth.com/v2/project/theurgy/version?loaders=%5B%22neoforge%22%5D&game_versions=%5B%2226.1.2%22%5D
and same for `occultism`; project IDs resolved via https://api.modrinth.com/v2/projects?ids=[…].

- **SmartBrainLib / Couplings:** neither mod declares them on 26.1.2, and neither is in the pack. No orphans of that kind exist.
- Full-pack sweep (all 225 pack `.pw.toml`s matched to their Modrinth projects, latest NeoForge/26.1.2 build each):
  - **GeckoLib is NOT orphaned** — also required by AdvancedAE (`rxYaglEe`, 26.1.7), Iron's Arms 'n Artifice (`yOy4oSzi`, 26.1.2-1.2.0), and Neo Vitae (`rvaW4C93`). Keep it.
  - **Curios:** required by *no* remaining pack mod (Artifacts 15.1.3 lists Curios as **optional**; Neo Vitae 1.1.15/1.1.54 list it optional). After Occultism's removal it is fully optional — removable, though harmless to keep for optional integrations.
  - **Modonomicon: NOT orphaned either — see Section D.**

---

## Section D — Verdict: does any pack mod require Modonomicon?

**YES. Neo Vitae requires Modonomicon.**

Evidence (jar-verified, not just metadata):

1. The pack's pinned `mods/neovitae.pw.toml` = CF project 1404763, file 8725005 = `neovitae-26.1.2-1.1.15.jar`
   (sha1 `3020a44a7d8744de4133927f45ad12917bbce8d4` — hash confirmed by downloading the same file).
2. That exact jar's `META-INF/neoforge.mods.toml` declares:
   `modId="modonomicon" type="required" versionRange="[2.0.0,26.0.0)"` and `modId="geckolib" type="required"`.
3. There is **no Jar-in-Jar copy** of Modonomicon inside the jar — Neo Vitae ships Modonomicon *book data*
   (`data/neovitae/modonomicon/books/guide/…`) and compat classes, but expects the external mod.
4. Modrinth agrees for both the pinned version (`26.1.2-1.1.15`, version id `c5MTU5zk`: Modonomicon `required`)
   and the latest (`26.1.2-1.1.54`, same).
5. Also confirmed by source: https://raw.githubusercontent.com/breakinblocks/NeoVitae/26.1.2/src/main/templates/META-INF/neoforge.mods.toml

No other mod in the pack's 225-file sweep requires Modonomicon (public-GitHub-wide consumers are
Theurgy, Occultism, Neo Vitae, principia-magica, Spectrum, Minejago, FTB-Armory, etc. — only Neo Vitae is in this pack).

### ⚠️ Conflict with notes/removal-theurgy-occultism.md

The staged removal analysis (same repo, dated 2026-11-25) claims:
> "Modonomicon (kli_kli's in-game guidebook library) was used **only** by Theurgy (The Hermetica) and
> Occultism (Dictionary of Spirits) in this pack — no other mod, script, or config references it — so it
> was removed together with them."

That claim is **incorrect**: Neo Vitae hard-depends on Modonomicon at mod-load time. `git status` shows
`mods/modonomicon.pw.toml` is deleted (staged) while `mods/neovitae.pw.toml` remains. With that combination,
NeoForge will refuse to load Neo Vitae (missing mandatory dependency) on next launch.

**Required corrective action (choose one):**
- **Restore `mods/modonomicon.pw.toml`** (any 26.1.x-line build satisfying `[2.0.0,26.0.0)`) and undo its
  related removals (config entries are harmless to re-add; MODLIST.md/crash_assistant entries were also removed),
  **or**
- Also remove Neo Vitae (then Modonomicon, and its Curios/GeckoLib usage, can go — though GeckoLib must stay for
  AdvancedAE / Iron's Artifice).

## Known imperfections / caveats

- The 225-mod dependency sweep used each mod's **latest** NeoForge/26.1.2 build (not the exact pinned
  version), matched by Modrinth title; 25 mods couldn't be title-matched (FTB/YUNG's/platform-suffixed names —
  all perf/utility mods, none plausibly related to Modonomicon/GeckoLib/Curios). Neo Vitae's *pinned* jar was
  individually verified, which is the load-bearing claim.
- cfwidget file listings don't expose hashes, so the CF/Modrinth "same file" claim rests on a direct CDN
  download + local hashing (done, matches).
- `notes/removal-theurgy-occultism.md` says the pack pinned theurgy 1.114.0 / occultism 1.248.1; those exact
  versions' dependency sets match the latest releases, so the conclusion is version-independent.
- The `master` branch of EnhancedFallingTrees is stale (1.20-era); all Section B facts come from `port/26.1`.
