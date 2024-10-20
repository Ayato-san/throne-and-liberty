import type BuildAddController from '#controllers/builds/build_add_controller'
import type { ItemId } from '#models/item'
import PlayerBuild from '#models/player_build'
import type { WeaponAssociationId } from '#models/weapon_association'
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

  async create(data: Awaited<ReturnType<typeof BuildAddController.validator.validate>>) {
    const build = await PlayerBuild.create({
      scale: data.scale,
      type: data.type,
      associationId: data.class as WeaponAssociationId,
      primaryWeaponId: data.primaryWeapon as ItemId,
      secondaryWeaponId: data.secondaryWeapon as ItemId,
      headId: data.helmet as ItemId,
      cloakId: data.cloak as ItemId,
      chestId: data.chest as ItemId,
      handsId: data.gloves as ItemId,
      legsId: data.legs as ItemId,
      feetId: data.boots as ItemId,
      necklaceId: data.necklaces as ItemId,
      braceletId: data.bracelets as ItemId,
      primaryRingId: data.primaryRing as ItemId,
      secondaryRingId: data.secondaryRing as ItemId,
      beltId: data.belt as ItemId,
    })

    if (build.$isPersisted) {
      return build.id
    }
    return null
  }

  // async update(id: string, data: any) {}

  // async delete(id: string) {}
}
