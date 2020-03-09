const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 4000;

const app = express();

module.exports = app;
app.use(bodyParser.json());


const apiRouter = require('./api');

app.use('/api',apiRouter);

app.listen(PORT,()=>{
    console.log(`Server listening on ${PORT}`)
})

