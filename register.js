const express = require('express');
const registerRouter = express.Router();

const {createUser,getAllUsers} = require('./database');

const checkUser = (req,res,next)=>{
    const already = getAllUsers().find(e=> req.body.email===e.email);
    if(!already){
        req.user = req.body;
        next();
    }else{
    res.status(204).send("User already exists");
    }
};

registerRouter.post('/',checkUser, (req,res,next)=>{
    const userCreation = createUser(req.user);
    if(userCreation){
        res.status(201).send(userCreation)
    }else{
        res.status(500).send("Insufficent info");
    }
})

module.exports = registerRouter;