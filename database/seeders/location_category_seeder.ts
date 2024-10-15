import { BaseSeeder } from '@adonisjs/lucid/seeders'

import LocationCategory from '#models/location_category'

export default class extends BaseSeeder {
  async run() {
    await LocationCategory.fetchOrCreateMany('name', [
      { name: 'Open Field' },
      { name: 'Dungeon' },
      { name: 'Instanced Dungeon' },
      { name: 'Field Boss' },
      { name: 'Arch Boss' },
    ])
  }
}
