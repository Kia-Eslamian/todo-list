const {Schema, model} = require('mongoose');

const taskSchema = new Schema({
    user: {type: Schema.Types.ObjectId, required: true, ref: 'user', index: true},
    title: {type: String, minLength: 3, maxLength: 100, required: true},
    description: {type: String, minLength: 3, maxLength: 100, default: null},
    status: {type: Boolean, default: false},

}, {timestamps: true});


const TaskModel = model('task', taskSchema);

module.exports = TaskModel;
