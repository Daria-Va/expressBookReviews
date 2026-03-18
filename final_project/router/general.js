const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const { username, password } = req.body; // Extraemos del cuerpo de la petición

  if (!username || !password) {
    return res.status(400).json({ message: "Se requiere usuario y contraseña" });
  }

  const userExists = users.some(user => user.username === username);

  if (userExists) {
    return res.status(409).json({ message: "El nombre de usuario ya existe" });
  }

  users.push({ "username": username, "password": password });
  return res.status(201).json({ message: "Usuario registrado exitosamente. Ahora puedes iniciar sesión" });

});

// Get the book list available in the shop
public_users.get('/', async function (req, res) {
    try {
        const getBooks = () => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(books);
            }, 100);
          });
        };
    
        const allBooks = await getBooks();
        return res.status(200).send(JSON.stringify(allBooks, null, 4));
        
      } catch (error) {
        return res.status(500).json({ message: "Error al obtener la lista de libros" });
      }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;

    // Creamos una Promesa para buscar el libro de forma asíncrona
    const findBook = new Promise((resolve, reject) => {
      setTimeout(() => {
        const book = books[isbn];
        if (book) {
          resolve(book);
        } else {
          reject({ status: 404, message: "Libro no encontrado" });
        }
      }, 100); // Pequeño retraso para simular asincronía
    });
  
    findBook
      .then((book) => {
        res.status(200).send(JSON.stringify(book, null, 4));
      })
      .catch((error) => {
        res.status(error.status || 500).json({ message: error.message });
      });
});
  
// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
    const author = req.params.author;

    try {
      // Definimos una función que devuelve una Promesa de filtrado
      const getBooksByAuthor = () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const keys = Object.keys(books);
            const filteredBooks = keys
              .filter(key => books[key].author.toLowerCase() === author.toLowerCase())
              .map(key => ({ isbn: key, ...books[key] }));
  
            if (filteredBooks.length > 0) {
              resolve(filteredBooks);
            } else {
              reject({ status: 404, message: "No se encontraron libros de este autor" });
            }
          }, 100);
        });
      };
  
      const booksByAuthor = await getBooksByAuthor();
      return res.status(200).send(JSON.stringify(booksByAuthor, null, 4));
  
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;

    // Creamos la promesa para buscar por título
    const getBooksByTitle = new Promise((resolve, reject) => {
      setTimeout(() => {
        const keys = Object.keys(books);
        const filteredBooks = keys
          .filter(key => books[key].title.toLowerCase() === title.toLowerCase())
          .map(key => ({ isbn: key, ...books[key] }));
  
        if (filteredBooks.length > 0) {
          resolve(filteredBooks);
        } else {
          reject({ status: 404, message: "No se encontraron libros con ese título" });
        }
      }, 100);
    });
  
    // Consumimos la promesa con .then y .catch
    getBooksByTitle
      .then((result) => {
        return res.status(200).send(JSON.stringify(result, null, 4));
      })
      .catch((error) => {
        return res.status(error.status || 500).json({ message: error.message });
      });
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const book = books[isbn];

  if (book) {
    return res.send(JSON.stringify(book.reviews, null, 4));
  } else {
    return res.status(404).json({ message: "No se encontró el libro para ver sus reseñas" });
  }
});

module.exports.general = public_users;

