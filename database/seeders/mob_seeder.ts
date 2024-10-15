import { BaseSeeder } from '@adonisjs/lucid/seeders'

import Location, { type LocationId } from '#models/location'
import Mob from '#models/mob'

export default class extends BaseSeeder {
  async run() {
    await Mob.fetchOrCreateMany('name', [
      {
        name: 'Gaitan',
        maxLevel: 50,
        link: 'https://throneandliberty.gameslantern.com/enemies/gaitan',
        locationId: await findId('Carmine Rage Island'),
      },
      {
        name: 'Lequirus',
        maxLevel: 50,
        link: 'https://throneandliberty.gameslantern.com/enemies/lequirus',
        locationId: await findId('Cave of Destruction'),
      },
      {
        name: 'Grayeye',
        maxLevel: 50,
        link: 'https://throneandliberty.gameslantern.com/enemies/grayeye',
        locationId: await findId('Chapel of Madness'),
      },
    ])
  }
}

const locations: Record<string, LocationId> = {}

async function findId(name: string): Promise<LocationId> {
  if (!locations[name]) {
    const location = await Location.findByOrFail('name', name)
    locations[location.name] = location.id
    return location.id
  }

  return locations[name]
}
