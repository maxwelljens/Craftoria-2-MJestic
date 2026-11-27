# Adding dimension mods — integration knowledge (Nov 2026)

Knowledge gathered while prototyping **The Undergarden** + **Voidscape** on the
`experiment-01` branch (v0.12.0 prototype, 2026-11-25/26 — abandoned before
release, branch kept on origin as an archive). Nothing here is in the released
pack; this is the playbook for the next attempt. Companion file:
`notes/research-dimension-mods-neoforge-26.1.md` (cited version-availability
research).

## 1. Version availability matrix (as of 2026-11-26)

| Mod | NeoForge 26.1.2 build? | Notes |
|---|---|---|
| The Undergarden (CF 379849) | ✅ `The_Undergarden-26.1.2-0.9.8.jar` (beta) | Actively maintained. **Jade plugin fails to load on Jade 26.1.x** (upstream issue #264, fix committed but unreleased) — expect missing Jade tooltips in the dimension. CF and Modrinth jars are different artifacts; use the CF jar's hash when pinning CF metadata. |
| Voidscape (CF 251730) | ✅ `Voidscape-26.1.2-1.11.660.jar` | By **Tamaized** (not Quarris — a different mod shares the name). Zero dependencies, very actively maintained. |
| Deeper and Darker (CF 659011) | ❌ | Newest NeoForge build is 1.21.1; `neoforge-26.1` port branch exists but unpublished; 2.0.x releases are Fabric-only. Poll before planning an Otherside chapter. |
| Cracker's Wither Storm (CF 621405) | ❌ | Stuck on 1.20.1 since 2024; port request closed "not planned". |
| Compat addons (Undergarden Delight, Boss Checklist–Voidscape) | ❌ | 1.21.1 max. Any cross-mod integration must be hand-written (KubeJS / Neo Vitae). |

## 2. How progression actually works (what new content must plug into)

- **Apotheosis World Tiers** (`config/apotheosis/apotheosis.cfg`) — the
  difficulty spine. Ladder Haven→Frontier→Ascent→Summit→Pinnacle, unlocked by
  **advancements** (`apotheosis:progression/<tier>`) and manually **activated**
  in the CTRL+T screen. Effects are global across all dimensions: harder mobs,
  affix loot, enchanting caps. Apothic Invaders spawn at Frontier+ (Overworld).
- **Reskillable skill locks** (`config/reskillable/skill_locks.json`) — the
  gear ladder: copper 3 → iron 5 → diamond 15 → blazegold 20 → netherite 30 →
  neovitae sentient 33 → celestigem 35 → eclipsealloy 40 → quantum 50.
  Per-item-type skills: weapons→attack, pickaxes→mining, shovels/axes→
  gathering, hoes→farming, armor/shields→defense, magic items→magic.
  Creative-mode players bypass locks (by design). Admin: `/skills set <player>
  <skill> <level>`, `/skills reload`, `/skills scanmod <modid>`.
- **Enhanced Celestials 2** — random lunar events; fully **datapack-driven**
  (`data/<ns>/enhancedcelestials2core/lunar/…`), not config-driven. Its shipped
  Blood Moon multiplies monster spawns ×2.25 (`spawn_category_multiplier`); the
  `event_modifier` system can inject spawn-table entries per event. Not
  tier-gated. NOTE: `config/lunar-common.toml` seen in old checkouts is **stale
  config from the uninstalled mod "Lunar"** (Mrbysco) — its blood-moon weights /
  `crimsonReplacements` claims are NOT this pack's behaviour (removed in v0.12.0).
  Illager Invasion likewise independent.
- **Neo Vitae** (`config/neovitae/materials.json`) — dynamically generates
  ore-processing chains (fragment→gravel→dust→smelt). Schema safely handles
  foreign ores: c: tags or `extra_ore_items` for tagless ores (see the
  `uraninite`/`netherite_scrap` precedents); `generative: true` with empty
  `gen_ore`/`gen_raw` generates only processing stages, never duplicate ores.
  `smelt_to` must be the source mod's own smelt result (e.g. utherium ore
  smelts to the `undergarden:utheric_cluster` **block** — that is correct).
- **`craftoria:mob_blacklist`** (in `kubejs/server_scripts/tags.js`) —
  consumers are `apothic_spawners:blacklisted_from_spawners`,
  `mob_grinding_utils:no_swab`, `industrialforegoing:mob_duplicator_blacklist`:
  it blocks spawn-egg/swab/machine-duplication cheese **only**. Adding
  naturally-spawning mobs and bosses is safe; `/summon` is unaffected.

**Design rule:** dimension gear that is not threaded into the skill-lock
ladder and material ecosystem becomes a pointless sidequest. The prototype
ladder (reusable): catalyst `magic:12` (entry gate), cloggrum 12, froststeel
15, utherium 20, forgotten/voidic-crystal 25, titanite 33, ichor 38, astral 45.

## 3. Dimension integration surface (file checklist)

Every dimension id must be explicitly registered where configs enumerate
dimensions — defaults silently misbehave otherwise:

1. `config/waystones-common.toml` — `wildWaystonesDimensionAllowList`.
   **Plus:** wild generation additionally requires the biome in a
   `has_structure/waystone`-style biome tag (unresolved in the prototype).
2. `config/xaero/minimap/profiles/default.cfg` +
   `config/xaero/world-map/profiles/default.cfg` —
   `cave_mode_allowed_dimensions` is an **allowlist**: empty `[]` = cave mode
   works everywhere; a non-empty list restricts it to listed dims. Adding only
   the new dim there **disables cave mode everywhere else** — list all dims.
3. `config/sdrp-client.json5` — Discord presence matchers
   (`exact@<dim>`, keep `prefixWithIn: false` or text renders "In Exploring…").
4. `config/jei/ingredient-list-mod-sort-order.ini` — mod display names,
   alphabetical block.
5. Deliberate non-registrations: `config/eclipticseasons-common.toml`
   `ValidDimensions` (no seasons outside Overworld), `config/apotheosis/
   apotheosis.cfg` "Generation Dimension Whitelist" (affix ore worldgen stays
   Overworld), `config/ftbessentials.json5` blacklists (no new restrictions),
   `config/openpartiesandclaims-server.toml` (ALL_BUT + empty = claimable).
   `config/jeresources-common.toml` uses **numeric** dimension ids — skip
   modded dims there.
6. `config/reskillable/skill_locks.json` — gear ladder (see §2).
7. `config/neovitae/materials.json` — ore processing (see §2).
8. `kubejs/server_scripts/tags.js` — `craftoria:mob_blacklist` bosses.
9. FTB Quests set (see §4) + bookkeeping (`MODLIST.md`,
   `config/crash_assistant/modlist.json` — see §6) + `packwiz refresh`.

## 4. FTB Quests conventions for new chapters

- Empty groups `07A79347BA55DCA4` (Adventure) and `49042A4D0EC96D55`
  (Storage) are intentional placeholders for future chapters.
- Everything correlates by raw 16-hex GUIDs: chapter `id`, lang keys
  (`chapter.<GUID>.title`, `quest.<GUID>.title/.quest_desc/.quest_subtitle`,
  `task.<GUID>.title` in `lang/en_us/chapters/<Name>.json5`), theme section.
- **Chapter backgrounds are NOT a chapter-file field.** They live in
  `kubejs/assets/ftbquests/ftb_quests_theme.txt` as a `background:` line inside
  the per-chapter `[<GUID>]` section, e.g.
  `background: ftbquests:textures/gui/bg_powah.png; color=#a0a0a0; tile_size=64`.
  Textures go in `kubejs/assets/ftbquests/textures/gui/` and are referenced as
  `ftbquests:textures/gui/<file>.png`; `color=` dims the art for text
  readability, `tile_size=` tiles instead of stretching.
- In chapter files, `image:` is either a canvas decoration
  (x/y/width/height/rotation/alpha) or a per-quest image (item ids like
  `ae2:block/controller` work) — not the background.
- Pack convention: only `item` and `checkmark` task types, simple `item`
  rewards (no new reward tables); `progression_mode: "linear"` means use
  `dependencies` chains. In-game: `/ftbquests editing_mode`,
  `/ftbquests change_progress @s complete <quest_id>`.
- Known cruft: duplicate `Getting Started.json5` / `getting_started.json5`
  lang files (both indexed), and `reward_table.json5` has titles for tables
  that don't exist (leftovers of a planned larger book).

## 5. Mod-specific gotchas (26.1 builds)

**The Undergarden**
- Dimension id is `undergarden:undergarden` (NOT `the_undergarden`).
- `undergarden-common.toml` key literally contains spaces:
  `"Return Portal Frame Block ID" = "minecraft:stone_bricks"` (valid blocks =
  tag `undergarden:portal_frame_blocks`).
- Catalyst recipe: copper ingots + stones + ender pearls (nether-portal-shaped
  frame of stone/deepslate bricks).
- Voidscape armor ids use `_chest`/`_legs`; Undergarden uses
  `_chestplate`/`_leggings`. Don't mix.

**Voidscape**
- Entry: stand on exposed Overworld bedrock ~5–8 min, or nether-portal-shaped
  frame of `voidscape:voidic_crystal_block` lit with `voidscape:charred_bone`.
- `voidscape-common.toml` → `bedrockTeleportationDimensionBlacklist` (list of
  dimension resource-location strings) — used to keep Nether/End/Undergarden
  bedrock from triggering entry. There is also a
  `bedrockTeleportationDimensionWhitelist` boolean (default false).
- **Voidic Visibility — the void is pitch-black BY DESIGN.** The dimension type
  has `ambient_light: -0.3`, `night_vision_color: #000000` (night vision is
  deliberately useless), purple `block_light_tint`, custom skybox.
  `VoidVisibilityHandler` multiplies the whole lightmap by the
  `voidscape:voidic_visibility` attribute (PercentageAttribute, **default 0**)
  every frame. Result: torches appear to do nothing until you wear Voidscape
  armor — **all seven sets grant the attribute** (titanite helmet +0.09, etc.).
  This is NOT a bug, not Iris (pack ships `iris.properties` with
  `enableShaders=false`), and not 26.1 breakage (ATM users reported the same
  in 2024 on 1.20.1). Verify with
  `/attribute @s voidscape:voidic_visibility base set 1`.
  Softening options if the darkness is too harsh: datapack override of
  `voidscape:void`'s dimension type (raise `ambient_light`), or KubeJS
  attribute modifiers on the voidic-crystal set.
- Bosses/entities: `voidscape:voids_wrath`, `voidscape:corrupted_pawn`,
  `voidscape:null_servant` (astral/ichor/titanite are variants of ONE entity
  type, not separate ids).

## 6. Bookkeeping facts (verified empirically)

- `config/crash_assistant/modlist.json` (UTF-8 BOM, preserve it):
  `curseForgeHash` = **CurseForge Murmur2 fingerprint** (32-bit, seed 1, over
  jar bytes *skipping whitespace*, `h = 1 ^ filtered_length`); `modrinthHash`
  = **SHA-1 of the installed jar** (not Modrinth's own hash — it is computed
  locally and stays the CF jar's sha1 even when Modrinth hosts a different
  build).
- `MODLIST.md` bullets: `  * [filename.jar](CF file URL) (by [author](CF
  member URL))`, sorted case-insensitively by filename. Authors come from the
  CF project's `authors[0]` (e.g. Quek04 even when a maintainer uploaded).
- Version bumps: commit literally `version bump X.Y.Z` (changelog generator
  cutoff), and keep `automation/settings.ps1` `$MODPACK_VERSION` +
  `$LAST_MODPACK_VERSION` (previous release) in sync with `pack.toml`.

## 7. Cheat-test protocol (fast verification)

1. `/execute in <modid>:<dim> run tp @s 0 100 0` — dimension loads, chunks
   generate (spectator out if embedded in terrain).
2. Skill locks: test in **survival** (creative bypasses locks):
   `/skills set @s all 1`, `/give` one item per rung, unlock with
   `/skills set @s <skill> <level>`.
3. Quests: `/ftbquests editing_mode` for layout/text; `/give` task items to
   watch auto-detection; `change_progress` to shortcut.
4. World Tiers: `/advancement grant @s only apotheosis:progression/<tier>`,
   then **Activate** in CTRL+T (granting alone is not enough). Invaders spawn
   in the Overworld only.
5. Entry mechanics incl. negative tests (bedrock in Nether/End must NOT
   trigger Voidscape entry if blacklisted).
6. Neo Vitae: JEI-search each new material; confirm chains and smelt targets.
7. `/summon` a blacklisted boss — must still work; natural spawns intact.
