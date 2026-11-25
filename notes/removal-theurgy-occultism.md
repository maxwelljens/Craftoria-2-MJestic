# Removal analysis: Theurgy & Occultism

**Date:** 2026-11-25 · **Pack version at time of change:** 0.11.0 (MC 26.1.2, NeoForge 26.1.2.97)

This documents the full blast-radius analysis performed before removing Theurgy
and Occultism from the pack, everything that was changed, and what to watch for
in gameplay.

## Why these two mods could be removed mostly cleanly

The cross-wiring in this pack is unusually light because the quest book is
still work-in-progress (only 7 chapters exist) and no other mod in the pack
hard-depends on either mod. The integration points found were all *soft*
references: tag scripts, ore/material cross-wiring via Neovitae, JEI/Jade
metadata, skill locks, sound-muffling entries and FTB Quests content.

> **Modonomicon was initially removed as an “orphaned library”, then
> restored.** A jar-level dependency sweep (see
> `notes/enhanced-falling-trees-research.md`, Section D) found that **Neo
> Vitae — which stays in the pack — hard-requires Modonomicon**
> (`modId="modonomicon" type="required" versionRange="[2.0.0,26.0.0)"` in
> its `neoforge.mods.toml`, no Jar-in-Jar copy; Neo Vitae ships Modonomicon
> *book data* only). Grep could not catch this: the dependency lives inside
> the jar, not in the repo. Modonomicon, its configs and its bookkeeping
> entries are therefore **retained**; only its (now-dead) quest theme usage
> went away with the Theurgy/Occultism chapters.

## What the two mods touched in the pack

### Mod files (packwiz metafiles) — removed
- `mods/theurgy.pw.toml` (theurgy 1.114.0)
- `mods/occultism.pw.toml` (occultism 1.248.1)

Modonomicon (`mods/modonomicon.pw.toml`) was kept — required by Neo Vitae
(see the note above).

### Mod configs — removed
- `config/theurgy-client.toml`, `config/theurgy-server.toml`
- `config/occultism-client.toml`, `config/occultism-server.toml`, `config/occultism-startup.toml`

(`config/modonomicon-client.toml` / `-server.toml` were kept with the library.)

### FTB Quests — removed
- Chapters `Theurgy.json5` (367 quests total across both chapters) and
  `Occultism.json5` — verified **self-contained**: no quest in any other
  chapter depends on any quest ID defined in these two chapters (checked all
  367 IDs against the other 5 chapters).
- Language files `lang/en_us/chapters/Theurgy.json5`, `.../Occultism.json5`,
  and their chapter titles in `lang/en_us/chapter.json5`.
- The quest chapter group **“Magic” (`01BEAD68B1D370D3`)** in
  `chapter_groups.json5` + its title in `lang/en_us/chapter_group.json5` —
  the group contained *only* these two chapters. (The empty “Storage” and
  “Adventure” groups were left alone; they are placeholders for future
  chapters.)
- Reward table `28958DE08ADA052A.json5` (“Alchemical Sulfer”) — contained
  **only** `theurgy:alchemical_sulfur_*` items; not referenced by any quest,
  so it was deleted outright, along with its title in
  `lang/en_us/reward_table.json5`.
- Quest theme sections for both chapter IDs in
  `kubejs/assets/ftbquests/ftb_quests_theme.txt` and the chapter title images
  `title_theurgy.png` / `title_occult.png`.

### KubeJS `server_scripts/tags.js` — edited
- Removed `e.add('occultism:tools/knife', '#c:tools/knife')` (made common
  knives satisfy Occultism's knife recipes — dead with the mod gone).
- Removed the `/^occultism:(?!possessed).*$/` regex from
  `craftoria:mob_blacklist` (blacklisted all Occultism spirit mobs from
  farming/spawner tricks).
- Removed `'occultism:foliot'` from the (commented-out) Just Dire Things
  `paradox_deny` line.

### Neovitae dynamic materials (`config/neovitae/materials.json`) — edited
Three materials existed **only** to cross-wire the removed mods' ores and would
have produced recipes smelting into non-existent items:
- `sal_ammoniac` — Theurgy's sal ammoniac ore → `theurgy:sal_ammoniac_crystal`
- `iesnium` — Occultism's nether iesnium ore → `occultism:iesnium_ingot`
- `silver` — Occultism's silver ore → `occultism:silver_ingot`

All three entries were removed. **Consequence:** silver and iesnium no longer
exist as ore resources in the pack at all; nothing else in the pack consumes
`c:ingots/silver` / `c:ingots/iesnium` (checked recipes, tags, quests), so no
replacement ore was introduced.

### Reskillable skill locks (`config/reskillable/skill_locks.json`) — edited
Removed the attack/mining/gathering/defense level-8 locks on the 10 Occultism
silver tools/armor pieces and the level-17 lock on `occultism:iesnium_pickaxe`.

### JEI — edited
- `config/jei/recipe-category-sort-order.ini`: removed the 15 Occultism
  (crushing/crystallize/miner/ritual/spirit_fire/spirit_trade/battlefield)
  and Theurgy (accumulation/calcination/digestion/distillation/fermentation/
  incubation/liquefaction/reformation) recipe categories.
- `config/jei/ingredient-list-mod-sort-order.ini`: removed the “Occultism” and
  “Theurgy” mod-name sort entries.
- `config/jei/world/local/New_World__2/lookupHistory.json` **left as-is** —
  a developer world's JEI lookup history; JEI silently drops unknown
  ingredients. Cosmetic only.

### JEI Biome (`config/jei_biome/biome_blocks.json`) — script-cleaned
The generated per-biome block database referenced the removed mods in **every
overworld/nether biome entry**: `occultism:silver_ore`,
`occultism:silver_ore_deepslate`, `occultism:iesnium_ore_natural`,
`occultism:otherworld_log/_natural`, `occultism:otherworld_leaves/_natural`,
`theurgy:sal_ammoniac_ore`, `theurgy:deepslate_sal_ammoniac_ore` — 3,384 block
references and 470 ore-distribution entries removed across all 138 biomes
(both regular and deepslate variants, plus nether iesnium). The file was
re-validated as strict JSON afterwards.

### Jade (`config/jade/jade.json` + 3 profiles) — edited
Removed the `occultism` (foliot/sacrificial) and `theurgy` (mercury_flux)
plugin blocks, and the matching entries in `config/jade/sort-order.json`.

### Sound Physics Remastered — edited
Removed the muted-sound entries for occultism (brush, chalk, crunching, poof,
start_ritual, tuning_fork) and theurgy (tuning_fork) from
`config/sound_physics_remastered/sound_rates.properties`. The
`modonomicon:turn_page` entry was kept (library retained for Neo Vitae).

### Titanium (`config/titanium/titanium-tags.toml`) — edited
Removed `"occultism"` from `ITEM_PREFERENCE` (tag-preference order for
Titanium-based mods; now no-op either way, kept for correctness).

### Bookkeeping — edited
- `MODLIST.md`: removed the two mod entries.
- `config/crash_assistant/modlist.json`: removed the two jar entries.
- `index.toml` / `pack.toml`: refreshed with packwiz (all deleted entries
  pruned, hashes updated — see note below).

## Library sweep results (theurgy/occultism dependency fallout)

Checked every remaining pack mod's declared dependencies (Modrinth metadata
for the 26.1.2 NeoForge builds; Neo Vitae verified against the exact pinned
jar):

- **Modonomicon — retained.** Hard-required by Neo Vitae (see correction
  note above). Theurgy and Occultism were its only *content* users in the
  pack; Neo Vitae is its only remaining *dependency*.
- **GeckoLib — retained.** Required by AdvancedAE, Iron's Arms 'n Artifice
  and Neo Vitae, independent of the two removed mods.
- **Curios — retained (now fully optional).** No remaining pack mod lists
  it as a required dependency (Artifacts and Neo Vitae list it optional).
  It is harmless to keep for the optional integrations; removing it would be
  a separate decision.

## Leftovers intentionally kept (harmless)

- `config/apotheosis/name_generation.cfg` — auto-generated comment lines
  listing “matching items” still mention a few occultism/theurgy items in
  prose comments. Apotheosis regenerates these comments on next config load;
  editing them by hand is pointless.
- `config/agritechtwo-common.toml`, `config/agritechevolved-common.toml` —
  orphaned configs for mods that aren't even in the pack; their
  `enable_occultism` compat flags are dead either way.
- `changelogs/*` — historical release notes, kept as history.

## What to watch for during gameplay

1. **Silver and iesnium are gone entirely.** Both came only from Occultism.
   Nothing else consumes them (verified against all recipes/tags/quests), but
   if you recall any third-party mod expecting silver (e.g. via
   `c:ingots/silver`), it would now be unobtainable. Neovitae's fragment/
   gravel/dust processing chains for them were removed too.
2. **Sal ammoniac is gone** (Theurgy-only resource, including its ore). The
   Neovitae material entry for it was removed with the ore's source.
3. **Old worlds:** chunks generated before removal still contain silver ore,
   iesnium ore, sal ammoniac ore, otherworld trees and datura plants as
   "unknown" blocks (minecraft:air-like placeholders / missing-texture
   blocks). A new world is strongly recommended. JEI Biome's database was
   hand-cleaned; the mod may regenerate it on next data collection.
4. **Loot crates / quest rewards:** the “Alchemical Sulfer” reward table was
   deleted; no quest referenced it, so no reward regressions expected. If
   FTB Quests had cached progress in an existing world, chapter data for the
   two removed chapters is simply dropped by FTB Quests on load.
5. **Reskillable progression:** the silver tool tier (attack/gathering/
   defense 8) and iesnium pickaxe (mining 17) locks no longer exist — the
   progression jumps straight from fluix/iron to ferricore/diamond tiers.
6. **Mob-related tags:** Occultism spirit mobs (foliot, djinni, afrit, marid,
   possessed mobs) no longer exist, so the `craftoria:mob_blacklist` regex
   removal has no behavioural impact.
7. **Index.toml note:** running `packwiz refresh` revealed that the upstream
   index was already stale (≈264 stored hashes didn't match the committed
   file contents, plus several quest-chapter paths were stored in lowercase
   while the files on disk are capitalized). The refresh fixed those in the
   same pass. If you plan to contribute these changes upstream, expect the
   index refresh noise in the diff.
