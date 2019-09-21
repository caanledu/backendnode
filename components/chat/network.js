const express =  require('express');//Traigo modulo de express tambien se puede con import
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router(); //Definimos el roputer para poder permitir separar cabeceras por metodos por url //Si queremos recibir peticiones get, post, delete, etc

router.post('/',function(req,res){
    controller.addChat(req.body.users)
    //Esto es utilizado cuando se utilizan promesas
    .then((data)=>{//FullMessage lo decuelve el controller en el resolve
        response.success(req, res,data,201);
    })
    .catch(err=>{
        response.error(req, res,'Internal error',500,err);
    })
});

router.get('/:userId',function(req,res){
    controller.listChats(req.params.userId)
        .then((users)=>{
            response.success(req,res,users,200);
        })
        .catch(err=>{
            response.error(req, res,'Internal Error', 500,err);
        })
});

module.exports = router;//Exportar el router