const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
let axios = require('axios')
const public_users = express.Router()
const doesExist = (username) => {
    // Filter the users array for any user with the same username
    let userName = users.filter((user) => {
        return user.username === username;
    });
    // Return true if any user with the same username is found, otherwise false
    return userName.length>0;
}
public_users.post("/register", (req,res) => {
 const username = req.body.username;
 const password = req.body.password;
 if(username && password){
    if(!doesExist(username))
    {
        users.push({"username":username,"password":password});
        return res.status(200).json({message:"User Registed Successfully.Now you can  login"})
    }
    else
    {
        return res.status(400).json({message:"User already exists!"})
    }
 }
 return res.status(400).json({message:"Unable to register"})
});


// Get the book list available in the shop
function getBooksData(){
    return  new Promise((resolve,reject)=>{
        try{
            setTimeout(()=>{
                resolve(books)
            },1000);
        }
        catch(err){
            reject(err)
        }
    })
}
public_users.get('/',async function (req, res) {
    getBooksData()
    .then(data=>{
        return res.json(data)
    })
    .catch(err=>{
        return res.status(404).json({message:"Page is not found"})
    })
 
 
});

// Get book details based on ISBN
async function getBookByISBN(isbn){
 const book = books[isbn];
 if(book){
    return book;
 }
 else{
    throw "Book Not Found";
 }
}
public_users.get('/isbn/:isbn', async function (req, res) {

  let isbn = req.params.isbn;
 try{
    const book = await getBookByISBN(isbn);
    return res.json(book);
  }
  catch(err)
  {
    return res.status(404).json({message:"Page not found"})
  }
 });
  
// Get book details based on author
async function getBookByAuthor(author){
     const bookAuthor =[];
     for(let book in books){
        if(books[book].author.toLowerCase() === author.toLocaleLowerCase()){
            bookAuthor.push(books[book])
     }
    }
     if(bookAuthor.length>0)
     {
       return bookAuthor ;
     }
     else{
       throw "No book found in  this author name"
     }
}
public_users.get('/author/:author', async function (req, res) {
   let author = req.params.author
   try{
    let booksByAuthor = await getBookByAuthor(author);
    return res.json(booksByAuthor)
   }
   catch(err){
     return res.status(403).json({message:err})
   }


});

// Get all books based on title
async function getBookByTitle(title)
{
    const bookTitle =[];
    for(let book in books){
        if(books[book].title.toLocaleLowerCase()=== title.toLocaleLowerCase())
        {
            bookTitle.push(books[book])
        }
    }
    if(bookTitle.length>0)
    {
        return bookTitle;
    }
    else
    {
        throw "No book found in  this title name"
    }
}
public_users.get('/title/:title',async function (req, res) {
 let title = req.params.title;
try{
    let bookTitle = await getBookByTitle(title);
    return res.json(bookTitle);
}
catch(err){
    return res.status(404).json({message:err})
}
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {

  let isbn = req.params.isbn;
  let bookReview = books[isbn]
  if(bookReview)
  {
    
    return res.json(bookReview.reviews)
  }
  else{
  return res.status(404).json({message: "No review"});
  }
});

module.exports.general = public_users;
