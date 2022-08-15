const Hapi = require('@hapi/hapi');

const init = async (routes, port = 5000, host = 'localhost') => {
    const server = Hapi.server({
        port: port,
        host: host,
        routes: {
            cors: { // avoid CORS in all routes
                // caution: for * do not use in production!
                origin: ['*'], // or you can use header: Access-Control-Allow-Origin
            },
        },
    });

    server.route(routes);

    await server.start();
    console.log(`server is running on: ${server.info.uri}`)
}

module.exports = init;