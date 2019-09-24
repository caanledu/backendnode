// const statusMessage = {
//     '200':'Done',
//     '201':'Created',
//     '400':'Invalid format',
//     '500':'Internal Error'
// }

exports.success = function(req, res, message, status){
    res.status(status || 200).send({
        error:'',
        body: message
    });
}

exports.error = function(req, res, error, status, details){
    console.log('Response errror:'+details);
    res.status(status || 500).send({
        error:error,
        body: ''
    });
}