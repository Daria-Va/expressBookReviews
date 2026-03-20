#  Book Review Application
This is a simple Express.js-based server-side Book Review Application. It includes user authentication using JWT and session-based login. Users can view, search, add, update, and delete book reviews.
---
# Prerequisites
- CRUD operations with Node.js
-  CRUD operations on Express server with JWT & Session Authentication
---
# Setup Instructions
## 1.Clone the Repository

 ```bash
git clone https://github.com/sushmi-krish/expressBookReviews.git
cd expressBookReviews
```
2. Install Dependencies
```bash
npm install
```
3.Run the Server
```bash
node index.js
```{
  "username": "john",
  "password": "1234"
}

Server will start on: http://localhost:5000
---
# File Overview
File              |  purpose
-----
booksdb.js           Contains the book data reviews
auth_user.js         Contains registered user logic
public_users.js      Public routes for book browsing/search
-----
# User Registration
*POST /register
Registers a new user by username and password.
```bash
      {
  "username": "john",
  "password": "john@12"
}
```
-------
# Public Book Endpoints
* GET /
  Returns a list of all books (with 1 second delay using Promises).

* GET /isbn/:isbn
  Returns book details by ISBN.
  Example:
  /isbn/1 → returns book with ISBN 1.

* GET /author/:author
  Returns all books written by the given author.
  Example:
  /author/John Smith → returns books by "John Smith".

* GET /title/:title
 Returns books with the given title.
 Example:
 /title/The Great Gatsby → returns that specific book.

* GET /review/:isbn
  Returns the review object for the given book ISBN.
  Example:
  /review/1 → returns the reviews object for book 1.
-----
# Async/Await & Promises Used
 - async/await used in all route handlers (/isbn/:isbn, /author/:author, /title/:title)
 - Promises used to simulate async book loading on / route via setTimeout
-----
# Summary:
The Book Review Application has been successfully tested using Postman.
- All required screenshots have been captured and are included in the repository.






