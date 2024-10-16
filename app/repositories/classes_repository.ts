import WeaponAssociation from '#models/weapon_association'
import type { PublicOnly } from '#types/utils'

export default class ClassesRepository {
  /**
   * Fetch all builds from the database
   */
  async all() {
    const classes = await WeaponAssociation.query()
      .orderBy('weapon_associations.name')
      .select('id', 'name', 'primaryId', 'secondaryId')
      .preload('primary', (primaryQuery) => {
        primaryQuery.select('name')
      })
      .preload('secondary', (secondaryQuery) => {
        secondaryQuery.select('name')
      })

    return ClassesPresenter.fromArray(classes)
  }
}

export class ClassesPresenter {
  /** The id of the class */
  id: string
  /** The name of the class */
  name: string
  /** The primary weapon of the class */
  primary?: string
  /** The secondary weapon of the class */
  secondary?: string

  constructor({ id, name, primary, secondary }: PublicOnly<ClassesPresenter>) {
    this.id = id
    this.name = name
    this.primary = primary
    this.secondary = secondary
  }

  static fromArray(classes: WeaponAssociation[]) {
    return classes.map((asso) => {
      return new ClassesPresenter({
        id: asso.id,
        name: asso.name,
        primary: asso.primary?.name,
        secondary: asso.secondary?.name,
      })
    })
  }
}
