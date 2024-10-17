import { Opaque } from '@adonisjs/core/types/helpers'
import { BaseModel, belongsTo, column, scope } from '@adonisjs/lucid/orm'
import { QueryScopeCallback } from '@adonisjs/lucid/types/model'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

import Item, { type ItemId } from './item.js'
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

  // All gear items
  @column()
  declare primaryWeaponId: ItemId

  @belongsTo(() => Item, { foreignKey: 'primaryWeaponId' })
  declare primaryWeapon: BelongsTo<typeof Item>

  @column()
  declare secondaryWeaponId: ItemId

  @belongsTo(() => Item, { foreignKey: 'secondaryWeaponId' })
  declare secondaryWeapon: BelongsTo<typeof Item>

  @column()
  declare headId: ItemId

  @belongsTo(() => Item, { foreignKey: 'headId' })
  declare head: BelongsTo<typeof Item>

  @column()
  declare cloakId: ItemId

  @belongsTo(() => Item, { foreignKey: 'cloakId' })
  declare cloak: BelongsTo<typeof Item>

  @column()
  declare chestId: ItemId

  @belongsTo(() => Item, { foreignKey: 'chestId' })
  declare chest: BelongsTo<typeof Item>

  @column()
  declare handsId: ItemId

  @belongsTo(() => Item, { foreignKey: 'handsId' })
  declare hands: BelongsTo<typeof Item>

  @column()
  declare legsId: ItemId

  @belongsTo(() => Item, { foreignKey: 'legsId' })
  declare legs: BelongsTo<typeof Item>

  @column()
  declare feetId: ItemId

  @belongsTo(() => Item, { foreignKey: 'feetId' })
  declare feet: BelongsTo<typeof Item>

  @column()
  declare necklaceId: ItemId

  @belongsTo(() => Item, { foreignKey: 'necklaceId' })
  declare necklace: BelongsTo<typeof Item>

  @column()
  declare braceletId: ItemId

  @belongsTo(() => Item, { foreignKey: 'braceletId' })
  declare bracelet: BelongsTo<typeof Item>

  @column()
  declare primaryRingId: ItemId

  @belongsTo(() => Item, { foreignKey: 'primaryRingId' })
  declare primaryRing: BelongsTo<typeof Item>

  @column()
  declare secondaryRingId: ItemId

  @belongsTo(() => Item, { foreignKey: 'secondaryRingId' })
  declare secondaryRing: BelongsTo<typeof Item>

  @column()
  declare beltId: ItemId

  @belongsTo(() => Item, { foreignKey: 'beltId' })
  declare belt: BelongsTo<typeof Item>

  // Timestamps

  /** The date and time the record was created */
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  /** The date and time the record was last updated */
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  /** The scope to load all the gear items */
  static stuff = scope<typeof PlayerBuild, QueryScopeCallback<typeof PlayerBuild>>(
    (query, loadLocation: boolean) => {
      if (loadLocation) {
        query
          .preload('primaryWeapon', (itemQuery) => {
            itemQuery.withScopes((query) => query.locationName())
          })
          .preload('secondaryWeapon', (itemQuery) => {
            itemQuery.withScopes((query) => query.locationName())
          })
          .preload('head', (itemQuery) => {
            itemQuery.withScopes((query) => query.locationName())
          })
          .preload('cloak', (itemQuery) => {
            itemQuery.withScopes((query) => query.locationName())
          })
          .preload('chest', (itemQuery) => {
            itemQuery.withScopes((query) => query.locationName())
          })
          .preload('hands', (itemQuery) => {
            itemQuery.withScopes((query) => query.locationName())
          })
          .preload('legs', (itemQuery) => {
            itemQuery.withScopes((query) => query.locationName())
          })
          .preload('feet', (itemQuery) => {
            itemQuery.withScopes((query) => query.locationName())
          })
          .preload('necklace', (itemQuery) => {
            itemQuery.withScopes((query) => query.locationName())
          })
          .preload('bracelet', (itemQuery) => {
            itemQuery.withScopes((query) => query.locationName())
          })
          .preload('primaryRing', (itemQuery) => {
            itemQuery.withScopes((query) => query.locationName())
          })
          .preload('secondaryRing', (itemQuery) => {
            itemQuery.withScopes((query) => query.locationName())
          })
          .preload('belt', (itemQuery) => {
            itemQuery.withScopes((query) => query.locationName())
          })
      } else {
        query
          .preload('primaryWeapon')
          .preload('secondaryWeapon')
          .preload('head')
          .preload('cloak')
          .preload('chest')
          .preload('hands')
          .preload('legs')
          .preload('feet')
          .preload('necklace')
          .preload('bracelet')
          .preload('primaryRing')
          .preload('secondaryRing')
          .preload('belt')
      }
    }
  )

  /** The scope to preload the class and its primary and secondary weapons */
  static class = scope<typeof PlayerBuild, QueryScopeCallback<typeof PlayerBuild>>((query) => {
    query.preload('class', (classQuery) => {
      classQuery
        .select('name', 'primaryId', 'secondaryId')
        .preload('primary', (primaryQuery) => {
          primaryQuery.select('name')
        })
        .preload('secondary', (secondaryQuery) => {
          secondaryQuery.select('name')
        })
    })
  })
}
