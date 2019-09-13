const express =  require('express');//Traigo modulo de express tambien se puede con import
const bodyParser = require('body-parser');//Para manejar los body de las peticiones
const router = express.Router(); //Definimos el roputer para poder permitir separar cabeceras por metodos por url //Si queremos recibir peticiones get, post, delete, etc
const response = require('./network/response');
var app = express();//Se incia

app.use(bodyParser.json());//Para recibir json, sepuede poner mas para recibir  otros tipos de cuerpos
app.use(bodyParser.urlencoded({extended:false}));//Para recibir cuerpo url encoded
app.use(router);//Añadimos el router

// app.use('/',function(req, res){ //Para cualquier ruta o peticion devuelve un hola
//     res.send('Hola');
// });

// router.get('/',function(req,res){
//     res.send('Hola desde get');
// });

// router.post('/',function(req,res){
//     res.send('Hola desde post');
// });

router.get('/message',function(req,res){
    // console.log(req.headers);
    res.header({
        "custom-header":"personalizado",
    })
    // res.send('Lista de mensajes');//Se pueden respuestas vacias
    // res.status(201).send();//Para responser con codigos de estadis distintos
    // res.status(201).send({'mensaje':'hola con respuesta'});
    response.success(req, res, 'Lista de mensajes');//Se creó una clase que realiza las respuestas de los métodos
});

router.post('/message',function(req,res){
    console.log(req.body);
    if(req.query.error=='ok'){//query recibe los parametros por url en la peticion realizada
        response.error(req, res,'Error inesperado',500,'Es solo una simulacion de los errores');
    }else{
        response.success(req, res, 'Creado correctamente',201);//Se creó una clase que realiza las respuestas de los métodos
    }
    // console.log(req.query);//Acceder a los parametros por query osea con parametros en la url Orderby
    // res.send('Mensaje añadido');
    // res.send('Mensaje ' + req.body.text+ ' añadido'); 
});

app.use('/app', express.static('public'));


app.listen(3000);//Le digo por que puerto escuchar

console.log('La aplicación esta escuchando en http://localhost:3000');