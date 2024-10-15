import { BaseSeeder } from '@adonisjs/lucid/seeders'

import Location from '#models/location'
import LocationCategory, { type LocationCategoryId } from '#models/location_category'

export default class extends BaseSeeder {
  async run() {
    await Location.fetchOrCreateMany('name', [
      {
        name: 'Carmine Rage Island',
        link: 'https://throneandliberty.gameslantern.com/dungeons/carmine-rage-island',
        categoryId: await findId('Instanced Dungeon'),
      },
      {
        name: 'Cave of Destruction',
        link: 'https://throneandliberty.gameslantern.com/dungeons/underground-cave-of-destruction',
        categoryId: await findId('Instanced Dungeon'),
      },
      {
        name: 'Chapel of Madness',
        link: 'https://throneandliberty.gameslantern.com/dungeons/chapel-of-madness',
        categoryId: await findId('Instanced Dungeon'),
      },
      {
        name: 'Cursed Wasteland',
        link: 'https://throneandliberty.gameslantern.com/dungeons/cursed-wasteland',
        categoryId: await findId('Instanced Dungeon'),
      },
      {
        name: "Death's Abyss",
        link: 'https://throneandliberty.gameslantern.com/dungeons/deaths-abyss',
        categoryId: await findId('Instanced Dungeon'),
      },
      {
        name: 'Forest of Grudge',
        link: 'https://throneandliberty.gameslantern.com/dungeons/forest-of-grudge',
        categoryId: await findId('Instanced Dungeon'),
      },
      {
        name: 'Island of Terror',
        link: 'https://throneandliberty.gameslantern.com/dungeons/island-of-terror',
        categoryId: await findId('Instanced Dungeon'),
      },
      {
        name: 'Mansion of Tragedy',
        link: 'https://throneandliberty.gameslantern.com/dungeons/mansion-of-tragedy',
        categoryId: await findId('Instanced Dungeon'),
      },
      {
        name: 'Temple of Slaughter',
        link: 'https://throneandliberty.gameslantern.com/dungeons/temple-of-slaughter',
        categoryId: await findId('Instanced Dungeon'),
      },
      {
        name: 'Torture Chamber of Screams',
        link: 'https://throneandliberty.gameslantern.com/dungeons/torture-chamber-of-screams',
        categoryId: await findId('Instanced Dungeon'),
      },
      {
        name: "Tyrant's Isle",
        link: 'https://throneandliberty.gameslantern.com/dungeons/tyrants-isle',
        categoryId: await findId('Instanced Dungeon'),
      },
      {
        name: 'Valley of Slaughter',
        link: 'https://throneandliberty.gameslantern.com/dungeons/valley-of-slaughter',
        categoryId: await findId('Instanced Dungeon'),
      },
      {
        name: 'Voidwastes',
        link: 'https://throneandliberty.gameslantern.com/dungeons/voidwastes',
        categoryId: await findId('Instanced Dungeon'),
      },
      { name: 'Shadowed Crypt', categoryId: await findId('Dungeon') },
      { name: "Syleus's Abyss", categoryId: await findId('Dungeon') },
      { name: 'Ant Nest', categoryId: await findId('Dungeon') },
      { name: 'Temple of Sylaveth', categoryId: await findId('Dungeon') },
      { name: 'Saurodoma Island', categoryId: await findId('Dungeon') },
      { name: 'Sanctum of Desire', categoryId: await findId('Dungeon') },
    ])
  }
}

const categories: Record<string, LocationCategoryId> = {}

async function findId(name: string): Promise<LocationCategoryId> {
  if (!categories[name]) {
    const category = await LocationCategory.findByOrFail('name', name)
    categories[category.name] = category.id
    return category.id
  }

  return categories[name]
}
