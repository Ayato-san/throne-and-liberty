import type { BelongsTo } from '@adonisjs/lucid/types/relations'

import type BuildAddController from '#controllers/builds/build_add_controller'
import type { ItemId } from '#models/item'
import type ItemModel from '#models/item'
import PlayerBuild from '#models/player_build'
import type { WeaponAssociationId } from '#models/weapon_association'
import type { PublicOnly } from '#types/utils'
import { uniqueBy } from '../utils/array.js'

type Base = {
  name: string
}

type Item = Base & { image: string; id: string }

type Stuff = {
  primaryWeapon: Item
  secondaryWeapon: Item
  head: Item
  cloak: Item
  chest: Item
  hands: Item
  legs: Item
  feet: Item
  necklace: Item
  bracelet: Item
  primaryRing: Item
  secondaryRing: Item
  belt: Item
}

type Mob = Base & {}

type Location = Base & {}

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

/** The presenter for the player builds */
export class BuildsPresenter {
  /** The id of the player build */
  id: string
  /** The scale of the player build */
  scale: string | null
  /** The type of ennemies */
  type: string
  /** The class of the player build */
  class?: string
  /** The weapons of the player build */
  weapons?: string[]

  /**
   * The constructor for the player builds presenter
   * @returns The player builds presenter
   */
  private constructor({
    id,
    scale,
    type,
    className,
    weapons,
  }: Omit<PublicOnly<BuildsPresenter>, 'class'> & { className: BuildsPresenter['class'] }) {
    this.id = id
    this.scale = scale
    this.type = type
    this.class = className
    this.weapons = weapons?.filter((weapon) => weapon !== null)
  }

  /** The method to create an array of player build presenters from an array of player build models */
  static fromArray(builds: PlayerBuild[]) {
    return builds.map((build) => {
      return new BuildsPresenter({
        id: build.id,
        scale: build.scale,
        type: build.type,
        className: build.class?.name,
        weapons: [build.class?.primary?.name, build.class?.secondary?.name],
      })
    })
  }
}

/** The presenter for the player builds */
export class BuildPresenter {
  /** The id of the player build */
  id: string
  /** The scale of the player build */
  scale: string | null
  /** The type of ennemies */
  type: string
  /** The class of the player build */
  class?: string
  /** The weapons of the player build */
  weapons?: string[]
  /** The items of the player build */
  stuff: Stuff
  /** The mobs of the player build */
  mobs: Mob[]
  /** The locations of the player build */
  locations: Location[]

  /**
   * The constructor for the player builds presenter
   * @returns The player builds presenter
   */
  private constructor({
    id,
    scale,
    type,
    className,
    weapons,
    stuff,
    mobs,
    locations,
  }: Omit<PublicOnly<BuildPresenter>, 'class'> & { className: BuildPresenter['class'] }) {
    this.id = id
    this.scale = scale
    this.type = type
    this.stuff = stuff
    this.class = className
    this.weapons = weapons?.filter((weapon) => weapon !== null)
    this.mobs = mobs
    this.locations = locations
  }

  /** The method to create a player build presenter from a player build model */
  static fromModel(build: PlayerBuild) {
    const stuff: Stuff = {
      primaryWeapon: {
        name: build.primaryWeapon.name,
        image: build.primaryWeapon.image,
        id: build.primaryWeapon.id,
      },
      secondaryWeapon: {
        name: build.secondaryWeapon.name,
        image: build.secondaryWeapon.image,
        id: build.secondaryWeapon.id,
      },
      head: { name: build.head.name, image: build.head.image, id: build.head.id },
      cloak: { name: build.cloak.name, image: build.cloak.image, id: build.cloak.id },
      chest: { name: build.chest.name, image: build.chest.image, id: build.chest.id },
      hands: { name: build.hands.name, image: build.hands.image, id: build.hands.id },
      legs: { name: build.legs.name, image: build.legs.image, id: build.legs.id },
      feet: { name: build.feet.name, image: build.feet.image, id: build.feet.id },
      necklace: { name: build.necklace.name, image: build.necklace.image, id: build.necklace.id },
      bracelet: { name: build.bracelet.name, image: build.bracelet.image, id: build.bracelet.id },
      primaryRing: {
        name: build.primaryRing.name,
        image: build.primaryRing.image,
        id: build.primaryRing.id,
      },
      secondaryRing: {
        name: build.secondaryRing.name,
        image: build.secondaryRing.image,
        id: build.secondaryRing.id,
      },
      belt: { name: build.belt.name, image: build.belt.image, id: build.belt.id },
    }

    const locations = uniqueBy<Location>(
      [
        ...weaponToLocation(build.primaryWeapon),
        ...weaponToLocation(build.secondaryWeapon),
        ...weaponToLocation(build.head),
        ...weaponToLocation(build.cloak),
        ...weaponToLocation(build.chest),
        ...weaponToLocation(build.hands),
        ...weaponToLocation(build.legs),
        ...weaponToLocation(build.feet),
        ...weaponToLocation(build.necklace),
        ...weaponToLocation(build.bracelet),
        ...weaponToLocation(build.primaryRing),
        ...weaponToLocation(build.secondaryRing),
        ...weaponToLocation(build.belt),
      ],
      'name'
    ).sort((a, b) => a.name.localeCompare(b.name))

    const mobs = uniqueBy<Mob>(
      [
        ...weaponToMob(build.primaryWeapon),
        ...weaponToMob(build.secondaryWeapon),
        ...weaponToMob(build.head),
        ...weaponToMob(build.cloak),
        ...weaponToMob(build.chest),
        ...weaponToMob(build.hands),
        ...weaponToMob(build.legs),
        ...weaponToMob(build.feet),
        ...weaponToMob(build.necklace),
        ...weaponToMob(build.bracelet),
        ...weaponToMob(build.primaryRing),
        ...weaponToMob(build.secondaryRing),
        ...weaponToMob(build.belt),
      ],
      'name'
    ).sort((a, b) => a.name.localeCompare(b.name))

    return new BuildPresenter({
      id: build.id,
      scale: build.scale,
      type: build.type,
      className: build.class?.name,
      weapons: [build.class?.primary?.name, build.class?.secondary?.name],
      stuff,
      locations,
      mobs,
    })
  }
}

function weaponToMob(item: BelongsTo<typeof ItemModel>): Mob[] {
  return item.mobs.map(mobPresenter)
}

function mobPresenter(mob: any): Mob {
  return { name: mob.name }
}

function weaponToLocation(item: BelongsTo<typeof ItemModel>): Location[] {
  return item.mobs
    .map((mob) => mob.location)
    .map(locationPresenter)
    .filter((location) => location !== null)
}

function locationPresenter(location: any): Location | null {
  if (location === null) {
    return null
  }

  return { name: location.category.name + ' - ' + location.name }
}
