const fs = require('fs')

exports.params = async (ctx) => {
    ctx.body = ctx.params
}
exports.context = async (ctx) => {
    ctx.body = ctx
}
exports.error = async (ctx) => {
    throw new Error('There is an error. Redirect to error page')
}
exports.post = async (ctx) => {
    ctx.body = {
        body: ctx.request.body,
        file: ctx.request.files,
    }
}
exports.download = async (ctx) => {
    const filePath = './uploads/documents/hello.html'
    ctx.body = fs.createReadStream(filePath)
    ctx.attachment(filePath)
}
exports.cookie = async (ctx) => {
    if(ctx.request.params.action === 'set') {
        ctx.cookies.set('token', 'asdf1234', {httpOnly: false})
    }
    if(ctx.request.params.action === 'delete') {
        ctx.cookies.set('token', '', {httpOnly: false})
    }
    ctx.body = {
        token: ctx.cookies.get('token')
    }
}
exports.session = async (ctx) => {
    if(ctx.request.params.action === 'login') {
        ctx.session.login = true
    }
    if(ctx.request.params.action === 'logout') {
        ctx.session.login = false
    }
    ctx.redirect('/session-check')
    // let n = ctx.session.v  iews || 0;
    // ctx.session.views = ++n;
    // if(n === 1) {
    //     ctx.body = 'Welcome here for the first time!';
    // } else {
    //     ctx.body = `You've visited this page ${n} times`
    // }
}
exports.sessionCheck = async (ctx) => {
    if(ctx.session.login === true) {
        ctx.body = 'Authorized'
    }
    if(ctx.session.login === false) {
        ctx.body = 'Unauthorized'
    }
}
exports.auth = async (ctx) => {
    ctx.body = 'Access granted'
}
exports.middleware = async (ctx) => {
    ctx.body = {
        userId: ctx.userId
    }
}
exports.handleError = async (ctx) => {
    ctx.status = 500
    ctx.body = 'There is an error'
}