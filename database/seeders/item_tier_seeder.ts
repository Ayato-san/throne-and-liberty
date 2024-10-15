import { BaseSeeder } from '@adonisjs/lucid/seeders'

import ItemTier from '#models/item_tier'

export default class extends BaseSeeder {
  async run() {
    ItemTier.fetchOrCreateMany('name', [
      { name: 'Epic', color: '#B199CD' },
      { name: 'Epic 2', color: '#B199CD' },
      { name: 'Common', color: '#B2B2B2' },
      { name: 'Uncommon', color: '#8BAB6A' },
      { name: 'Rare', color: '#7CBDE5' },
    ])
  }
}
