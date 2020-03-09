const express = require('express');
const apiRouter = express.Router();

const registerRouter = require('./register');
const loginRouter = require('./login');
const userRouter = require('./user');

apiRouter.use('/register',registerRouter);
 apiRouter.use('/login',loginRouter);
apiRouter.use('/user',userRouter);


module.exports =  apiRouter;