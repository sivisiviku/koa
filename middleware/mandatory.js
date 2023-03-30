const middlewares = [
    async (ctx, next) => {
        console.log(1)
        await next()
        console.log(2)
    },
    async (ctx, next) => {
        console.log(3)
        await next()
        console.log(4)
    },
    async (ctx) => {
        console.log(5)
        ctx.body = "Hello koa"
        console.log(6)
    },
]

module.exports = middlewares