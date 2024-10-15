import type { HttpContext } from '@adonisjs/core/http'

import PlayerBuild from '#models/player_build'
import BuildsPresenter from '../presenters/builds_presenter.js'

export default class BuildListsController {
  async handle({ inertia }: HttpContext) {
    const builds = await PlayerBuild.query()
      .join('weapon_associations', 'player_builds.association_id', 'weapon_associations.id')
      .select('player_builds.*')
      .orderBy('weapon_associations.name')
      .preload('class', (classQuery) => {
        classQuery.preload('primary').preload('secondary')
      })

    const buildPresenters = BuildsPresenter.fromArray(builds)

    return inertia.render('builds/list', { builds: buildPresenters })
  }
}
