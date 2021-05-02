//import mongoose from 'mongoose';
var mongoose = require('mongoose');
const { Schema } = mongoose;

const newsSchema = new Schema({
    title: { type: String, required: true }, // String is shorthand for {type: String}
    description: String,
    body: String,
    comments: [{ body: String, date: Date }],
    created: { type: Date, default: Date.now },
    //hidden: Boolean,
    meta: {
        votes: Number,
        favs: Number
    }
});

module.exports = mongoose.model('News', newsSchema)