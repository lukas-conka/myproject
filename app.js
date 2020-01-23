const config = require('./config')
const http = require('http')

const server = http.createServer((req, res) => {

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, world!\n');
});

server.listen(config.Port, config.Hostname, () => {

    config.Mongoose.connect(config.Uri, config.Options)
    config.Mongoose.connection.on('error', () => {
        console.error('Error at Connection')
    });
    config.Mongoose.connection.on('connected', () => {
        console.log('Connected with success!')
    })
    config.Mongoose.connection.on('disconnected', () => {
        console.log('Database disconnected')
    })

    console.log(`Server running at http://${config.Hostname}:${config.Port}`)
})

const kittySchema = new config.Schema({name: String})

kittySchema.methods.speak = function () {
    var greeting = `Create ${
        this.name
    } with success! `;
    console.log(greeting)
}

const Kitten = config.Mongoose.model('Kitten', kittySchema)

const silence = new Kitten({name: 'Efeitos'})

function saveCat() {
    silence.save((err, silence) => {
        if (err) 
            return console.error(err)

        silence.speak()

    })
}

function allCats() {
    Kitten.find((err, kittens) => {
        if (err) 
            return console.error(err);
        

        console.log(kittens)
    })
}

function searchCat() {
    Kitten.find({}, null, {skip: 5}).then((doc) => {
        console.log('Result of Search Name: ', doc)
        saveCat()
    }).catch((err) => {
        err
    })
}

searchCat();
