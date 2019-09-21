const express =  require('express');//Traigo modulo de express tambien se puede con import
const router = express.Router(); //Definimos el roputer para poder permitir separar cabeceras por metodos por url //Si queremos recibir peticiones get, post, delete, etc
const response = require('../../network/response');
const controller = require('./controller');

router.get('/',function(req,res){
    const filterMessage = req.query.user || null;
    controller.getMessages(filterMessage)
        .then((messageList)=>{
            response.success(req,res,messageList,200);
        })
        .catch(e=>{
            response.error(req, res,'Unexpected Error', 500,e);
        })
//     res.header({
//         "custom-header":"personalizado",
//     })
//    response.success(req, res, 'Lista de mensajes');//Se creó una clase que realiza las respuestas de los métodos
});

router.post('/',function(req,res){
    controller.addMessage(req.body.user,req.body.message)
    //Esto es utilizado cuando se utilizan promesas
    .then((fullMessage)=>{//FullMessage lo decuelve el controller en el resolve
        response.success(req, res,fullMessage,201);
    })
    .catch(e=>{
        response.error(req, res,'Información inválida',400,'Error en el controlador');
    })

    // //  Asi cuando no se utilizan promesas y se envian datos por la url
    // if(req.query.error=='ok'){//query recibe los parametros por url en la peticion realizada
    //     response.error(req, res,'Error inesperado',500,'Es solo una simulacion de los errores');
    // }else{
    //     response.success(req, res, 'Creado correctamente',201);//Se creó una clase que realiza las respuestas de los métodos
    // }

});

router.patch('/:id', function(req, res){
    console.log(req.params.id);
    controller.updateMessage(req.params.id, req.body.message)
    .then((data)=>{
        response.success(req,res,data,200);
    })
    .catch(e=>{
        response.error(req,res,'Error interno',500,e);
    });
})

router.delete('/:id',function(req,res){
    controller.deleteMessage(req.params.id)
    .then(()=>{
        response.success(req, res, `Usuario ${req.params.id} eliminado`,200);
    })
    .catch(e=>{
        response.error(req,res,'Error interno',500, e);
    })
});


// // app.use('/',function(req, res){ //Para cualquier ruta o peticion devuelve un hola
// //     res.send('Hola');
// // });

// // router.get('/',function(req,res){
// //     res.send('Hola desde get');
// // });

// // router.post('/',function(req,res){
// //     res.send('Hola desde post');
// // });

// router.get('/message',function(req,res){
//     // console.log(req.headers);
//     res.header({
//         "custom-header":"personalizado",
//     })
//     // res.send('Lista de mensajes');//Se pueden respuestas vacias
//     // res.status(201).send();//Para responser con codigos de estadis distintos
//     // res.status(201).send({'mensaje':'hola con respuesta'});
//     response.success(req, res, 'Lista de mensajes');//Se creó una clase que realiza las respuestas de los métodos
// });

// router.post('/message',function(req,res){
//     console.log(req.body);
//     if(req.query.error=='ok'){//query recibe los parametros por url en la peticion realizada
//         response.error(req, res,'Error inesperado',500,'Es solo una simulacion de los errores');
//     }else{
//         response.success(req, res, 'Creado correctamente',201);//Se creó una clase que realiza las respuestas de los métodos
//     }
//     // console.log(req.query);//Acceder a los parametros por query osea con parametros en la url Orderby
//     // res.send('Mensaje añadido');
//     // res.send('Mensaje ' + req.body.text+ ' añadido'); 
// });

module.exports = router;//Exportar el router