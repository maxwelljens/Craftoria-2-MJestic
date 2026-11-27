// Ender Zoology spawn gate: the mod's mobs only spawn after the world's first
// Nether entry. The gate is a WORLD-level flag (server.persistentData, saved to
// <world>/kubejs_persistent_data.nbt as `netherUnlocked`), not per-player: the
// first player to enter the Nether unlocks the mobs for everyone.
//
// The flag is set when the vanilla advancement `minecraft:story/enter_the_nether`
// is granted (exactly once per player, on first Nether entry). All spawn
// reasons are blocked while gated; `/summon` is unaffected by checkSpawn and
// stays available for testing.
//
// Manual unlock for worlds that entered the Nether BEFORE this script existed:
// KubeJS 2601 (liopyu/KubeJS@2601) exposes no player-changed-dimension event,
// so the advancement will not re-fire for players who already hold it. Options:
//   - any player who has never earned the advancement (e.g. a new recruit)
//     unlocks the world with one Nether trip, or
//   - set `netherUnlocked` to a byte 1 in <world>/kubejs_persistent_data.nbt, or
//   - temporarily uncomment the PlayerEvents.loggedIn line below, run
//     `/kubejs reload server-scripts`, then re-comment it.

PlayerEvents.advancement('minecraft:story/enter_the_nether', event => {
  server.persistentData.netherUnlocked = true;
  event.player.tell('Something stirs in the dark beyond the Overworld…');
});

// Manual unlock hook — leave commented out:
// PlayerEvents.loggedIn(event => { server.persistentData.netherUnlocked = true; });

EntityEvents.checkSpawn([
  'enderzoology:concussion_creeper',
  'enderzoology:enderminy',
  'enderzoology:infested_zombie',
  'enderzoology:dire_wolf',
  'enderzoology:fallen_knight',
  'enderzoology:fallen_mount',
  'enderzoology:wither_witch',
  'enderzoology:wither_cat',
  'enderzoology:owl',
], event => {
  if (!server.persistentData.netherUnlocked) event.cancel();
});
