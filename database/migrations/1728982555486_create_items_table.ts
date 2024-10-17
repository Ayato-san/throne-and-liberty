import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'items'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery)
      table.string('name').notNullable()
      table.uuid('category_id').notNullable().references('item_categories.id').onDelete('CASCADE') // Delete all items in a category if the category is deleted
      table.uuid('tier_id').notNullable().references('item_tiers.id').onDelete('CASCADE') // Delete all items in a tier if the tier is deleted

      table.string('image').notNullable()
      table.string('gameslantern_url').nullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
