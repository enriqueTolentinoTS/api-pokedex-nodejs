const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Configurar Express
const app = express();

const PORT = 3000;

app.use(bodyParser.urlencoded({
    extended: false
}));


app.use(bodyParser.json());
app.use(bodyParser.text());


const router = require('./routes/router')(app);

mongoose.connect('mongodb://localhost/pokedex');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => {
    console.log('Base de datos conectada con exito!');
})

app.listen(PORT, function(){
    console.log("Tu api está corriendo en el puerto ", PORT);
})