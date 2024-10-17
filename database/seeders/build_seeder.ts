import { BaseSeeder } from '@adonisjs/lucid/seeders'

import type { ItemId } from '#models/item'
import Item from '#models/item'
import PlayerBuild from '#models/player_build'
import WeaponAssociation, { type WeaponAssociationId } from '#models/weapon_association'

export default class extends BaseSeeder {
  async run() {
    await PlayerBuild.fetchOrCreateMany(
      ['type', 'associationId'],
      [
        {
          scale: 'small',
          type: 'PvP',
          associationId: await findClass('Seeker'),
          primaryWeaponId: await findItem("Karnix's Netherbow"),
          secondaryWeaponId: await findItem("Excavator's Mysterious Scepter"),
          headId: await findItem('Shock Commander Visor'),
          cloakId: await findItem('Forsaken Embrace'),
          chestId: await findItem('Shock Commander Plate Armor'),
          handsId: await findItem('Gauntlets of the Infernal Herald'),
          legsId: await findItem('Greaves of the Infernal Herald'),
          feetId: await findItem('Heroic Boots of the Resistance'),
          necklaceId: await findItem('Clasp of the Conqueror'),
          braceletId: await findItem('Bracers of the Primal King'),
          primaryRingId: await findItem('Sapphire Dimensional Band'),
          secondaryRingId: await findItem('Band of Universal Power'),
          beltId: await findItem('Flamewrought Bindings'),
        },
        {
          scale: 'small',
          type: 'PvP',
          associationId: await findClass('Darkblighter'),
          primaryWeaponId: await findItem("Lequirus's Wicked Thorns"),
          secondaryWeaponId: await findItem("Lequirus's Coveted Tome"),
          headId: await findItem('Phantom Wolf Mask'),
          cloakId: await findItem('Ancient Tapestry Mantle'),
          chestId: await findItem('Phantom Wolf Tunic'),
          handsId: await findItem('Shadow Harvester Grips'),
          legsId: await findItem('Shadow Harvester Trousers'),
          feetId: await findItem('Swirling Essence Shoes'),
          necklaceId: await findItem('Clasp of the Conqueror'),
          braceletId: await findItem('Bracers of the Primal King'),
          primaryRingId: await findItem('Amber Dimensional Band'),
          secondaryRingId: await findItem('Band of Universal Power'),
          beltId: await findItem('Belt of Bloodlust'),
        },
      ]
    )
  }
}

const weapons: Record<string, WeaponAssociationId> = {}

async function findClass(name: string): Promise<WeaponAssociationId> {
  if (!weapons[name]) {
    const weapon = await WeaponAssociation.findByOrFail('name', name)
    weapons[weapon.name] = weapon.id
    return weapon.id
  }

  return weapons[name]
}

const items: Record<string, ItemId> = {}

async function findItem(name: string): Promise<ItemId> {
  if (!items[name]) {
    const item = await Item.findByOrFail('name', name)
    items[item.name] = item.id
    return item.id
  }

  return items[name]
}
