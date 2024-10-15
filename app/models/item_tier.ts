import { Opaque } from '@adonisjs/core/types/helpers'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

import Item from './item.js'

/** The opaque type for the item tier id */
export type ItemTierId = Opaque<'ItemTierId', string>

/** The model for the item tiers table */
export default class ItemTier extends BaseModel {
  /** The primary key of the table */
  @column({ isPrimary: true })
  declare id: ItemTierId

  /** The name of the item tier */
  @column()
  declare name: string

  /** The color of the item tier */
  @column()
  declare color: string

  /** The items in the tier */
  @hasMany(() => Item)
  declare item: HasMany<typeof Item>

  /** The date and time the record was created */
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  /** The date and time the record was last updated */
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
