const Book = require('../models/book.model.js');

// Crear libro
exports.create = (req, res) => {
    // Validar contenido
    if(!req.body.content) {
        return res.status(400).send({
            message: "Contenido del libro no puede estar vacio"
        });
    }

    // Crear un nuevo libro
    const book = new Book({
        title: req.body.title, 
        author: req.body.author,
        price: req.body.price,
        content: req.body.content

    });

    // Guardar libro en la base de datos
    book.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "No se pudo crear el libro."
        });
    });
};

// Get todos los libros
exports.findAll = (req, res) => {
    Book.find()
    .then(books => {
        res.send(books);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "No se pudo encontrar los libros."
        });
    });
};

// encontrar libro por id
exports.findOne = (req, res) => {
    Book.findById(req.params.bookId)
    .then(book => {
        if(!book) {
            return res.status(404).send({
                message: "No se encontro libro con id" + req.params.bookId
            });            
        }
        res.send(book);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "No se encontro libro con id " + req.params.bookId
            });                
        }
        return res.status(500).send({
            message: "No se encontro libro con id " + req.params.bookId
        });
    });
};

// editar libro con id en el request
exports.update = (req, res) => {
    if(!req.body.content) {
        return res.status(400).send({
            message: "Contenido no puede esta vacio"
        });
    }

    Book.findByIdAndUpdate(req.params.bookId, {
        title: req.body.title || "Libro sin titulo",
        content: req.body.content
    }, {new: true})
    .then(book => {
        if(!book) {
            return res.status(404).send({
                message: "Libro no encontrado con id " + req.params.bookId
            });
        }
        res.send(book);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Libro no encontrado con id " + req.params.bookId
            });                
        }
        return res.status(500).send({
            message: "Error actualizando libro con id " + req.params.bookId
        });
    });
};

// Borrar libro con id en el request
exports.delete = (req, res) => {
    Book.findByIdAndRemove(req.params.bookId)
    .then(book => {
        if(!book) {
            return res.status(404).send({
                message: "Libro no encontrado con id  " + req.params.bookId
            });
        }
        res.send({message: "Libro borrado!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Libro no encontrado con id " + req.params.bookId
            });                
        }
        return res.status(500).send({
            message: "No se pudo borrar libro con id " + req.params.bookId
        });
    });
};
