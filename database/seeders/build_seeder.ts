import { BaseSeeder } from '@adonisjs/lucid/seeders'

import PlayerBuild from '#models/player_build'
import WeaponAssociation, { type WeaponAssociationId } from '#models/weapon_association'

export default class extends BaseSeeder {
  async run() {
    await PlayerBuild.fetchOrCreateMany(
      ['type', 'associationId'],
      [
        { scale: 'small', type: 'PvP', associationId: await findId('Seeker') },
        { scale: 'small', type: 'PvP', associationId: await findId('Darkblighter') },
        { scale: 'small', type: 'PvP', associationId: await findId('Infiltrator') },
        { scale: 'small', type: 'PvP', associationId: await findId('Ravager') },
        { type: 'PvE', associationId: await findId('Scorpion') },
        { scale: 'large', type: 'PvP', associationId: await findId('Invocator') },
        { scale: 'large', type: 'PvP', associationId: await findId('Liberator') },
        { scale: 'large', type: 'PvP', associationId: await findId('Templar') },
      ]
    )
  }
}

const weapons: Record<string, WeaponAssociationId> = {}

async function findId(name: string): Promise<WeaponAssociationId> {
  if (!weapons[name]) {
    const weapon = await WeaponAssociation.findByOrFail('name', name)
    weapons[weapon.name] = weapon.id
    return weapon.id
  }

  return weapons[name]
}
