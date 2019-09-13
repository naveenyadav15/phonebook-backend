const moongoose = require('mongoose');
// const path = 'cluster0-ji6ph.mongodb.net:27017/phonebook-api';
// // 'mongodb://127.0.0.1:27017/phonebook-api' 
// 192.168.43.226
moongoose.connect('mongodb://127.0.0.1:27017/phonebook-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})