import { Router} from 'express'
import expressHttpCallback from './express_http_callback/index.js'
import controller from './controllers/index.js'

// Initialize router
const routes = Router({})

routes.get('/', expressHttpCallback(controller['testController']))

export default routes


