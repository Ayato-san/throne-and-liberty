import type { BelongsTo } from '@adonisjs/lucid/types/relations'

import type ItemModel from '#models/item'
import type PlayerBuild from '#models/player_build'
import type { PublicOnly } from '#types/utils'
import { uniqueBy } from '../utils/array.js'

type Base = {
  name: string
}

type Item = Base & { image: string }

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

/** The presenter for the player builds */
export default class BuildPresenter {
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
      primaryWeapon: { name: build.primaryWeapon.name, image: build.primaryWeapon.image },
      secondaryWeapon: { name: build.secondaryWeapon.name, image: build.secondaryWeapon.image },
      head: { name: build.head.name, image: build.head.image },
      cloak: { name: build.cloak.name, image: build.cloak.image },
      chest: { name: build.chest.name, image: build.chest.image },
      hands: { name: build.hands.name, image: build.hands.image },
      legs: { name: build.legs.name, image: build.legs.image },
      feet: { name: build.feet.name, image: build.feet.image },
      necklace: { name: build.necklace.name, image: build.necklace.image },
      bracelet: { name: build.bracelet.name, image: build.bracelet.image },
      primaryRing: { name: build.primaryRing.name, image: build.primaryRing.image },
      secondaryRing: { name: build.secondaryRing.name, image: build.secondaryRing.image },
      belt: { name: build.belt.name, image: build.belt.image },
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
