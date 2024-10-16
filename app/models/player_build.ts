import { Opaque } from '@adonisjs/core/types/helpers'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

import Item from './item.js'
import WeaponAssociation, { type WeaponAssociationId } from './weapon_association.js'

/** The opaque type for the player build id */
export type PlayerBuildId = Opaque<'PlayerBuildId', string>

/** The model for the player builds table */
export default class PlayerBuild extends BaseModel {
  /** The primary key of the table */
  @column({ isPrimary: true })
  declare id: PlayerBuildId

  /** Focused on wich amount of ennemies */
  @column()
  declare scale: 'small' | 'large' | null

  /** The type of ennemies */
  @column()
  declare type: 'PvP' | 'PvE'

  /** The association id that the player build belongs to */
  @column()
  declare associationId: WeaponAssociationId

  /** The association that the player build belongs to */
  @belongsTo(() => WeaponAssociation, {
    foreignKey: 'associationId',
  })
  declare class: BelongsTo<typeof WeaponAssociation>

  /** The items in the player build */
  @manyToMany(() => Item)
  declare items: ManyToMany<typeof Item>

  /** The date and time the record was created */
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  /** The date and time the record was last updated */
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
  static scales: any
}
