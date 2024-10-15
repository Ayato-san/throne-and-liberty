import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

import type { PlayerBuildId } from '#models/player_build'
import BuildsRepository from '../repositories/builds_repository.js'

@inject()
export default class BuildController {
  constructor(private repository: BuildsRepository) {}

  async handle({ inertia, params }: HttpContext) {
    const id: PlayerBuildId = params.id
    const build = await this.repository.find(id)

    return inertia.render('builds/unique', { build })
  }
}
