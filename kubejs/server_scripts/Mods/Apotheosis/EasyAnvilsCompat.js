// Easy Anvils replaces vanilla anvils and breaks Apotheosis' falling-anvil
// gem crushing (upstream issue Fuzss/easy-anvils#146, open). That crushing is
// the only source of the first Gem Dust, and the Salvaging Table's own recipe
// costs Gem Dust — so the bootstrap is unreachable. This restores it by
// letting the Salvaging Table be crafted from a raw Apothic Gem instead.
// Remove this script when upstream fixes the conflict.
ServerEvents.recipes(e => {

  e.remove({ id: 'apotheosis:salvaging_table' });

  e.shaped('apotheosis:salvaging_table', [
    'III',
    'RSO',
    'GLG'
  ], {
    G: 'apotheosis:gem',
    I: '#c:ingots/copper',
    L: 'minecraft:lava_bucket',
    O: 'minecraft:iron_axe',
    R: 'minecraft:iron_pickaxe',
    S: 'minecraft:smithing_table'
  }).id('kubejs:easyanvils_compat/salvaging_table');

});
