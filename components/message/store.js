// CReamos un mooc = falasear la base de datos o un serv icio para mirar que todo funcionba correctamente
// const list = [];
// function addMessage(message){
//     list.push(message);
// }
// function getMessage(){
//     return list;
// }

//CONECTANDO A BASE DE DATOS DE MONGO EN cada componente
// const db = require('mongoose');
const Model = require('./model');
// db.Promise = global.Promise;
// // usuario:contraseña
// db.connect('mongodb+srv://mongo:mongo@cluster0-jjtff.mongodb.net/test?retryWrites=true&w=majority',{
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// });



function addMessage(message){
    const myMessage = new Model(message);
    myMessage.save();
}

async function getMessage(filterUser){
    let filter = {};
    if(filterUser!=null){
        filter = {user:filterUser}
    }
    const messages = await Model.find(filter);
    return messages;
}

async function updateText(id, message){
    const foundmessage = await Model.findOne({//BUscA EN MONGO EL REGISTOR POR EL ID
        _id:id
    });

    foundmessage.message = message;
    const newMessage = await foundmessage.save();
    return newMessage;
}

function removeMessage(id){
    return Model.deleteOne({
        _id:id
    });
}
// cloud.mongodb.com,

module.exports = {
    add:addMessage,
    list:getMessage,
    updateText:updateText,
    remove:removeMessage
    //get
    //update
    //delete
}