const Router = require('koa-router')
const auth = require('koa-basic-auth')
const controller = require('../controller/index')
const mandatoryMiddleware = require('../middleware/mandatory')
const optionalMiddleware = require('../middleware/optional')

const router = new Router()

const credential = { name: 'richard', pass: '1234' }

router.get('/', ...mandatoryMiddleware)
// we can use regex to match the params, if the params not match, the return will be not found
router.get('/params/:id([0-9]{5})', controller.params)
router.get('/context', controller.context)
router.get('/error', controller.error)
router.post('/post', controller.post)
router.get('/download', controller.download)
router.get('/cookie/:action', controller.cookie)
router.get('/session/:action', controller.session)
router.get('/session-check', controller.sessionCheck)
router.get('/auth', auth(credential), controller.auth)
router.get('/middleware', optionalMiddleware.auth, controller.middleware)
router.get('/handle-error', controller.handleError)

module.exports = router;