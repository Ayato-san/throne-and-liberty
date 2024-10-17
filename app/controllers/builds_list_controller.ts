import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

import BuildsRepository from '../repositories/builds_repository.js'

@inject()
export default class BuildsListController {
  constructor(private repository: BuildsRepository) {}

  async handle({ inertia }: HttpContext) {
    const builds = await this.repository.all()

    return inertia.render('builds/list', { builds })
  }
}
