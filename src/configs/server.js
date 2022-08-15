const Hapi = require('@hapi/hapi');
const {host, port, allowedHost} = require("./environment");

const init = async (routes) => {
    const server = Hapi.server({
        port: port,
        host: host,
        routes: {
            cors: { // avoid CORS in all routes,
                // or you can use header: Access-Control-Allow-Origin
                // caution: for '*' do not use in production!
                origin: allowedHost.split(","),
            },
        },
    });

    server.route(routes);

    await server.start();
    console.log(`server is running on: ${server.info.uri}`);
};

module.exports = init;
