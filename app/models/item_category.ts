import { Opaque } from '@adonisjs/core/types/helpers'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

import Item from './item.js'

/** The opaque type for the item category id */
export type ItemCategoryId = Opaque<'ItemCategoryId', string>

/** The model for the item categories table */
export default class ItemCategory extends BaseModel {
  /** The primary key of the table */
  @column({ isPrimary: true })
  declare id: ItemCategoryId

  /** The name of the item category */
  @column()
  declare name: string

  /** The items in the category */
  @hasMany(() => Item)
  declare item: HasMany<typeof Item>

  /** The date and time the record was created */
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  /** The date and time the record was last updated */
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
