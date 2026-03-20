###Login API returns incorrect status code for Invalid Credentials

* Bug_ID:  API-LOGIN-001
---
* Title - Login API return 208 instead of 400 for invalid credentials 
---
* Reported BY
  Sushmitha Krishnamoorthy
---
* Environment
  - API URL : "http://localhost:5000/login"
  - METHOD : POST
  - Tool : Cypress
  - Branch : main
  - Backend : Express.js(Book review API)
---
* Description
    When User Try to login with Invalid Credentials ,The API should be return 400 Bad request response message "Invalid Credentails". Instead ,The API return 208 ALready reported.
  Which is incorrect and breaks the client side validation and automated rest.
---
* Steps to reproduce
  - Send the POST request to "http://localhost:5000/login"
  - used  Invalid username and password
      ```bash
            username : InvalidTestUser
            Password : InvalidTester
      ```
  -Observe the response status and  body
  ---
  * Actual Result
     Status code:208
     Response Body: "Invalid credentials
    Cypress test fails with
     expected 208 equal to 400
  ---
  * Expected Result
     status code:400
     Response Body: "Invalid credentials"
     Cypress test :expected 400 equal to 400
  ---
  * Impact
   - Automated test fails
   - cilent applications may mis-handle login failures
   - security risk incorrect code reduce the clarity of the authentication logic
  ---
  * Severity
    medium ( does not crush the system but breaks the authentication flow and automated testing)
  ---
  *Possible Root Cause
  Login controller may be using
  ```bash
  res.status(208).send("Invalid credentials")
  ```
  Instead
  ```bash
  res.status(400).send("Invalid credentials")
  ```
---
* Attachment
   Cypress screenshots showing the failure
   Evidence : QA-Documention/Invalid_bug_detected.PNG
  
    
  
