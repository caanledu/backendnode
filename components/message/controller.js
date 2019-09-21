const store = require('./store');

function addMessage(user, message){
    //Enviamos los datos en una promesa para decirle al ewtwork que algo ha salidop bien o mal (informacion del usuario)
    return new Promise((resolve, reject)=>{
        if(!user || !message){
            console.log('[Message controller] No hay usuario o mensaje');
            reject('Los datos son incorrectos');
            return false;
        }
        const fullMessage={
            user:user,
            message:message,
            date: new Date()
        }
        // console.log(fullMessage);
        store.add(fullMessage);
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