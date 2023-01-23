const indexDao = require("../dao/indexDao");

exports.dummy = function(req,res){
    return res.send("it works too");
}

exports.postLogic= function(req,res){
    const {nickname} =req.body;
    console.log(nickname);
    return res.send(nickname);
}

exports.getUsers = async function(req,res){
    const userRows = await indexDao.getUserRows();

    return res.send(userRows);
}