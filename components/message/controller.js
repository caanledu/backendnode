const store = require('./store');
const socket = require('../../socket').socket;//Nos traemos el objeto donde se habia guardado nuiestra instancia de socket.io para no traer todo socket;
function addMessage(chat,user, message,file){
    //Enviamos los datos en una promesa para decirle al ewtwork que algo ha salidop bien o mal (informacion del usuario)
    return new Promise((resolve, reject)=>{
        if(!chat || !user || !message){
            console.log('[Message controller] No hay chat, usuario o mensaje');
            reject('Los datos son incorrectos');
            return false;
        }

        let fileUrl = '';
        if(file){
            fileUrl = 'http://localhost:3000/app/files/'+file.filename;
        }
        const fullMessage={
            chat:chat,
            user:user,
            message:message,
            date: new Date(),
            file:fileUrl
        }
        // console.log(fullMessage);
        store.add(fullMessage);

        socket.io.emit('message',fullMessage);

        resolve(fullMessage);
    });
    // const fullMessage={
    //     user:user,
    //     message:message,
    //     date: new Date()
    // }
    // console.log(fullMessage);
}

function getMessages(filterUser){
    return new Promise((resolve, reject)=>{
        resolve(store.list(filterUser));
    });
}

 function updateMessage(id, message){
    return new Promise(async(resolve, reject)=>{
        if(!id || !message){
            reject('Invalid data');
            return false;
        }
       const result = await store.updateText(id,message);
       resolve(result);
    });
}

function deleteMessage(id){
    return new Promise((resolve, reject)=>{
        if(!id){
            reject('Id inválido');
            return false;
        }
        store.remove(id)
        .then(()=>{
            resolve();
        })
        .catch(e=>{
            reject(e);
        })
    }
        
    )
}

module.exports = {
    addMessage,
    getMessages,
    updateMessage, 
    deleteMessage
};