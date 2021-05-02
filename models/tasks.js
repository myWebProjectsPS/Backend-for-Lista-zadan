//import mongoose from 'mongoose';
var mongoose = require('mongoose');
const { Schema } = mongoose;

const TasksSchema = new Schema({
    title: { type: String, required: true }, // String is shorthand for {type: String}
    description: String,
    body: String,
    id:String,
    vflags1:String,
    deadline:String,
    fl:String,
    tags:[String],
    //comments: [{ body: String, date: Date }],
    createdTime: { type: Date, default: Date.now },
    //hidden: Boolean,
    // meta: {
    //     votes: Number,
    //     favs: Number
    // }
});

module.exports = mongoose.model('Tasks1', TasksSchema)