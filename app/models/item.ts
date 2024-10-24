import { Opaque } from '@adonisjs/core/types/helpers'
import {
  BaseModel,
  belongsTo,
  column,
  computed,
  hasMany,
  manyToMany,
  scope,
} from '@adonisjs/lucid/orm'
import { QueryScopeCallback } from '@adonisjs/lucid/types/model'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

import ItemCategory, { type ItemCategoryId } from './item_category.js'
import ItemTier, { type ItemTierId } from './item_tier.js'
import Mob from './mob.js'
import PlayerBuild from './player_build.js'
import Weapon, { WeaponId } from './weapon.js'

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

  /** The image of the item */
  @column()
  declare image: string

  /** The gameslantern url of the item */
  @column()
  declare gameslanternUrl: string | null

  /** The category id that the item belongs to */
  @column()
  declare categoryId: ItemCategoryId

  /** The category that the item belongs to */
  @belongsTo(() => ItemCategory, {
    foreignKey: 'categoryId',
  })
  declare category: BelongsTo<typeof ItemCategory>

  /** The subcategory id that the item belongs to */
  @column()
  declare subCategoryId: WeaponId | null

  /** The subcategory that the item belongs to */
  @belongsTo(() => Weapon, {
    foreignKey: 'subCategoryId',
  })
  declare subCategory: BelongsTo<typeof Weapon>

  /** The tier id that the item belongs to */
  @column()
  declare tierId: ItemTierId

  /** The tier that the item belongs to */
  @belongsTo(() => ItemTier, { foreignKey: 'tierId' })
  declare tier: BelongsTo<typeof ItemTier>

  /** The mobs that the item belongs */
  @manyToMany(() => Mob, {
    pivotColumns: ['drop_chance'],
  })
  declare mobs: ManyToMany<typeof Mob>

  @computed()
  get dropChance(): number | undefined {
    return this.$extras.pivot_drop_chance
  }

  /** The builds that the item belongs */
  @hasMany(() => PlayerBuild)
  declare builds: HasMany<typeof PlayerBuild>

  /** The date and time the record was created */
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  /** The date and time the record was last updated */
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  /** The scope to preload the location name and mob name */
  static locationName = scope<typeof Item, QueryScopeCallback<typeof Item>>((query) => {
    query.preload('mobs', (mobQuery) => {
      mobQuery.select('name', 'locationId', 'details').preload('location', (locationQuery) => {
        locationQuery.withScopes((query) => query.nameCategory())
      })
    })
  })
}
