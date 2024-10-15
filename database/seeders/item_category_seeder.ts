import { BaseSeeder } from '@adonisjs/lucid/seeders'

import ItemCategory from '#models/item_category'

export default class extends BaseSeeder {
  async run() {
    ItemCategory.fetchOrCreateMany('name', [
      { name: 'Belt' },
      { name: 'Bracelet' },
      { name: 'Chest' },
      { name: 'Cloak' },
      { name: 'Feet' },
      { name: 'Hands' },
      { name: 'Helmet' },
      { name: 'Legs' },
      { name: 'Necklace' },
      { name: 'Ring' },
      { name: 'Weapon' },
    ])
  }
}
