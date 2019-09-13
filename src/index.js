const express = require('express');
require('./db/mongoose');

const userRouter = require('../src/routers/user');
const groupRouter = require('../src/routers/group');


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(groupRouter);

app.listen(port, () => {
    console.log('Server is up at port:', port);
})