/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

// region Controller's Imports
const AppController = () => import('#controllers/app_controller')
// endregion

router.get('/', [AppController, 'index'])
