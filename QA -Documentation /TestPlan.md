## Test Plan -Book review Application (API testing)

### Introduction 
The purpose of this Test Plan to define the testing approach for the Book review Application , a Node.js+ Express.js backend that support the autherntication and CURD operation for book reviews.Testing is focus on API functionality  , error handling and authentication , workflows .
---
##Scope of Testing 
- Testing all public endpoints 
- Testing user registration and login
- Testing CURD operations for book review 
- Testing search EndPoints(ISBN,title,Author)
- Testing review retrieval 
- Positive and negative test scenaios 
- API response 
- Authentication and authorization check
- Error Handling and status code
- Data validation for request bodies
##Out of SCope
- UI testing (no frontend testing )
- Performance testing
- Database performance testing
- cross browser testing
---
##Features to be tested 
User Authentication
- POST/register - Register new user 
- POST/login - Login and receive JWT token
PUblic Book Endpoints 
- GET/- Retrive all the Books
- GET/isbn/:isbn -Retrieve books by isbn
- GET/author/:author -retrieve books by author 
- GET/title/:title - retrieve books by title 
Review Endpoint 
- POST/review/:isbn -Add review
- PUT/review/:isbn -update review
- DELETE/review/:isbn - Delete review
---
###Test Apporach 
* Manual Testing 
- Funtionality  testing all end points
- Validation request/response bodies
- Negative testing(invalid input ,missing field)
- Authentication testing using JWT
- Dataverification using MongoDb Compass
* API Testing
Postman Collection with
- Environment variables
- Postivie /Negative test cases
- Assertions
- chained requests(login->add review)
Automation Testing 
-Postman SCript
-Cypress API testing
---
## Test Data 
- valid User 
{
  "Username" : "John",
  "Password"  : "1234"
}
- Invalid User
{
"Username " :"",
"Password"  :""
}
- Review Payload 
{
"Review":"Great book!"
}
---
### Entry Criteria
- Server is running on http://localhost:5000
- MongoDB is connected
- Postman environment is configured
- Test data is prepared
### Exit criteria
- All planned test cases are executed 
- All critical and high- severity  bugs resolved 
- Test summary report completed 
- Postman collection exported 
---
# Risk 
- Missing validation may allow invalid data
- Incorrect status code affect  client intergration
- Authentication failures may block testing
- "/"endpoint may cause failure 
---
## Tools Used
- Postman (API tetsing )
- MongoDB Compass
- Vs Code
- GitHUb
- Node.js + Express.js Application
---
# Deliverables 
 - Test Plan 
 - Test Case 
 - Postman Collection 
 - Bug report
 - Test Summary REport
 - Screenshots and API responses
---
# Approval
The Test plan must include as Part of QA automation and reviewed as needed 






User 
