import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

import PlayerBuild from '#models/player_build'
import BuildsRepository from '../repositories/builds_repository.js'
import ClassesRepository from '../repositories/classes_repository.js'

@inject()
export default class BuildAddController {
  constructor(
    private buildRepository: BuildsRepository,
    private classesRepository: ClassesRepository
  ) {}

  async handle({ inertia }: HttpContext) {
    const classes = await this.classesRepository.all()

    const scales: PlayerBuild['scale'][] = [null, 'small', 'large']

    const types: PlayerBuild['type'][] = ['PvP', 'PvE']

    return inertia.render('builds/add', { classes, scales, types })
  }
}
