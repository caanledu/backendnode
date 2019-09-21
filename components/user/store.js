const Model = require('./model');

function addUser(user){
    const myUser = new Model(user);
    return myUser.save();
}

function getUsers(filterUser){
    let filter = {};
    if(filterUser!=null){
        filter = {name:filterUser}
    }
    const users = Model.find(filter);
    return users;
}

module.exports = {
    add:addUser,
    list:getUsers,
  
}