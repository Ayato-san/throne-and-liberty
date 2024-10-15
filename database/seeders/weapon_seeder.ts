import { BaseSeeder } from '@adonisjs/lucid/seeders'

import Weapon from '#models/weapon'

export default class extends BaseSeeder {
  async run() {
    await Weapon.fetchOrCreateMany('name', [
      { name: 'Crossbow' },
      { name: 'Dagger' },
      { name: 'Greatsword' },
      { name: 'Bow' },
      { name: 'Staff' },
      { name: 'Sword' },
      { name: 'Wand' },
    ])
  }
}
