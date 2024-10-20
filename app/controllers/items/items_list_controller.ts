import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

import ItemsRepository from '../../repositories/items_repository.js'

@inject()
export default class ItemsListController {
  constructor(private repository: ItemsRepository) {}

  async handle({ inertia }: HttpContext) {
    const items = await this.repository.all()

    return inertia.render('items/list', { items })
  }
}
