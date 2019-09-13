const express =  require('express');//Traigo modulo de express tambien se puede con import
const bodyParser = require('body-parser');//Para manerar los doby de las peticiones
const router = express.Router(); //Definimos el roputer para poder permitir separar cabeceras por metodos por url //Si queremos recibir peticiones get, post, delete, etc

var app = express();//Se incia

app.use(bodyParser.json());//Para recibir json, sepuede poner mas para recibir  otros tipos de cuerpos
app.use(bodyParser.urlencoded({extended:false}));//Para recibir cuerpo url encoded
app.use(router);//Añadimos el rouyter

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
    console.log(req.headers);
    res.header({
        "custom-header":"personalizado",
    })
    // res.send('Lista de mensajes');//Se pueden respuestas vacias
    // res.status(201).send();//Para responser con codigos de estadis distintos
    res.status(201).send({'mensaje':'hola con respuesta'});
});

router.post('/message',function(req,res){
    console.log(req.body);
    // console.log(req.query);//Acceder a los parametros por query osea con parametros en la url Orderby
    res.send('Mensaje añadido');
    // res.send('Mensaje ' + req.body.text+ ' añadido');
});


app.listen(3000);//Le digo por que puerto escuchar

console.log('La aplicación esta escuchando en http://localhost:3000');