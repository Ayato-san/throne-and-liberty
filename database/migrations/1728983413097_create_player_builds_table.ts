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

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
