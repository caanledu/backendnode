// Vamos a utilzar mongo db para la base de datos con mongoose
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    chat:{
        type:Schema.ObjectId,
        ref:'Chat',
    },
    user: {
        type:Schema.ObjectId,//Tipo de usuario es ObjectId
        ref:'User',//La referencia es un usuario
    },
    message:{
        type:String,
        required:true
    },
    date:Date,
    file:String
});

// const mySchema = new Schema({
//     user: String,
//     message:{
//         type:String,
//         required:true
//     },
//     date:Date
// });

const model = mongoose.model('Message',mySchema);
module.exports = model;