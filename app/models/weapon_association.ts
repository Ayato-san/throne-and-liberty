import { Opaque } from '@adonisjs/core/types/helpers'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

import Weapon, { type WeaponId } from './weapon.js'

/** The opaque type for the weapon association id */
export type WeaponAssociationId = Opaque<'WeaponAssociationId', string>

/** The model for the weapon associations table */
export default class WeaponAssociation extends BaseModel {
  /** The primary key of the table */
  @column({ isPrimary: true })
  declare id: WeaponAssociationId

  /** The name of the weapon association */
  @column()
  declare name: string

  /** The primary weapon id */
  @column()
  declare primaryId: WeaponId

  /** The primary weapon */
  @belongsTo(() => Weapon, {
    foreignKey: 'primaryId',
  })
  declare primary: BelongsTo<typeof Weapon>

  /** The secondary weapon id */
  @column()
  declare secondaryId: WeaponId

  /** The secondary weapon */
  @belongsTo(() => Weapon, {
    foreignKey: 'secondaryId',
  })
  declare secondary: BelongsTo<typeof Weapon>

  /** The date and time the record was created */
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  /** The date and time the record was last updated */
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
