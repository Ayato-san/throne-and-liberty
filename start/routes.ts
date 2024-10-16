/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const BuildListsController = () => import('#controllers/build_lists_controller')
const BuildController = () => import('#controllers/build_controller')
const BuildAddController = () => import('#controllers/build_add_controller')

router.on('/').renderInertia('home')

/** Regex to verify ther uuid format */
const uuidRegex = /^[a-zA-Z0-9]{8}-([a-zA-Z0-9]{4}-){3}[a-zA-Z0-9]{12}$/

router.get('/builds', [BuildListsController, 'handle'])
router.get('/builds/add', [BuildAddController, 'handle'])
router.get('/builds/:id', [BuildController, 'handle']).where('id', uuidRegex)
