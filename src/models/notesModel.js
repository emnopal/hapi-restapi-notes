const notesSchema = require('../schemas/notesSchema');
const mongoose = require('mongoose');

const notesModel = new mongoose.model('notes', notesSchema);

module.exports = notesModel;
