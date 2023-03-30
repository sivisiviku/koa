exports.auth = async (ctx, next) => {
    ctx.userId = '1234'
    next()
}