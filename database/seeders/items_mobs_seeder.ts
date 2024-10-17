import { BaseSeeder } from '@adonisjs/lucid/seeders'

import Item from '#models/item'
import type { MobId } from '#models/mob'
import Mob from '#models/mob'

const items: ItemsInfos[] = [
  { name: "Karnix's Netherbow", mobs: [{ name: 'Karnix', chance: 5 }] },
  { name: "Excavator's Mysterious Scepter", mobs: [{ name: 'Excavator-9' }] },
  { name: "Adentus's Gargantuan Greatsword", mobs: [{ name: 'Adentus' }] },
  {
    name: 'Flamewrought Bindings',
    mobs: [{ name: 'Avolos Guardian' }, { name: 'Frenzied Avolos Guardian' }],
  },
  { name: 'Bracers of the Primal King', mobs: [{ name: 'Lequirus' }] },
  {
    name: 'Shock Commander Plate Armor',
    mobs: [
      { name: 'Demonhoof Head Shaman' },
      { name: 'Grayeye', chance: 13 },
      { name: 'Kertaki', chance: 1 },
    ],
  },
  { name: 'Belt of Bloodlust', mobs: [{ name: 'Elder Aridus' }] },
  { name: 'Ruby Bangle', mobs: [{ name: 'Elder Aridus' }, { name: 'Reptilian Fighter' }] },
  {
    name: 'Phantom Wolf Tunic',
    mobs: [{ name: 'Grayeye' }, { name: 'Kertaki' }, { name: 'Toublek' }],
  },
  { name: 'Ancient Tapestry Mantle', mobs: [{ name: 'Dark Enforcer' }] },
  { name: 'Forsaken Embrace', mobs: [{ name: 'Junobote' }] },
  { name: 'Heroic Boots of the Resistance', mobs: [{ name: 'Gray Wolf' }] },
  {
    name: 'Sabatons of the Field General',
    mobs: [
      { name: 'Berserk Dark Enforcer' },
      { name: 'Gaitan', chance: 1 },
      { name: 'King Khanzaizin', chance: 13 },
      { name: 'Dark Wizard' },
      { name: 'Queen Bellandir' },
    ],
  },
  {
    name: 'Swirling Essence Shoes',
    mobs: [
      { name: 'Gaitan', chance: 1 },
      { name: 'King Khanzaizin', chance: 13 },
      { name: 'Shaikal', chance: 2 },
    ],
  },
  {
    name: 'Gauntlets of the Field General',
    mobs: [
      { name: 'Elder Aridus' },
      { name: 'Limuny Bercant', chance: 13 },
      { name: 'Shakarux', chance: 1 },
    ],
  },
  {
    name: 'Gauntlets of the Infernal Herald',
    mobs: [{ name: 'Avolos Pyromancer' }, { name: 'Frenzied Avolos Pyromancer' }],
  },
  {
    name: 'Shadow Harvester Grips',
    mobs: [{ name: 'Avolos Pyromancer' }, { name: 'Frenzied Avolos Pyromancer' }],
  },
  {
    name: 'Shock Commander Gauntlets',
    mobs: [
      { name: 'Limuny Bercant', chance: 13 },
      { name: 'Rex Chimaerus', chance: 2 },
      { name: 'Shakarux', chance: 1 },
    ],
  },
  {
    name: 'Phantom Wolf Mask',
    mobs: [{ name: 'Turka', chance: 1 }, { name: 'Unnamed Golem' }, { name: 'Talus' }],
  },
  { name: 'Shadow Harvester Mask', mobs: [{ name: 'Turka', chance: 1 }, { name: 'Adentus' }] },
  { name: 'Shock Commander Visor', mobs: [{ name: 'Malakar' }] },
  { name: 'Visage of the Executioner', mobs: [{ name: 'Shaikal', chance: 13 }] },
  { name: 'Greaves of the Infernal Herald', mobs: [{ name: 'Reptilian Fighter' }] },
  {
    name: 'Heroic Trousers of the Resistance',
    mobs: [{ name: 'Enchanted Fire Orc Commander' }, { name: 'Fire Orc Chief Priest' }],
  },
  {
    name: 'Shadow Harvester Trousers',
    mobs: [{ name: 'Kaligras', chance: 1 }, { name: 'Junobote' }],
  },
  { name: 'Clasp of the Conqueror', mobs: [] },
  { name: 'Amber Dimensional Band', mobs: [] },
  { name: 'Band of Universal Power', mobs: [{ name: 'Queen Bellandir' }] },
  {
    name: 'Etched Alabaster Band',
    mobs: [{ name: 'Demonhoof Head Shaman' }, { name: 'Demonhoof Tracker' }],
  },
  { name: 'Sapphire Dimensional Band', mobs: [] },
  { name: "Aelon's Rejuvenating Longbow", mobs: [{ name: 'Grand Aelon' }] },
  { name: "Lequirus's Coveted Tome", mobs: [{ name: 'Lequirus', chance: 5 }] },
  { name: "Lequirus's Wicked Thorns", mobs: [{ name: 'Lequirus', chance: 5 }] },
  { name: "Nirma's Sword of Echoes", mobs: [{ name: 'Nirma' }] },
  { name: "Rex Chimaerus's Crossbows", mobs: [{ name: 'Rex Chimaerus', chance: 5 }] },
  { name: "Talus's Crystalline Staff", mobs: [{ name: 'Talus' }, { name: 'Unnamed Golem' }] },
  { name: "Toublek's Deathmark Longbow", mobs: [{ name: 'Toublek', chance: 5 }] },
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
      if (!error.detail.endsWith('already exists.')) {
        console.log('Failed to attach items to build: ' + itemInfos.name + '; ', error.detail)
      }
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
