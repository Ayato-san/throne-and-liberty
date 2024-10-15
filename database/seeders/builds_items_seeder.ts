import { BaseSeeder } from '@adonisjs/lucid/seeders'

import type { ItemId } from '#models/item'
import Item from '#models/item'
import PlayerBuild from '#models/player_build'

const builds: BuildInfos[] = [
  {
    name: 'Seeker',
    type: 'PvP',
    scale: 'small',
    items: [
      "Karnix's Netherbow",
      "Excavator's Mysterious Scepter",
      'Shock Commander Visor',
      'Forsaken Embrace',
      'Shock Commander Plate Armor',
      'Gauntlets of the Infernal Herald',
      'Greaves of the Infernal Herald',
      'Heroic Boots of the Resistance',
      'Clasp of the Conqueror',
      'Bracers of the Primal King',
      'Sapphire Dimensional Band',
      'Band of Universal Power',
      'Flamewrought Bindings',
    ],
  },
  {
    name: 'Darkblighter',
    type: 'PvP',
    scale: 'small',
    items: [
      "Lequirus's Coveted Tome",
      "Lequirus's Wicked Thorns",
      'Phantom Wolf Mask',
      'Ancient Tapestry Mantle',
      'Phantom Wolf Tunic',
      'Shadow Harvester Grips',
      'Shadow Harvester Trousers',
      'Swirling Essence Shoes',
      'Clasp of the Conqueror',
      'Bracers of the Primal King',
      'Amber Dimensional Band',
      'Band of Universal Power',
      'Belt of Bloodlust',
    ],
  },
]

type BuildInfos = {
  name: string
  type: 'PvP' | 'PvE'
  scale: 'small' | 'large' | null
  items: string[]
}

export default class extends BaseSeeder {
  async seedBuild(buildInfos: BuildInfos) {
    const build = await findClass(buildInfos.name, buildInfos.type, buildInfos.scale)

    try {
      for (const item of buildInfos.items) {
        await build.related('items').attach([await findItemId(item)])
      }
    } catch (error) {
      console.log('Failed to attach items to build: ' + buildInfos.name + '; ', error.detail)
    }
  }

  async run() {
    for (const build of builds) {
      try {
        await this.seedBuild(build)
      } catch (_) {}
    }
  }
}

async function findClass(name: string, type: 'PvP' | 'PvE', scale: 'small' | 'large' | null) {
  return PlayerBuild.query()
    .join('weapon_associations', 'player_builds.association_id', 'weapon_associations.id')
    .select('player_builds.*')
    .where('scale', scale || '')
    .where('type', type)
    .where('weapon_associations.name', name)
    .firstOrFail()
}

const items: Record<string, ItemId> = {}

async function findItemId(name: string) {
  if (!items[name]) {
    try {
      const item = await Item.findByOrFail('name', name)
      items[item.name] = item.id
      return item.id
    } catch (_) {
      throw new Error(`Item ${name} not found`)
    }
  }

  return items[name]
}
