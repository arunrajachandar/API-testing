const express = require('express');
const userRouter = express.Router();

const {
    createUser,
    deleteUser,
    updateUser,
    getUserById,
    getAllUsers
} = require('./database');


userRouter.get('/',(req,res,next)=>{
    //res.send('Okay');
    const createUser = getAllUsers();
    if(createUser){
        res.status(200).send(createUser)
    }else{
        res.status(404);
    }
})

userRouter.param('userId',(req,res,next,id)=>{
    console.log(id)
    const existence = getUserById(Number(id));
    if(existence.length>0){
        req.user = existence;
        next();
    }else{
        res.status(404).send();
    }
})

userRouter.get('/:userId',(req,res,next)=>{
    //res.send('Okay');
    res.status(200).send(req.user);
})


module.exports = userRouter;