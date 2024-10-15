import { Opaque } from '@adonisjs/core/types/helpers'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

import Location, { type LocationId } from './location.js'

/** The opaque type for the mob id */
export type MobId = Opaque<'MobId', string>

/** The model for the mobs table */
export default class Mob extends BaseModel {
  /** The primary key of the table */
  @column({ isPrimary: true })
  declare id: MobId

  /** The name of the mob */
  @column()
  declare name: string

  /** The level of the mob */
  @column()
  declare maxLevel: number | null

  /** The link to the mob */
  @column()
  declare link: string | null

  /** The details of the location */
  @column()
  declare details: string | null

  /** The location of the mob */
  @column()
  declare locationId: LocationId

  /** The location of the mob */
  @belongsTo(() => Location)
  declare location: BelongsTo<typeof Location>

  /** The date and time the record was created */
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  /** The date and time the record was last updated */
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
