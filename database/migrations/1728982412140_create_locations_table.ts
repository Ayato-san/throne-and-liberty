import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'locations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery)
      table
        .uuid('category_id')
        .notNullable()
        .references('id')
        .inTable('location_categories')
        .onDelete('CASCADE') // Delete all locations in a category if the category is deleted
      table.string('name').notNullable()
      table.string('link').nullable()
      table.string('map_link').nullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
