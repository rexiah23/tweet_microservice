import { Router}           from 'express'
import expressHttpCallback from './express_http_callback/index.js'
import controller          from './controllers/index.js'

const routes = Router({})

routes.post('/tweet', expressHttpCallback(controller['postTweet']))
routes.put('/tweet',  expressHttpCallback(controller['updateTweet']))

export default routes


