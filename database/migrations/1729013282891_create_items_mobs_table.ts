import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'item_mob'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('item_id').notNullable().references('items.id').onDelete('CASCADE') // Delete all mob items if the item is deleted
      table.uuid('mob_id').notNullable().references('mobs.id').onDelete('CASCADE') // Delete all mob items if the mob is deleted

      table.integer('drop_chance').nullable()

      table.unique(['item_id', 'mob_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
