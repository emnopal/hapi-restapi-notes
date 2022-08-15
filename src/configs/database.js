const mongoose = require('mongoose');
const {db} = require("./environment");

module.exports.connect = async () => {
    return await mongoose.connect(db);
};

module.exports.mongoose = mongoose;
