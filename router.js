// const route = require("./routers/index.router");

// const routers = [{ prefix: 'user', rts: route.User },
// { prefix: 'auth', rts: route.Auth },
// { prefix: 'vendor', rts: route.Vendor },
// { prefix: 'job', rts: route.Job }];

// module.exports = (app) => {
//     routers.forEach(route => app.use(`/${route.prefix}`, route.rts))
// }

const { User, Auth, Vendor, Job } = require('./routers/index.router');
module.exports = (app) => {
    app.use('/user', User)
    app.use('/auth', Auth)
    app.use('/vendor', Vendor)
    app.use('/job', Job)
}