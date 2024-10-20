/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const BuildsListController = () => import('#controllers/builds/builds_list_controller')
const BuildsCompareController = () => import('#controllers/builds/builds_compare_controller')
const BuildController = () => import('#controllers/builds/build_controller')
const BuildAddController = () => import('#controllers/builds/build_add_controller')
const ItemsListController = () => import('#controllers/items/items_list_controller')
const ItemController = () => import('#controllers/items/item_controller')

router.on('/').renderInertia('home')

/** Regex to verify ther uuid format */
const uuidRegex = /^[a-zA-Z0-9]{8}-([a-zA-Z0-9]{4}-){3}[a-zA-Z0-9]{12}$/

router.get('/builds', [BuildsListController, 'handle'])
router.get('/builds/add', [BuildAddController, 'handle'])
router.post('/builds/add', [BuildAddController, 'execute'])
router.get('/builds/:id', [BuildController, 'handle']).where('id', uuidRegex)
router.get('/builds/compare', [BuildsCompareController, 'handle'])

router.get('/items', [ItemsListController, 'handle'])
router.get('/items/:id', [ItemController, 'handle']).where('id', uuidRegex)
