const init = require('./configs/server');
const routes = require('./routes/notesRoute');
const db = require('./configs/database');

const start = async() => {
    try{
        await db.connect();
        await init(routes);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

start();
