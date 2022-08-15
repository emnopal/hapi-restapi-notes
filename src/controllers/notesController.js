const {nanoid} = require('nanoid');
const notes = require('../models/notesModel');
const notesFailHandler = require('../helpers/notesFailHandler');
const notesSuccessHandler = require('../helpers/notesSuccessHandler');

const addNoteHandler = (request, h) => {

    const {title, tags, body} = request.payload;
    const id = nanoid(16) // handling autogenerate id, with size is 16 bit
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
        id, title, tags, body, createdAt, updatedAt
    }

    notes.push(newNote);

    // check if notes is success appended into notes array
    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    return isSuccess ? notesSuccessHandler({
        h: h, data: {
            noteId: id,
        }, message: 'Success added notes'
    }) : notesFailHandler({
        h: h, message: 'Fail added notes'
    });

};

const getAllNotesHandler = (request, h) => {
    return notesSuccessHandler({
        h: h, data: {
            notes: notes
        }, message: 'Success get all notes'
    });
};

const getNoteHandler = (request, h) => {

    const {id} = request.params;
    const note = notes.filter((n) => n.id === id)[0];

    return note ? notesSuccessHandler({
        h: h, data: {
            note: note,
        }, message: `Success getting note ${id}`
    }) : notesFailHandler({
        h: h, message: `Failed to getting note ${id}, note ${id} not found`, statusCode: 404
    });
};

const editNoteHandler = (request, h) => {

    const {id} = request.params;
    const {title, tags, body} = request.payload;
    const updatedAt = new Date().toISOString();
    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1 || index !== false) {
        notes[index] = {
            ...notes[index], title, tags, body, updatedAt,
        }
        return notesSuccessHandler({
            h: h, message: `Success change note ${id}`
        })
    }

    return notesFailHandler({
        h: h, message: `Failed to changing note ${id}, note ${id} not found`, statusCode: 404
    });
};

const deleteNoteHandler = (request, h) => {

    const {id} = request.params;
    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1 || index !== false) {
        notes.splice(index, 1)
        return notesSuccessHandler({
            h: h, message: `Success deleting note ${id}`
        })
    }

    return notesFailHandler({
        h: h, message: `Failed to deleting note ${id}, note ${id} not found`, statusCode: 404
    });
};

module.exports = {
    addNoteHandler, getAllNotesHandler, getNoteHandler, editNoteHandler, deleteNoteHandler
}