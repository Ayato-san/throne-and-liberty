import { BaseSeeder } from '@adonisjs/lucid/seeders'

import Item from '#models/item'
import ItemCategory, { type ItemCategoryId } from '#models/item_category'
import type { ItemTierId } from '#models/item_tier'
import ItemTier from '#models/item_tier'

export default class extends BaseSeeder {
  async run() {
    await Item.fetchOrCreateMany('name', [
      {
        name: "Karnix's Netherbow",
        categoryId: await findCategoryId('Weapon'),
        tierId: await findTierId('Epic'),
      },
      {
        name: "Excavator's Mysterious Scepter",
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
