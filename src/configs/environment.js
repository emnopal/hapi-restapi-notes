const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    host: process.env.API_HOST,
    port: process.env.API_PORT,
    allowedHost: process.env.ALLOWED_HOST,
    db: process.env.MONGODB_URL,
};
