import type PlayerBuild from '#models/player_build'

interface Item {
  name: string
}

/** The presenter for the player builds */
export default class BuildsPresenter {
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
  }: {
    id: string
    scale: string | null
    type: string
    className?: string
    weapons?: string[]
    items: Item[]
  }) {
    this.id = id
    this.scale = scale
    this.type = type
    this.items = items
    this.class = className
    this.weapons = weapons?.filter((weapon) => weapon !== null)
  }

  static async fromPromise(promise: Promise<PlayerBuild[]>): Promise<BuildsPresenter[]> {
    const builds = await promise
    return BuildsPresenter.fromArray(builds)
  }

  /** The method to create a player build presenter from a player build model */
  static fromModel(build: PlayerBuild) {
    return new BuildsPresenter({
      id: build.id,
      scale: build.scale,
      type: build.type,
      className: build.class?.name,
      weapons: [build.class?.primary?.name, build.class?.secondary?.name],
      items: build.items.map((item) => ItemPresenter(item)),
    })
  }

  /** The method to create an array of player build presenters from an array of player build models */
  static fromArray(builds: PlayerBuild[]) {
    const buildPresenters = []
    for (const build of builds) {
      buildPresenters.push(BuildsPresenter.fromModel(build))
    }
    return buildPresenters
  }
}

function ItemPresenter(item: Item) {
  return {
    name: item.name,
  }
}
