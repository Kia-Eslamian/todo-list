const {Schema, model} = require('mongoose');

const noteSchema = new Schema({
    user: {type: Schema.Types.ObjectId, required: true, ref: 'user', index: true},
    note: {type: String, minLength: 3, maxLength: 100, default: null},

}, {timestamps: true});


const noteModel = model('note', noteSchema);

module.exports = noteModel;
