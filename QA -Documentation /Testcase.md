###Feature : Book Review API 
- The Book REview API allow the user to register,login,view all books , add reviews and delete reviews. 
- The feature file demonstrates a Standard BDD structure with clear business -level language resuable steps and realistic acceptance criteria .
---
* Scenario 1 : Verify the server is running
```bash
  Given the API is available
  When I send GET request to 'http://localhost:5000/'
  Then the response status should be 200 or 400
  And response body should be empty
```
---

* Scenario 2 : Retrive all Books
```bash
  Given the books API is available
  When I send GET request to 'http://local:5000/'
  Then The response status should be 200
  And response body should be empty
```
---
* Scenario 3: validate the books with Id 
```bash
 Given the books API is available 
 When I send GET requets to 'http://local:5000/1' 
 Then The response status should be 200 
 And the response body should be an object
```
---
* Scenario 4: verify new Register
```bash
Give the unique username and password
When I create POST requets to 'http://local:5000/register'
Then The response status should be 200
And the response body should be a string
And the user successfully registered
```
---

* Scenario 5: verify the valid login credentials
```bash
Given the valid username and password
When I send GET request to 'http://localhost:5000/customer/login'
Then the response status should be 200
And the response body should be a string
And the response message should be "user successfully looged in"
```
---
* Scenario 6 : verify the Invalid login credentials
```bash  
Given The user should not have vaild username and password
When I send GET request to 'http://localhost:5000/customer/login'
Then the response status should be 400
And the response body should be a string
And the response message should be "Invalid username and password
```
---
* Scenario 7: validate the review for vaild user
```bash  
Given The user should have valid username and password
When I send PUT request to 'http://localhost:5000/review' with the review message
Then the response status should be 200
And the response body should be an object
And the response message should be display the updated review
```
---
* Scenario 8: Review message delete by vaild user
```bash  
Given The user should have valid username and passsword
When I DELETE request to 'http://localhost:5000/review'
Then the response status should be 200
And the response message should be "Review successfully deleted "
```
