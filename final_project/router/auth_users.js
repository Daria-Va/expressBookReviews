const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
if(username.length>0)
{
    return true;
}
else
{
    return false;
}
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
let validUsers = users.filter((user)=>{
    return (user.username === username && user.password === password)
})
if(validUsers.length>0){
    return true;
}
else{
    return false;
}
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if(!username || !password)
  {
    return res.status(400).json({message:"Error logging in"})
  }
  if(authenticatedUser(username,password)){
    let accessToken = jwt.sign({
        data:password
    },'access',{expiresIn:60*60});
    req.session.authorization ={
        accessToken,username
    }
  
  return res.status(200).send("user successfully logged in");
  }
  else{
    return res.status(208).json({message:"Invalid Login.check username and password"})  
}
});


// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const  review = req.query.review;
    const username = req.session.authorization?.username;
    console.log('Book before update:', books[isbn]);

    if (!username) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    if (!books[isbn]) {
        return res.status(404).json({ message: "Book not found" });
    }

    if (!books[isbn].reviews) {
        books[isbn].reviews = {};
    }
    books[isbn].reviews[username] = review;
    
    console.log('Updated reviews:', books[isbn].reviews);
    return res.status(200).json({
        message: "Review added/updated successfully",
        reviews: books[isbn].reviews // Return the updated reviews object
    });
   
    
});
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const review = req.query.review;
    const username = req.session.authorization.username;
  
    if (!username) {
      return res.status(403).json({ message: "Unauthorized" });
    }
  
    if (!books[isbn]) {
      return res.status(404).json({ message: "Book not found" });
    }
  
    
    if (!books[isbn].reviews || !books[isbn].reviews[username]) {
      return res.status(404).json({ message: "Review not found for this user" });
    }
  
    // Delete the review
    delete books[isbn].reviews[username];
  
    return res.status(200).json({
      message: `Review is deleted successfully`,
      reviews: books[isbn].reviews
    });
  });

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;

