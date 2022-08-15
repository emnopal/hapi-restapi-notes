const notesModel = require('../models/notesModel');
const notesFailHandler = require('../helpers/notesFailHandler');
const notesSuccessHandler = require('../helpers/notesSuccessHandler');

const addNoteHandler = async (request, h) => {
    const {title, tags, body} = request.payload;

    try{
        const notes = new notesModel({
            title: title,
            tags: tags,
            body: body,
        });
        const result = await notes.save();
        return notesSuccessHandler({
            h: h,
            data: {
                success: result,
            },
            message: 'Success added notes',
        });
    } catch (error) {
        console.log(error);
        return notesFailHandler({
            h: h,
            data: {
                error: error,
            },
            message: 'Fail added notes',
        });
    }
};

const getAllNotesHandler = async (request, h) => {
    try{
        const notes = await notesModel.find().exec();
        return notesSuccessHandler({
            h: h,
            data: {
                notes: notes,
            },
            message: 'Success get all notes',
        });
    } catch (error) {
        console.log(error);
        return notesFailHandler({
            h: h,
            data: {
                error: error,
            },
            message: 'Fail get all notes',
        });
    }
};

const getNoteHandler = async (request, h) => {
    const {id} = request.params;

    try{
        const note = await notesModel.findById(id).exec();
        return notesSuccessHandler({
            h: h,
            data: {
                note: note,
            },
            message: 'Success getting note ${id}',
        });
    } catch (error) {
        console.log(error);
        return notesFailHandler({
            h: h,
            data: {
                error: error,
            },
            statusCode: 404,
            message: 'Failed to getting note ${id}, note ${id} not found',
        });
    }
};

const editNoteHandler = async (request, h) => {
    const {id} = request.params;
    const {title, tags, body} = request.payload;
    const updatedAt = new Date().toISOString();

    const updatedData = {
        title: title,
        tags: tags,
        body: body,
        updatedAt: updatedAt,
    };
    const isNew = {
        new: true
    };

    try{
        const result = await notesModel.findByIdAndUpdate(id, updatedData, isNew).exec();
        return notesSuccessHandler({
            h: h,
            data: {
                result: result,
            },
            message: 'Success change note ${id}',
        });
    } catch (error) {
        return notesFailHandler({
            h: h,
            data: {
                error: error,
            },
            statusCode: 404,
            message: 'Failed to changing note ${id}, note ${id} not found',
        });
    }
};

const deleteNoteHandler = async (request, h) => {

    const {id} = request.params;

    try{
        const result = await notesModel.findByIdAndDelete(id).exec();
        return notesSuccessHandler({
            h: h,
            data: {
                result: result,
            },
            message: 'Success deleting note ${id}',
        });
    } catch (error) {
        return notesFailHandler({
            h: h,
            data: {
                error: error,
            },
            statusCode: 404,
            message: 'Failed to deleting note ${id}, note ${id} not found',
        });
    }
};

module.exports = {
    addNoteHandler,
    getAllNotesHandler,
    getNoteHandler,
    editNoteHandler,
    deleteNoteHandler,
};
