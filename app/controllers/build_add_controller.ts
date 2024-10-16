import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

import PlayerBuild from '#models/player_build'
import BuildsRepository from '../repositories/builds_repository.js'
import ClassesRepository from '../repositories/classes_repository.js'
import vine from '@vinejs/vine'

@inject()
export default class BuildAddController {
  constructor(
    private buildRepository: BuildsRepository,
    private classesRepository: ClassesRepository
  ) {}

  /** The schema to validate the request */
  static schema = vine.object({
    class: vine.string().uuid(),
    scale: vine.enum(['small', 'large']).optional().requiredWhen('type', '=', 'PvP'),
    type: vine.enum(['PvP', 'PvE']),
  })

  async handle({ inertia }: HttpContext) {
    const classes = await this.classesRepository.all()

    const scales: Exclude<PlayerBuild['scale'], null>[] = ['small', 'large']

    const types: PlayerBuild['type'][] = ['PvP', 'PvE']

    return inertia.render('builds/add', { classes, scales, types })
  }

  async execute({ request, response }: HttpContext) {
    const data = request.only(['class', 'scale', 'type'])

    const validateData = await vine.validate({ schema: BuildAddController.schema, data })

    await this.buildRepository.create(validateData)

    response.redirect().back()
  }
}
