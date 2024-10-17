import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

import { ItemId } from '#models/item'
import ItemsRepository from '#repositories/items_repository'

@inject()
export default class ItemController {
  constructor(private repository: ItemsRepository) {}

  async handle({ inertia, params }: HttpContext) {
    const id: ItemId = params.id
    const item = await this.repository.find(id)

    return inertia.render('items/unique', { item })
  }
}
