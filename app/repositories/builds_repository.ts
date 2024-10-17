import PlayerBuild from '#models/player_build'
import BuildPresenter from '../presenters/build_presenter.js'
import BuildsPresenter from '../presenters/builds_presenter.js'

export default class BuildsRepository {
  /**
   * Fetch all builds from the database
   */
  async all() {
    const builds = await PlayerBuild.query()
      .select(
        'player_builds.id',
        'player_builds.scale',
        'player_builds.type',
        'player_builds.association_id'
      )
      .join('weapon_associations', 'player_builds.association_id', 'weapon_associations.id')
      .withScopes((query) => query.class())
      .orderBy('weapon_associations.name')

    return BuildsPresenter.fromArray(builds)
  }

  /**
   * Fetch a build by its id
   */
  async find(id: string) {
    const build = await PlayerBuild.query()
      .withScopes((query) => query.stuff(true))
      .withScopes((query) => query.class())
      .where('id', id)
      .firstOrFail()

    return BuildPresenter.fromModel(build)
  }

  // async create(data: any) {}

  // async update(id: string, data: any) {}

  // async delete(id: string) {}
}
