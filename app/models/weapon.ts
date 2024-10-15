import { Opaque } from '@adonisjs/core/types/helpers'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

import WeaponAssociation from './weapon_association.js'

/** The opaque type for the weapon id */
export type WeaponId = Opaque<'WeaponId', string>

/** The model for the weapons table */
export default class Weapon extends BaseModel {
  /** The primary key of the table */
  @column({ isPrimary: true })
  declare id: WeaponId

  /** The name of the weapon */
  @column()
  declare name: string

  /** The weapons that are associated with the weapon */
  @hasMany(() => WeaponAssociation)
  declare weapons: HasMany<typeof WeaponAssociation>

  /** The date and time the record was created */
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  /** The date and time the record was last updated */
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
