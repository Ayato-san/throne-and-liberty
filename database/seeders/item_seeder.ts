import { BaseSeeder } from '@adonisjs/lucid/seeders'

import Item from '#models/item'
import ItemCategory, { type ItemCategoryId } from '#models/item_category'
import type { ItemTierId } from '#models/item_tier'
import ItemTier from '#models/item_tier'

export default class extends BaseSeeder {
  async run() {
    await Item.fetchOrCreateMany('name', [
      {
        name: 'Belt of Bloodlust',
        categoryId: await findCategoryId('Belt'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/IT_P_Belt_00022.png',
        gameslanternUrl: 'armor/belt-of-bloodlust',
      },
      {
        name: 'Flamewrought Bindings',
        categoryId: await findCategoryId('Belt'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/IT_P_Belt_00019.png',
        gameslanternUrl: 'armor/flamewrought-bindings',
      },
      {
        name: 'Bracers of the Primal King',
        categoryId: await findCategoryId('Bracelet'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/IT_P_Bracelet_00023.png',
        gameslanternUrl: 'armor/bracers-of-the-primal-king',
      },
      {
        name: 'Ruby Bangle',
        categoryId: await findCategoryId('Bracelet'),
        tierId: await findTierId('Rare'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/IT_P_Bracelet_00024.png',
        gameslanternUrl: 'armor/ruby-bangle',
      },
      {
        name: 'Phantom Wolf Tunic',
        categoryId: await findCategoryId('Chest'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/P_Part_LE_M_TS_00010.png',
        gameslanternUrl: 'armor/phantom-wolf-tunic',
      },
      {
        name: 'Shock Commander Plate Armor',
        categoryId: await findCategoryId('Chest'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/P_Set_PL_M_TS_05002.png',
        gameslanternUrl: 'armor/shock-commander-plate-armor',
      },
      {
        name: 'Ancient Tapestry Mantle',
        categoryId: await findCategoryId('Cloak'),
        tierId: await findTierId('Epic'),
        image: 'https://gameslantern.com/storage/sites/throne-and-liberty/armor/P_M_CA_00016.png',
        gameslanternUrl: 'armor/ancient-tapestry-mantle',
      },
      {
        name: 'Forsaken Embrace',
        categoryId: await findCategoryId('Cloak'),
        tierId: await findTierId('Epic'),
        image: 'https://gameslantern.com/storage/sites/throne-and-liberty/armor/P_M_CA_00017.png',
        gameslanternUrl: 'armor/forsaken-embrace',
      },
      {
        name: 'Heroic Boots of the Resistance',
        categoryId: await findCategoryId('Feet'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/P_Set_PL_M_BT_06002.png',
        gameslanternUrl: 'armor/heroic-boots-of-the-resistance',
      },
      {
        name: 'Sabatons of the Field General',
        categoryId: await findCategoryId('Feet'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/P_Set_PL_M_BT_00018.png',
        gameslanternUrl: 'armor/sabatons-of-the-field-general',
      },
      {
        name: 'Swirling Essence Shoes',
        categoryId: await findCategoryId('Feet'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/P_Set_FA_M_BT_00008C.png',
        gameslanternUrl: 'armor/swirling-essence-shoes',
      },
      {
        name: 'Gauntlets of the Field General',
        categoryId: await findCategoryId('Hands'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/P_Set_PL_M_GL_00018.png',
        gameslanternUrl: 'armor/gauntlets-of-the-field-general',
      },
      {
        name: 'Gauntlets of the Infernal Herald',
        categoryId: await findCategoryId('Hands'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/P_set_PL_M_GL_00019.png',
        gameslanternUrl: 'armor/gauntlets-of-the-infernal-herald',
      },
      {
        name: 'Shadow Harvester Grips',
        categoryId: await findCategoryId('Hands'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/P_Set_LE_M_GL_00017A.png',
        gameslanternUrl: 'armor/shadow-harvester-grips',
      },
      {
        name: 'Shock Commander Gauntlets',
        categoryId: await findCategoryId('Hands'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/P_Set_PL_M_GL_05002.png',
        gameslanternUrl: 'armor/shock-commander-gauntlets',
      },
      {
        name: 'Phantom Wolf Mask',
        categoryId: await findCategoryId('Helmet'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/P_Part_LE_M_HM_00005.png',
        gameslanternUrl: 'armor/phantom-wolf-mask',
      },
      {
        name: 'Shadow Harvester Mask',
        categoryId: await findCategoryId('Helmet'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/P_Part_LE_M_HM_00008.png',
        gameslanternUrl: 'armor/shadow-harvester-mask',
      },
      {
        name: 'Shock Commander Visor',
        categoryId: await findCategoryId('Helmet'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/P_Set_PL_M_HM_05002.png',
        gameslanternUrl: 'armor/shock-commander-visor',
      },
      {
        name: 'Visage of the Executioner',
        categoryId: await findCategoryId('Helmet'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/P_Part_FA_M_HM_00006.png',
        gameslanternUrl: 'armor/visage-of-the-executioner',
      },
      {
        name: 'Greaves of the Infernal Herald',
        categoryId: await findCategoryId('Legs'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/P_set_PL_M_PT_00019.png',
        gameslanternUrl: 'armor/greaves-of-the-infernal-herald',
      },
      {
        name: 'Heroic Trousers of the Resistance',
        categoryId: await findCategoryId('Legs'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/P_Set_LE_M_PT_05003.png',
        gameslanternUrl: 'armor/heroic-trousers-of-the-resistance',
      },
      {
        name: 'Shadow Harvester Trousers',
        categoryId: await findCategoryId('Legs'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/P_Part_LE_M_PT_00007.png',
        gameslanternUrl: 'armor/shadow-harvester-trousers',
      },
      {
        name: 'Clasp of the Conqueror',
        categoryId: await findCategoryId('Necklace'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/IT_P_Necklace_00017.png',
        gameslanternUrl: 'armor/clasp-of-the-conqueror',
      },
      {
        name: 'Amber Dimensional Band',
        categoryId: await findCategoryId('Ring'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/IT_P_Ring_00032.png',
        gameslanternUrl: 'armor/amber-dimensional-band',
      },
      {
        name: 'Band of Universal Power',
        categoryId: await findCategoryId('Ring'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/IT_P_Ring_00005.png',
        gameslanternUrl: 'armor/band-of-universal-power',
      },
      {
        name: 'Etched Alabaster Band',
        categoryId: await findCategoryId('Ring'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/IT_P_Ring_00003.png',
        gameslanternUrl: 'armor/etched-alabaster-band',
      },
      {
        name: 'Sapphire Dimensional Band',
        categoryId: await findCategoryId('Ring'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/IT_P_Ring_00033.png',
        gameslanternUrl: 'armor/sapphire-dimensional-band',
      },
      {
        name: "Adentus's Gargantuan Greatsword",
        categoryId: await findCategoryId('Weapon'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/IT_P_Sword2h_00028.png',
        gameslanternUrl: 'weapons/adentuss-gargantuan-greatsword',
      },
      {
        name: "Aelon's Rejuvenating Longbow",
        categoryId: await findCategoryId('Weapon'),
        tierId: await findTierId('Epic'),
        image: 'https://gameslantern.com/storage/sites/throne-and-liberty/armor/IT_P_Bow_00034.png',
        gameslanternUrl: 'weapons/aelons-rejuvenating-longbow',
      },
      {
        name: "Excavator's Mysterious Scepter",
        categoryId: await findCategoryId('Weapon'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/IT_P_Wand_00012.png',
        gameslanternUrl: 'weapons/excavators-mysterious-scepter',
      },
      {
        name: "Karnix's Netherbow",
        categoryId: await findCategoryId('Weapon'),
        tierId: await findTierId('Epic'),
        image: 'https://gameslantern.com/storage/sites/throne-and-liberty/armor/IT_P_Bow_00032.png',
        gameslanternUrl: 'weapons/karnixs-netherbow',
      },
      {
        name: "Lequirus's Coveted Tome",
        categoryId: await findCategoryId('Weapon'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/IT_P_Wand_00013.png',
        gameslanternUrl: 'weapons/lequiruss-coveted-tome',
      },
      {
        name: "Lequirus's Wicked Thorns",
        categoryId: await findCategoryId('Weapon'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/IT_P_Dagger_00014.png',
        gameslanternUrl: 'weapons/lequiruss-wicked-thorns',
      },
      {
        name: "Nirma's Sword of Echoes",
        categoryId: await findCategoryId('Weapon'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/IT_P_Sword_00035.png',
        gameslanternUrl: 'weapons/nirmas-sword-of-echoes',
      },
      {
        name: "Rex Chimaerus's Crossbows",
        categoryId: await findCategoryId('Weapon'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/IT_P_Crossbow_00007C.png',
        gameslanternUrl: 'weapons/rex-chimaeruss-crossbows',
      },
      {
        name: "Talus's Crystalline Staff",
        categoryId: await findCategoryId('Weapon'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/IT_P_Staff_00032.png',
        gameslanternUrl: 'weapons/taluss-crystalline-staff',
      },
      {
        name: "Toublek's Deathmark Longbow",
        categoryId: await findCategoryId('Weapon'),
        tierId: await findTierId('Epic'),
        image: 'https://gameslantern.com/storage/sites/throne-and-liberty/armor/IT_P_Bow_00033.png',
        gameslanternUrl: 'weapons/toubleks-deathmark-longbow',
      },
    ])
  }
}

const categories: Record<string, ItemCategoryId> = {}

async function findCategoryId(name: string): Promise<ItemCategoryId> {
  if (!categories[name]) {
    const category = await ItemCategory.findByOrFail('name', name)
    categories[category.name] = category.id
    return category.id
  }

  return categories[name]
}

const tiers: Record<string, ItemTierId> = {}

async function findTierId(name: string): Promise<ItemTierId> {
  if (!tiers[name]) {
    const tier = await ItemTier.findByOrFail('name', name)
    tiers[tier.name] = tier.id
    return tier.id
  }

  return tiers[name]
}
