const express =  require('express');//Traigo modulo de express tambien se puede con import
const app = express();//Se incia
const server = require('http').Server(app);//Utilizado en sockets y exporta una funcipón

const config = require('./config');//Va con barra por ser un arrchivo

const cors = require('cors');
const socket = require('./socket');
const bodyParser = require('body-parser');//Para manejar los body de las peticiones
const db = require('./db');//Llamar la conexión con la base de datos
// const router = require('./components/messages/network');
const router = require('./network/routes');

db(config.dburl);

app.use(cors());//Utyilizop cors para evitar problemas de conexion
app.use(bodyParser.json());//Para recibir json, sepuede poner mas para recibir  otros tipos de cuerpos
app.use(bodyParser.urlencoded({extended:false}));//Para recibir cuerpo url encoded
// app.use(router);//Añadimos el router

socket.connect(server);//Le pasamos el servidor http
router(app);


app.use('/app', express.static('public'));

// app.listen(3000);//Le digo por que puerto escuchar
server.listen(config.port, function(){//Esto es utilizado al implementar sockets
    console.log('La aplicación esta escuchando en http://localhost:3000');
});
// console.log('La aplicación esta escuchando en http://localhost:3000');