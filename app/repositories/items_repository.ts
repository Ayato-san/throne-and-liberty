import Item from '#models/item'
import type { PublicOnly } from '#types/utils'
import { uniqueBy } from '../utils/array.js'

type Base = {
  name: string
}

type Mob = Base & {
  dropChance?: number
}

type Location = Base & {}

export default class ItemsRepository {
  /**
   * Fetch all items from the database
   */
  async all() {
    const classes = await Item.query().select('id', 'name', 'image').orderBy('name')

    return ItemsPresenter.fromArray(classes)
  }

  /**
   * Fetch a item by its id
   */
  async find(id: string) {
    const item = await Item.query()
      .select('id', 'name', 'image', 'categoryId', 'tierId', 'gameslanternUrl')
      .where('id', id)
      .preload('category', (categoryQuery) => {
        categoryQuery.select('name')
      })
      .preload('tier', (tierQuery) => {
        tierQuery.select('name', 'color')
      })
      .withScopes((query) => query.locationName())
      .firstOrFail()

    return ItemPresenter.fromModel(item)
  }
}

export class ItemsPresenter {
  /** The id of the item */
  id: string
  /** The name of the item */
  name: string
  /** The image of the item */
  image: string

  constructor({ id, name, image }: PublicOnly<ItemsPresenter>) {
    this.id = id
    this.name = name
    this.image = image
  }

  static fromArray(items: Item[]) {
    return items.map((item) => {
      return new ItemsPresenter({
        id: item.id,
        name: item.name,
        image: item.image,
      })
    })
  }
}

export class ItemPresenter {
  /** The id of the item */
  id: string
  /** The name of the item */
  name: string
  /** The image of the item */
  image: string
  /** The gameslantern url of the item */
  gameLanternUrl: string | null
  /** The category of the item */
  category: string
  /** The tier of the item */
  tier: string
  /** The color of the tier */
  color: string
  /** The mobs that the item belongs */
  mobs: Mob[]
  /** The locations of the item */
  locations: Location[]

  constructor({
    id,
    name,
    image,
    gameLanternUrl,
    category,
    tier,
    color,
    mobs,
    locations,
  }: PublicOnly<ItemPresenter>) {
    this.id = id
    this.name = name
    this.image = image
    this.gameLanternUrl = gameLanternUrl
    this.category = category
    this.tier = tier
    this.color = color
    this.mobs = mobs
    this.locations = locations
  }

  static fromModel(item: Item) {
    const mobs: Mob[] = item.mobs
      .map((mob) => {
        return {
          name: mob.name,
          dropChance: mob.dropChance,
        }
      })
      .sort((a, b) => a.name.localeCompare(b.name))

    const locations = uniqueBy<Location>(
      item.mobs
        .map((mob) => mob.location)
        .map(locationPresenter)
        .filter((location) => location !== null),
      'name'
    ).sort((a, b) => a.name.localeCompare(b.name))

    return new ItemPresenter({
      id: item.id,
      name: item.name,
      image: item.image,
      gameLanternUrl: item.gameslanternUrl,
      category: item.category.name,
      tier: item.tier.name,
      color: item.tier.color,
      mobs,
      locations,
    })
  }
}

function locationPresenter(location: any): Location | null {
  if (location === null) {
    return null
  }

  return { name: location.category.name + ' - ' + location.name }
}
