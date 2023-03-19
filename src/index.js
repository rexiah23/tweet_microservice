import { Router}           from 'express'
import expressHttpCallback from './express_http_callback/index.js'
import controller          from './controllers/index.js'

console.log('inside source index!')
// Initialize router
const routes = Router({})

routes.post('/tweet', expressHttpCallback(controller['postTweet']))

export default routes


