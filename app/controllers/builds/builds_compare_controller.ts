import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

import BuildsRepository from '#repositories/builds_repository'

@inject()
export default class BuildsCompareController {
  constructor(private repository: BuildsRepository) {}

  async handle({ inertia, request }: HttpContext) {
    const qs = request.qs()

    const source: string | undefined = qs.source
    const target: string | undefined = qs.target

    const builds = await this.repository.all()

    return inertia.render('builds/compare', { source, target, builds })
  }
}
