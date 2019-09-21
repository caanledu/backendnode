const express =  require('express');//Traigo modulo de express tambien se puede con import
const bodyParser = require('body-parser');//Para manejar los body de las peticiones

const db = require('./db');//Llamar la conexión con la base de datos
// const router = require('./components/messages/network');
const router = require('./network/routes');

db('mongodb+srv://mongo:mongo@cluster0-jjtff.mongodb.net/test?retryWrites=true&w=majority');
var app = express();//Se incia

app.use(bodyParser.json());//Para recibir json, sepuede poner mas para recibir  otros tipos de cuerpos
app.use(bodyParser.urlencoded({extended:false}));//Para recibir cuerpo url encoded
// app.use(router);//Añadimos el router

router(app);


app.use('/app', express.static('public'));

app.listen(3000);//Le digo por que puerto escuchar
console.log('La aplicación esta escuchando en http://localhost:3000');