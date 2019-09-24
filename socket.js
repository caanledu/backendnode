//Este archivo  se va a encargar de inicializar nuestor servidor de socket io, crear una instancia y poderla compartir

const socketIO = require('socket.io');
const socket = {};//cREAM,OS LA variable socket para pasar valores por referencia

function connect(server){
    socket.io = socketIO(server);//inicializamos io dentro de la variable socket

};

//Para que se pueda ver en cualquioer sitio
//
module.exports={
    connect,
    socket
}