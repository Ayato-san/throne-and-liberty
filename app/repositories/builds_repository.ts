import PlayerBuild from '#models/player_build'
import BuildPresenter from '../presenters/build_presenter.js'
import BuildsPresenter from '../presenters/builds_presenter.js'

export default class BuildsRepository {
  /**
   * Fetch all builds from the database
   */
  async all() {
    const builds = await PlayerBuild.query()
      .join('weapon_associations', 'player_builds.association_id', 'weapon_associations.id')
      .select('player_builds.*')
      .orderBy('weapon_associations.name')
      .preload('class', (classQuery) => {
        classQuery
          .select('name', 'primaryId', 'secondaryId')
          .preload('primary', (primaryQuery) => {
            primaryQuery.select('name')
          })
          .preload('secondary', (secondaryQuery) => {
            secondaryQuery.select('name')
          })
      })

    return BuildsPresenter.fromArray(builds)
  }

  /**
   * Fetch a build by its id
   */
  async find(id: string) {
    const build = await PlayerBuild.query()
      .preload('items', (itemQuery) => {
        itemQuery.preload('mobs', (mobQuery) => {
          mobQuery.select('name', 'locationId', 'details').preload('location', (locationQuery) => {
            locationQuery.select('name')
          })
        })
      })
      .preload('class', (classQuery) => {
        classQuery
          .select('name', 'primaryId', 'secondaryId')
          .preload('primary', (primaryQuery) => {
            primaryQuery.select('name')
          })
          .preload('secondary', (secondaryQuery) => {
            secondaryQuery.select('name')
          })
      })
      .where('id', id)
      .firstOrFail()

    return BuildPresenter.fromModel(build)
  }

  async create(data: any) {
    console.log(data)
  }

  // async update(id: string, data: any) {}

  // async delete(id: string) {}
}
