const Mongoose = require('mongoose')
const Schema = Mongoose.Schema;

module.exports = {
    Schema,
    Mongoose,
    Hostname: '127.0.0.1',
    Port: 3000,
    Uri: 'mongodb://pre-teste:lucasamaral7@ds211259.mlab.com:11259/pre-teste',
    Options: {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
}
