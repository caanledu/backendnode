// Vamos a utilzar mongo db para la base de datos con mongoose
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    user: String,
    message:{
        type:String,
        required:true
    },
    date:Date
});

const model = mongoose.model('Message',mySchema);
module.exports = model;