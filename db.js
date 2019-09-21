const db = require('mongoose');

db.Promise = global.Promise;

//Se crea con async para asegurarnos de que cada que se llame se conecte correctamente
//'mongodb+srv://mongo:mongo@cluster0-jjtff.mongodb.net/test?retryWrites=true&w=majority'
async function connect(url){
    // usuario:contraseña
    await db.connect(url,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    });
    console.log('[db] conectada con exito');
}


module.exports = connect;//La exportamos como la función principal