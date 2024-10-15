import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'item_player_build'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('item_id').notNullable().references('items.id').onDelete('CASCADE') // Delete all player build items if the item is deleted
      table.uuid('player_build_id').notNullable().references('player_builds.id').onDelete('CASCADE') // Delete all player build items if the player build is deleted

      table.unique(['item_id', 'player_build_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
