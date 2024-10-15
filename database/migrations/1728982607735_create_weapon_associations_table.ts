import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'weapon_associations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery)
      table.uuid('primary_id').notNullable().references('weapons.id').onDelete('CASCADE') // Delete all associations if the weapon is deleted
      table.uuid('secondary_id').notNullable().references('weapons.id').onDelete('CASCADE') // Delete all associations if the weapon is deleted
      table.string('name').notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
