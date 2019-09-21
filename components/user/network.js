const express =  require('express');//Traigo modulo de express tambien se puede con import
const router = express.Router(); //Definimos el roputer para poder permitir separar cabeceras por metodos por url //Si queremos recibir peticiones get, post, delete, etc
const response = require('../../network/response');
const controller = require('./controller');

router.get('/',function(req,res){
    const filterUser = req.query.name || null;
    controller.getUsers(filterUser)
        .then((UserList)=>{
            response.success(req,res,UserList,200);
        })
        .catch(err=>{
            response.error(req, res,'Unexpected Error', 500,err);
        })
});

router.post('/',function(req,res){
    controller.addUser(req.body.name)
    //Esto es utilizado cuando se utilizan promesas
    .then((data)=>{//FullMessage lo decuelve el controller en el resolve
        response.success(req, res,data,201);
    })
    .catch(err=>{
        response.error(req, res,'Internal error',500,err);
    })
});


module.exports = router;//Exportar el router