import { BaseSeeder } from '@adonisjs/lucid/seeders'

import Weapon, { type WeaponId } from '#models/weapon'
import WeaponAssociation from '#models/weapon_association'

export default class extends BaseSeeder {
  async run() {
    await WeaponAssociation.fetchOrCreateMany('name', [
      {
        name: 'Crusader',
        primaryId: await findId('Greatsword'),
        secondaryId: await findId('Sword'),
      },
      {
        name: 'Darkblighter',
        primaryId: await findId('Wand'),
        secondaryId: await findId('Dagger'),
      },
      { name: 'Infiltrator', primaryId: await findId('Bow'), secondaryId: await findId('Dagger') },
      { name: 'Invocator', primaryId: await findId('Wand'), secondaryId: await findId('Staff') },
      { name: 'Liberator', primaryId: await findId('Bow'), secondaryId: await findId('Staff') },
      {
        name: 'Outrider',
        primaryId: await findId('Crossbow'),
        secondaryId: await findId('Greatsword'),
      },
      { name: 'Raider', primaryId: await findId('Crossbow'), secondaryId: await findId('Sword') },
      { name: 'Ranger', primaryId: await findId('Greatsword'), secondaryId: await findId('Bow') },
      {
        name: 'Ravager',
        primaryId: await findId('Dagger'),
        secondaryId: await findId('Greatsword'),
      },
      {
        name: 'Scorpion',
        primaryId: await findId('Crossbow'),
        secondaryId: await findId('Dagger'),
      },
      { name: 'Scout', primaryId: await findId('Crossbow'), secondaryId: await findId('Bow') },
      { name: 'Seeker', primaryId: await findId('Bow'), secondaryId: await findId('Wand') },
      {
        name: 'Sentinel',
        primaryId: await findId('Greatsword'),
        secondaryId: await findId('Staff'),
      },
      { name: 'Spellblade', primaryId: await findId('Dagger'), secondaryId: await findId('Staff') },
      { name: 'Templar', primaryId: await findId('Sword'), secondaryId: await findId('Wand') },
      { name: 'Warden', primaryId: await findId('Bow'), secondaryId: await findId('Sword') },
      {
        name: 'Battleweaver',
        primaryId: await findId('Crossbow'),
        secondaryId: await findId('Staff'),
      },
      { name: 'Berserker', primaryId: await findId('Dagger'), secondaryId: await findId('Sword') },
      { name: 'Disciple', primaryId: await findId('Staff'), secondaryId: await findId('Sword') },
      { name: 'Fury', primaryId: await findId('Crossbow'), secondaryId: await findId('Wand') },
      { name: 'Paladin', primaryId: await findId('Greatsword'), secondaryId: await findId('Wand') },
    ])
  }
}

const weapons: Record<string, WeaponId> = {}

async function findId(name: string): Promise<WeaponId> {
  if (!weapons[name]) {
    const weapon = await Weapon.findByOrFail('name', name)
    weapons[weapon.name] = weapon.id
    return weapon.id
  }

  return weapons[name]
}
