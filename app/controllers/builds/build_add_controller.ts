import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

import PlayerBuild from '#models/player_build'
import ItemsRepository from '#repositories/items_repository'
import BuildsRepository from '../../repositories/builds_repository.js'
import ClassesRepository from '../../repositories/classes_repository.js'

@inject()
export default class BuildAddController {
  constructor(
    private buildRepository: BuildsRepository,
    private classesRepository: ClassesRepository,
    private itemsRepository: ItemsRepository
  ) {}

  /** The validator of the request */
  static validator = vine.compile(
    vine.object({
      class: vine.string().uuid(),
      scale: vine.enum(['small', 'large']).optional().requiredWhen('type', '=', 'PvP'),
      type: vine.enum(['PvP', 'PvE']),
      primaryWeapon: vine.string().uuid(),
      secondaryWeapon: vine.string().uuid(),
      helmet: vine.string().uuid(),
      cloak: vine.string().uuid(),
      chest: vine.string().uuid(),
      gloves: vine.string().uuid(),
      legs: vine.string().uuid(),
      boots: vine.string().uuid(),
      necklaces: vine.string().uuid(),
      bracelets: vine.string().uuid(),
      primaryRing: vine.string().uuid(),
      secondaryRing: vine.string().uuid(),
      belt: vine.string().uuid(),
    })
  )

  async handle({ inertia }: HttpContext) {
    const classes = await this.classesRepository.all()

    const scales: Exclude<PlayerBuild['scale'], null>[] = ['small', 'large']

    const types: PlayerBuild['type'][] = ['PvP', 'PvE']

    const weapons = await this.itemsRepository.allByCategory('Weapon')
    const helmets = await this.itemsRepository.allByCategory('Helmet')
    const cloaks = await this.itemsRepository.allByCategory('Cloak')
    const chests = await this.itemsRepository.allByCategory('Chest')
    const gloves = await this.itemsRepository.allByCategory('Hands')
    const legs = await this.itemsRepository.allByCategory('Legs')
    const boots = await this.itemsRepository.allByCategory('Feet')
    const necklaces = await this.itemsRepository.allByCategory('Necklace')
    const bracelets = await this.itemsRepository.allByCategory('Bracelet')
    const rings = await this.itemsRepository.allByCategory('Ring')
    const belts = await this.itemsRepository.allByCategory('Belt')

    return inertia.render('builds/add', {
      classes,
      scales,
      types,
      weapons,
      helmets,
      cloaks,
      chests,
      gloves,
      legs,
      boots,
      necklaces,
      bracelets,
      rings,
      belts,
    })
  }

  async execute({ request, response }: HttpContext) {
    const data = request.only([
      'class',
      'scale',
      'type',
      'primaryWeapon',
      'secondaryWeapon',
      'helmet',
      'cloak',
      'chest',
      'gloves',
      'legs',
      'boots',
      'necklaces',
      'bracelets',
      'primaryRing',
      'secondaryRing',
      'belt',
    ])

    const validateData = await BuildAddController.validator.validate(data)

    const id = await this.buildRepository.create(validateData)
    if (id) {
      response.redirect().toPath(`/builds/${id}`)
    } else {
      response.redirect().back()
    }
  }
}
