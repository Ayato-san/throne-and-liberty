import { Opaque } from '@adonisjs/core/types/helpers'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

import Location from './location.js'

/** The opaque type for the location category id */
export type LocationCategoryId = Opaque<'LocationCategoryId', string>

/** The model for the location categories table */
export default class LocationCategory extends BaseModel {
  /** The primary key of the table */
  @column({ isPrimary: true })
  declare id: LocationCategoryId

  /** The locations that belong to the category */
  @hasMany(() => Location)
  declare location: HasMany<typeof Location>

  /** The name of the category */
  @column()
  declare name: string

  /** The date and time the record was created */
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  /** The date and time the record was last updated */
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
