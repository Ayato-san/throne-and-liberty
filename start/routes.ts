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

router.on('/').renderInertia('home')

router.get('/builds', [BuildListsController, 'handle'])
router.get('/builds/:id', [BuildController, 'handle'])
