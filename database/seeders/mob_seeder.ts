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
      {
        name: 'Shaikal',
        maxLevel: 50,
        locationId: await findId('Cursed Wasteland'),
      },
      {
        name: 'Karnix',
        maxLevel: 50,
        locationId: await findId("Death's Abyss"),
      },
      {
        name: 'King Khanzaizin',
        maxLevel: 50,
        locationId: await findId('Forest of Grudge'),
      },
      {
        name: 'Kertaki',
        maxLevel: 50,
        locationId: await findId('Island of Terror'),
      },
      {
        name: 'Limuny Bercant',
        maxLevel: 50,
        locationId: await findId('Mansion of Tragedy'),
      },
      {
        name: 'Rex Chimaerus',
        maxLevel: 50,
        locationId: await findId('Temple of Slaughter'),
      },
      {
        name: 'Kaligras',
        maxLevel: 50,
        locationId: await findId('Torture Chamber of Screams'),
      },
      {
        name: 'Toublek',
        maxLevel: 50,
        locationId: await findId("Tyrant's Isle"),
      },
      {
        name: 'Turka',
        maxLevel: 50,
        locationId: await findId('Valley of Slaughter'),
      },
      {
        name: 'Shakarux',
        maxLevel: 50,
        locationId: await findId('Voidwastes'),
      },
      {
        name: 'Elder Aridus',
        maxLevel: 50,
        details: '5F',
        locationId: await findId("Syleus's Abyss"),
      },
      {
        name: 'Berserk Dark Enforcer',
        maxLevel: 50,
        locationId: await findId('Shadowed Crypt'),
      },
      {
        name: 'Avolos Guardian',
        maxLevel: 50,
        locationId: await findId('Sanctum of Desire'),
      },
      {
        name: 'Avolos Pyromancer',
        maxLevel: 50,
        locationId: await findId('Sanctum of Desire'),
      },
      {
        name: 'Frenzied Avolos Guardian',
        maxLevel: 50,
        locationId: await findId('Sanctum of Desire'),
      },
      {
        name: 'Frenzied Avolos Pyromancer',
        maxLevel: 50,
        locationId: await findId('Sanctum of Desire'),
      },
      {
        name: 'Adentus',
        maxLevel: 50,
        locationId: await findId('Ruins of Turayne'),
      },
      {
        name: 'Excavator-9',
        maxLevel: 50,
        locationId: await findId('Monolith Wastelands'),
      },
      {
        name: 'Grand Aelon',
        maxLevel: 50,
        locationId: await findId('Purelight Hill'),
      },
      {
        name: 'Junobote',
        maxLevel: 50,
        details: 'B1',
        locationId: await findId('Sanctum of Desire'),
      },
      {
        name: 'Malakar',
        maxLevel: 50,
        locationId: await findId('Manawastes'),
      },
      {
        name: 'Nirma',
        maxLevel: 50,
        details: '6F',
        locationId: await findId("Syleus's Abyss"),
      },
      {
        name: 'Queen Bellandir',
        maxLevel: 50,
        locationId: await findId("Queen's Trap"),
      },
      {
        name: 'Talus',
        maxLevel: 50,
        locationId: await findId('The Raging Wilds'),
      },
      {
        name: 'Tevent',
        maxLevel: 50,
        locationId: await findId('Tevent Temple'),
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
