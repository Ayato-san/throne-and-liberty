import { BaseSeeder } from '@adonisjs/lucid/seeders'

import Item from '#models/item'
import type { MobId } from '#models/mob'
import Mob from '#models/mob'

const items: ItemsInfos[] = [
  {
    name: "Karnix's Netherbow",
    mobs: [{ name: 'Karnix', chance: 5 }],
  },
  {
    name: "Excavator's Mysterious Scepter",
    mobs: [{ name: 'Excavator-9' }],
  },
  {
    name: "Adentus's Gargantuan Greatsword",
    mobs: [{ name: 'Adentus' }],
  },
  {
    name: 'Flamewrought Bindings',
    mobs: [{ name: 'Avolos Guardian' }, { name: 'Frenzied Avolos Guardian' }],
  },
  {
    name: 'Bracers of the Primal King',
    mobs: [{ name: 'Lequirus' }],
  },
  {
    name: 'Shock Commander Plate Armor',
    mobs: [
      { name: 'Grayeye', chance: 13 },
      { name: 'Kertaki', chance: 1 },
    ],
  },
]

type ItemsInfos = {
  name: string
  mobs: { name: string; chance?: number }[]
}

export default class extends BaseSeeder {
  async seedBuild(itemInfos: ItemsInfos) {
    const item = await Item.findByOrFail('name', itemInfos.name)

    try {
      for (const mob of itemInfos.mobs) {
        await item.related('mobs').attach({
          [await findMobId(mob.name)]: {
            drop_chance: mob.chance || null,
          },
        })
      }
    } catch (error) {
      console.log('Failed to attach items to build: ' + itemInfos.name + '; ', error.detail)
    }
  }

  async run() {
    for (const item of items) {
      try {
        await this.seedBuild(item)
      } catch (_) {}
    }
  }
}

const mobs: Record<string, MobId> = {}

async function findMobId(name: string) {
  if (!mobs[name]) {
    try {
      const mob = await Mob.findByOrFail('name', name)
      mobs[mob.name] = mob.id
      return mob.id
    } catch (_) {
      throw new Error(`Mob ${name} not found`)
    }
  }

  return mobs[name]
}
