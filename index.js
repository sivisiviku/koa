const Koa = require('koa')
const { koaBody } = require('koa-body')
const serve = require('koa-static')
const session = require('koa-session')
const staticCache = require('koa-static-cache')
const path = require('path')
const logger = require('koa-logger')
const router = require('./router/index')

const app = new Koa()

function handle404Error(ctx, next) {
    if(ctx.status != 404) next()
    ctx.status = 404
    ctx.body = 'Not found'
}

app.use(logger())
app.use(koaBody({
    formidable: {
        uploadDir: './uploads/avatar', 
        keepExtensions: true, 
        multiples: true,
    },
    multipart: true,
    urlencoded: true
}))
app.use(staticCache(path.join(__dirname, '/uploads/documents'), {
    maxAge: 365 * 24 * 60 * 60
}))
app.use(serve('./uploads/documents')) // to serve static file (baseurl/[filename])
app.keys = ['secretkey']
app.use(session(app))
app.use(async (ctx, next) => {
    try {
        await next()
    } catch(error) {
        if(error.status === 401) {
            ctx.status = error.status
            ctx.set('WWW-Authenticate', 'Basic')
            ctx.body = 'No access'
        } else {
            console.log(error.message)
            ctx.redirect('/handle-error')
        }
    }
})
app.use(router.routes())
app.use(router.allowedMethods())
app.use(handle404Error)

app.listen(3000, function() {
    console.log('Server running on port 3000')
})