// CReamos un mooc = falasear la base de datos o un serv icio para mirar que todo funcionba correctamente

const list = [];

function addMessage(message){
    list.push(message);
}

function getMessage(){
    return list;
}

module.exports = {
    add:addMessage,
    list:getMessage,
    //get
    //update
    //delete
}