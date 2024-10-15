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
      },
      {
        name: 'Flamewrought Bindings',
        categoryId: await findCategoryId('Belt'),
        tierId: await findTierId('Epic'),
      },
      {
        name: 'Bracers of the Primal King',
        categoryId: await findCategoryId('Bracelet'),
        tierId: await findTierId('Epic'),
      },
      {
        name: 'Ruby Bangle',
        categoryId: await findCategoryId('Bracelet'),
        tierId: await findTierId('Rare'),
      },
      {
        name: 'Phantom Wolf Tunic',
        categoryId: await findCategoryId('Chest'),
        tierId: await findTierId('Epic'),
      },
      {
        name: 'Shock Commander Plate Armor',
        categoryId: await findCategoryId('Chest'),
        tierId: await findTierId('Epic'),
      },
      {
        name: 'Ancient Tapestry Mantle',
        categoryId: await findCategoryId('Cloak'),
        tierId: await findTierId('Epic'),
      },
      {
        name: 'Forsaken Embrace',
        categoryId: await findCategoryId('Cloak'),
        tierId: await findTierId('Epic'),
      },
      {
        name: 'Heroic Boots of the Resistance',
        categoryId: await findCategoryId('Feet'),
        tierId: await findTierId('Epic'),
      },
      {
        name: 'Sabatons of the Field General',
        categoryId: await findCategoryId('Feet'),
        tierId: await findTierId('Epic'),
      },
      {
        name: 'Swirling Essence Shoes',
        categoryId: await findCategoryId('Feet'),
        tierId: await findTierId('Epic'),
      },
      {
        name: 'Gauntlets of the Field General',
        categoryId: await findCategoryId('Hands'),
        tierId: await findTierId('Epic'),
      },
      {
        name: 'Gauntlets of the Infernal Herald',
        categoryId: await findCategoryId('Hands'),
        tierId: await findTierId('Epic'),
      },
      {
        name: 'Shadow Harvester Grips',
        categoryId: await findCategoryId('Hands'),
        tierId: await findTierId('Epic'),
      },
      {
        name: 'Shock Commander Gauntlets',
        categoryId: await findCategoryId('Hands'),
        tierId: await findTierId('Epic'),
      },
      {
        name: 'Phantom Wolf Mask',
        categoryId: await findCategoryId('Helmet'),
        tierId: await findTierId('Epic'),
      },
      {
        name: 'Shadow Harvester Mask',
        categoryId: await findCategoryId('Helmet'),
        tierId: await findTierId('Epic'),
      },
      {
        name: 'Shock Commander Visor',
        categoryId: await findCategoryId('Helmet'),
        tierId: await findTierId('Epic'),
      },
      {
        name: 'Visage of the Executioner',
        categoryId: await findCategoryId('Helmet'),
        tierId: await findTierId('Epic'),
      },
      {
        name: 'Greaves of the Infernal Herald',
        categoryId: await findCategoryId('Legs'),
        tierId: await findTierId('Epic'),
      },
      {
        name: 'Heroic Trousers of the Resistance',
        categoryId: await findCategoryId('Legs'),
        tierId: await findTierId('Epic'),
      },
      {
        name: 'Shadow Harvester Trousers',
        categoryId: await findCategoryId('Legs'),
        tierId: await findTierId('Epic'),
      },
      {
        name: 'Clasp of the Conqueror',
        categoryId: await findCategoryId('Necklace'),
        tierId: await findTierId('Epic'),
      },
      {
        name: 'Amber Dimensional Band',
        categoryId: await findCategoryId('Ring'),
        tierId: await findTierId('Epic'),
      },
      {
        name: 'Band of Universal Power',
        categoryId: await findCategoryId('Ring'),
        tierId: await findTierId('Epic'),
      },
      {
        name: 'Etched Alabaster Band',
        categoryId: await findCategoryId('Ring'),
        tierId: await findTierId('Epic'),
      },
      {
        name: 'Sapphire Dimensional Band',
        categoryId: await findCategoryId('Ring'),
        tierId: await findTierId('Epic'),
      },
      {
        name: "Adentus's Gargantuan Greatsword",
        categoryId: await findCategoryId('Weapon'),
        tierId: await findTierId('Epic'),
      },
      {
        name: "Aelon's Rejuvenating Longbow",
        categoryId: await findCategoryId('Weapon'),
        tierId: await findTierId('Epic'),
      },
      {
        name: "Excavator's Mysterious Scepter",
        categoryId: await findCategoryId('Weapon'),
        tierId: await findTierId('Epic'),
      },
      {
        name: "Karnix's Netherbow",
        categoryId: await findCategoryId('Weapon'),
        tierId: await findTierId('Epic'),
      },
      {
        name: "Lequirus's Coveted Tome",
        categoryId: await findCategoryId('Weapon'),
        tierId: await findTierId('Epic'),
      },
      {
        name: "Lequirus's Wicked Thorns",
        categoryId: await findCategoryId('Weapon'),
        tierId: await findTierId('Epic'),
      },
      {
        name: "Nirma's Sword of Echoes",
        categoryId: await findCategoryId('Weapon'),
        tierId: await findTierId('Epic'),
      },
      {
        name: "Rex Chimaerus's Crossbows",
        categoryId: await findCategoryId('Weapon'),
        tierId: await findTierId('Epic'),
      },
      {
        name: "Talus's Crystalline Staff",
        categoryId: await findCategoryId('Weapon'),
        tierId: await findTierId('Epic'),
      },
      {
        name: "Toublek's Deathmark Longbow",
        categoryId: await findCategoryId('Weapon'),
        tierId: await findTierId('Epic'),
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
