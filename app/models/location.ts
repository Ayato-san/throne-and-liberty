import { Opaque } from '@adonisjs/core/types/helpers'
import { BaseModel, belongsTo, column, hasMany, scope } from '@adonisjs/lucid/orm'
import { QueryScopeCallback } from '@adonisjs/lucid/types/model'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

import type { LocationCategoryId } from './location_category.js'
import LocationCategory from './location_category.js'
import Mob from './mob.js'

/** The opaque type for the location id */
export type LocationId = Opaque<'LocationId', string>

/** The model for the locations table */
export default class Location extends BaseModel {
  /** The primary key of the table */
  @column({ isPrimary: true })
  declare id: LocationId

  /** The category that the location belongs to */
  @column()
  declare categoryId: LocationCategoryId

  /** The category that the location belongs to */
  @belongsTo(() => LocationCategory, {
    foreignKey: 'categoryId',
  })
  declare category: BelongsTo<typeof LocationCategory>

  /** The name of the location */
  @column()
  declare name: string

  /** The link to the location */
  @column()
  declare link: string | null

  /** The link to the map of the location */
  @column()
  declare mapLink: string | null

  /** The mobs that are in the location */
  @hasMany(() => Mob)
  declare mobs: HasMany<typeof Mob>

  /** The date and time the record was created */
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  /** The date and time the record was last updated */
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  /** The scope to preload the category name */
  static nameCategory = scope<typeof Location, QueryScopeCallback<typeof Location>>((query) => {
    query.select('name', 'categoryId').preload('category', (categoryQuery) => {
      categoryQuery.select('name')
    })
  })
}
