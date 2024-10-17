import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'player_builds'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery)
      table.enum('scale', ['small', 'large']).nullable()
      table.enum('type', ['PvP', 'PvE']).notNullable()
      table
        .uuid('association_id')
        .notNullable()
        .references('weapon_associations.id')
        .onDelete('CASCADE') // Delete all player builds if the association is deleted

      // The following columns are foreign keys to the items table
      table.uuid('primary_weapon_id').notNullable().references('items.id').onDelete('CASCADE')
      table.uuid('secondary_weapon_id').notNullable().references('items.id').onDelete('CASCADE')
      table.uuid('head_id').notNullable().references('items.id').onDelete('CASCADE')
      table.uuid('cloak_id').notNullable().references('items.id').onDelete('CASCADE')
      table.uuid('chest_id').notNullable().references('items.id').onDelete('CASCADE')
      table.uuid('hands_id').notNullable().references('items.id').onDelete('CASCADE')
      table.uuid('legs_id').notNullable().references('items.id').onDelete('CASCADE')
      table.uuid('feet_id').notNullable().references('items.id').onDelete('CASCADE')
      table.uuid('necklace_id').notNullable().references('items.id').onDelete('CASCADE')
      table.uuid('bracelet_id').notNullable().references('items.id').onDelete('CASCADE')
      table.uuid('primary_ring_id').notNullable().references('items.id').onDelete('CASCADE')
      table.uuid('secondary_ring_id').notNullable().references('items.id').onDelete('CASCADE')
      table.uuid('belt_id').notNullable().references('items.id').onDelete('CASCADE')

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
