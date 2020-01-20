const http = require('http')
const mongoose = require('mongoose')

mongoose.connect('mongodb://pre-teste:lucasamaral7@ds211259.mlab.com:11259/pre-teste', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const hostname = '127.0.0.1';

const port = 3000;

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    console.log('We are connected')
});


const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, world!\n');
});

server.listen(port, hostname, () => {

    console.log(`Server running at http://${hostname}:${port}`)
})

const kittySchema = new mongoose.Schema({name: String})

kittySchema.methods.speak = function () {
    var greeting = `Create ${
        this.name
    } with success! `;
    console.log(greeting)
}

const Kitten = mongoose.model('Kitten', kittySchema)

const silence = new Kitten({name: 'Mel'})

function saveCat(){
    silence.save((err, silence) => {
        if (err) 
            return console.error(err)
        
        silence.speak()
    
    })    
}

Kitten.find((err, kittens) => {
    if (err) 
        return console.error(err);
    
    console.log(kittens)
})

function searchCat() {
    Kitten.find({name: 'Lucas'})
.then((doc) => {
    console.log('Result of Search Name: ', doc)
    saveCat()
})
.catch((err) => {err})
}

searchCat();

