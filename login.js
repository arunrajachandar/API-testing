const express = require('express');
const loginRouter = express.Router();

const {
    getAllUsersLoginDet,
    getAllUsers
} = require('./database');


loginRouter.post('/',(req,res,next)=>{
    //res.send('Okay');
    console.log(req.body)
    const already = getAllUsersLoginDet().find(e=> req.body.email===e.email && req.body.password === e.password);
  //  console.log(already)
    if(already){
        const userDet = getAllUsers().filter(e=> e.email===already.email);
        res.status(200).send(`Hi ${userDet[0].name}`);

    }else{
        res.status(404).send("User doesn't exist. Please register")
    }
})


module.exports = loginRouter;