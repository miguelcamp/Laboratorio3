
module.exports = (app) => {
    const books = require('../controllers/book.controller.js');

    // Crear Libro
    app.post('/books', books.create);

    // Get todos los libros
    app.get('/books', books.findAll);

    // Get un libro por id
    app.get('/books/:bookId', books.findOne);

    // Editar libro
    app.put('/books/:bookId', books.update);

    // borrar libro por id
    app.delete('/books/:bookId', books.delete);
}