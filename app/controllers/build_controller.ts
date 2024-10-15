import type { HttpContext } from '@adonisjs/core/http'

import type { PlayerBuildId } from '#models/player_build'
import PlayerBuild from '#models/player_build'
import BuildPresenter from '../presenters/build_presenter.js'

export default class BuildController {
  async handle({ inertia, params }: HttpContext) {
    const id: PlayerBuildId = params.id

    const build = await PlayerBuild.query()
      .preload('items')
      .preload('class', (classQuery) => {
        classQuery.preload('primary').preload('secondary')
      })
      .where('id', id)
      .firstOrFail()

    const buildPresenter = BuildPresenter.fromModel(build)

    return inertia.render('builds/unique', { build: buildPresenter })
  }
}
