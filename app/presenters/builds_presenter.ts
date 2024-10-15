import type PlayerBuild from '#models/player_build'

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
  }: {
    id: string
    scale: string | null
    type: string
    className?: string
    weapons?: string[]
  }) {
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
