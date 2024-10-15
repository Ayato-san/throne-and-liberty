import { Opaque } from '@adonisjs/core/types/helpers'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

import ItemCategory, { type ItemCategoryId } from './item_category.js'
import ItemTier, { type ItemTierId } from './item_tier.js'
import Mob from './mob.js'
import PlayerBuild from './player_build.js'

/** The opaque type for the item id */
export type ItemId = Opaque<'ItemId', string>

/** The model for the items table */
export default class Item extends BaseModel {
  /** The primary key of the table */
  @column({ isPrimary: true })
  declare id: ItemId

  /** The name of the item */
  @column()
  declare name: string

  /** The category id that the item belongs to */
  @column()
  declare categoryId: ItemCategoryId

  /** The category that the item belongs to */
  @belongsTo(() => ItemCategory)
  declare category: BelongsTo<typeof ItemCategory>

  /** The tier id that the item belongs to */
  @column()
  declare tierId: ItemTierId

  /** The tier that the item belongs to */
  @belongsTo(() => ItemTier)
  declare tier: BelongsTo<typeof ItemTier>

  /** The player builds that the item belongs to */
  @manyToMany(() => PlayerBuild)
  declare builds: ManyToMany<typeof PlayerBuild>

  /** The mobs that the item belongs */
  @manyToMany(() => Mob, {
    pivotColumns: ['drop_chance'],
  })
  declare mobs: ManyToMany<typeof Mob>

  /** The date and time the record was created */
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  /** The date and time the record was last updated */
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
