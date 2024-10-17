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
      },
      {
        name: 'Flamewrought Bindings',
        categoryId: await findCategoryId('Belt'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/IT_P_Belt_00019.png',
      },
      {
        name: 'Bracers of the Primal King',
        categoryId: await findCategoryId('Bracelet'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/IT_P_Bracelet_00023.png',
      },
      {
        name: 'Ruby Bangle',
        categoryId: await findCategoryId('Bracelet'),
        tierId: await findTierId('Rare'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/IT_P_Bracelet_00024.png',
      },
      {
        name: 'Phantom Wolf Tunic',
        categoryId: await findCategoryId('Chest'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/P_Part_LE_M_TS_00010.png',
      },
      {
        name: 'Shock Commander Plate Armor',
        categoryId: await findCategoryId('Chest'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/P_Set_PL_M_TS_05002.png',
      },
      {
        name: 'Ancient Tapestry Mantle',
        categoryId: await findCategoryId('Cloak'),
        tierId: await findTierId('Epic'),
        image: 'https://gameslantern.com/storage/sites/throne-and-liberty/armor/P_M_CA_00016.png',
      },
      {
        name: 'Forsaken Embrace',
        categoryId: await findCategoryId('Cloak'),
        tierId: await findTierId('Epic'),
        image: 'https://gameslantern.com/storage/sites/throne-and-liberty/armor/P_M_CA_00017.png',
      },
      {
        name: 'Heroic Boots of the Resistance',
        categoryId: await findCategoryId('Feet'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/P_Set_PL_M_BT_06002.png',
      },
      {
        name: 'Sabatons of the Field General',
        categoryId: await findCategoryId('Feet'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/P_Set_PL_M_BT_00018.png',
      },
      {
        name: 'Swirling Essence Shoes',
        categoryId: await findCategoryId('Feet'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/P_Set_FA_M_BT_00008C.png',
      },
      {
        name: 'Gauntlets of the Field General',
        categoryId: await findCategoryId('Hands'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/P_Set_PL_M_GL_00018.png',
      },
      {
        name: 'Gauntlets of the Infernal Herald',
        categoryId: await findCategoryId('Hands'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/P_set_PL_M_GL_00019.png',
      },
      {
        name: 'Shadow Harvester Grips',
        categoryId: await findCategoryId('Hands'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/P_Set_LE_M_GL_00017A.png',
      },
      {
        name: 'Shock Commander Gauntlets',
        categoryId: await findCategoryId('Hands'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/P_Set_PL_M_GL_05002.png',
      },
      {
        name: 'Phantom Wolf Mask',
        categoryId: await findCategoryId('Helmet'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/P_Part_LE_M_HM_00005.png',
      },
      {
        name: 'Shadow Harvester Mask',
        categoryId: await findCategoryId('Helmet'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/P_Part_LE_M_HM_00008.png',
      },
      {
        name: 'Shock Commander Visor',
        categoryId: await findCategoryId('Helmet'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/P_Set_PL_M_HM_05002.png',
      },
      {
        name: 'Visage of the Executioner',
        categoryId: await findCategoryId('Helmet'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/P_Part_FA_M_HM_00006.png',
      },
      {
        name: 'Greaves of the Infernal Herald',
        categoryId: await findCategoryId('Legs'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/P_set_PL_M_PT_00019.png',
      },
      {
        name: 'Heroic Trousers of the Resistance',
        categoryId: await findCategoryId('Legs'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/P_Set_LE_M_PT_05003.png',
      },
      {
        name: 'Shadow Harvester Trousers',
        categoryId: await findCategoryId('Legs'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/P_Part_LE_M_PT_00007.png',
      },
      {
        name: 'Clasp of the Conqueror',
        categoryId: await findCategoryId('Necklace'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/IT_P_Necklace_00017.png',
      },
      {
        name: 'Amber Dimensional Band',
        categoryId: await findCategoryId('Ring'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/IT_P_Ring_00032.png',
      },
      {
        name: 'Band of Universal Power',
        categoryId: await findCategoryId('Ring'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/IT_P_Ring_00005.png',
      },
      {
        name: 'Etched Alabaster Band',
        categoryId: await findCategoryId('Ring'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/IT_P_Ring_00003.png',
      },
      {
        name: 'Sapphire Dimensional Band',
        categoryId: await findCategoryId('Ring'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/IT_P_Ring_00033.png',
      },
      {
        name: "Adentus's Gargantuan Greatsword",
        categoryId: await findCategoryId('Weapon'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/IT_P_Sword2h_00028.png',
      },
      {
        name: "Aelon's Rejuvenating Longbow",
        categoryId: await findCategoryId('Weapon'),
        tierId: await findTierId('Epic'),
        image: 'https://gameslantern.com/storage/sites/throne-and-liberty/armor/IT_P_Bow_00034.png',
      },
      {
        name: "Excavator's Mysterious Scepter",
        categoryId: await findCategoryId('Weapon'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/IT_P_Wand_00012.png',
      },
      {
        name: "Karnix's Netherbow",
        categoryId: await findCategoryId('Weapon'),
        tierId: await findTierId('Epic'),
        image: 'https://gameslantern.com/storage/sites/throne-and-liberty/armor/IT_P_Bow_00032.png',
      },
      {
        name: "Lequirus's Coveted Tome",
        categoryId: await findCategoryId('Weapon'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/IT_P_Wand_00013.png',
      },
      {
        name: "Lequirus's Wicked Thorns",
        categoryId: await findCategoryId('Weapon'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/IT_P_Dagger_00014.png',
      },
      {
        name: "Nirma's Sword of Echoes",
        categoryId: await findCategoryId('Weapon'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/IT_P_Sword_00035.png',
      },
      {
        name: "Rex Chimaerus's Crossbows",
        categoryId: await findCategoryId('Weapon'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/IT_P_Crossbow_00007C.png',
      },
      {
        name: "Talus's Crystalline Staff",
        categoryId: await findCategoryId('Weapon'),
        tierId: await findTierId('Epic'),
        image:
          'https://gameslantern.com/storage/sites/throne-and-liberty/armor/IT_P_Staff_00032.png',
      },
      {
        name: "Toublek's Deathmark Longbow",
        categoryId: await findCategoryId('Weapon'),
        tierId: await findTierId('Epic'),
        image: 'https://gameslantern.com/storage/sites/throne-and-liberty/armor/IT_P_Bow_00033.png',
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
