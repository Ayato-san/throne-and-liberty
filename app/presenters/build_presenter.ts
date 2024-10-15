import type PlayerBuild from '#models/player_build'

type Base = {
  name: string
}

type Item = Base & {}

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
  items: Item[]
  mobs: Mob[]
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
    items,
    mobs,
    locations,
  }: {
    id: string
    scale: string | null
    type: string
    className?: string
    weapons?: string[]
    items: Item[]
    mobs: Mob[]
    locations: Location[]
  }) {
    this.id = id
    this.scale = scale
    this.type = type
    this.items = items
    this.class = className
    this.weapons = weapons?.filter((weapon) => weapon !== null)
    this.mobs = mobs
    this.locations = locations
  }

  /** The method to create a player build presenter from a player build model */
  static fromModel(build: PlayerBuild) {
    const locations = build.items
      .map((item) =>
        item.mobs.map((mob) => {
          return { name: mob.location.name }
        })
      )
      .flat()

    return new BuildPresenter({
      id: build.id,
      scale: build.scale,
      type: build.type,
      className: build.class?.name,
      weapons: [build.class?.primary?.name, build.class?.secondary?.name],
      items: build.items.map((item) => ItemPresenter(item)),
      mobs: build.items
        .map((item) =>
          item.mobs.map((mob) => {
            return { name: mob.name }
          })
        )
        .flat(),
      locations: [...new Map(locations.map((item) => [item.name, item])).values()],
    })
  }
}

function ItemPresenter(item: Item) {
  return {
    name: item.name,
  }
}
