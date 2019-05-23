const express = require('express');
const app=express();

app.use(express.static(__dirname + "/"));

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


//CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
  app.get('/', function(req, res, next) {
    // Handle the get for this route
  });
  
  app.post('/', function(req, res, next) {
   // Handle the post for this route
  });


// ruta por defecto
app.get('/', (req, res) => {
    res.sendFile(__dirname+'/index.html');
});

app.get('/index.html', (req, res) => {
    res.sendFile(__dirname+'/index.html');
});

app.get('/catalogo.html', (req, res) => {
    res.sendFile(__dirname+'/catalogo.html');
});
app.get('/lista.html', (req, res) => {
    res.sendFile(__dirname+'/lista.html');
});
app.get('/editar.html', (req, res) => {
    res.sendFile(__dirname+'/editar.html');
});











require('./app/routes/book.routes.js')(app);
app.listen(7000, () => {
    console.log("Servidor escuchando en el puerto 7000");
});