describe('API Testing ',()=>{
    it('checks the server is running ',()=>{
        cy.request('http://localhost:5000/').then((response)=>{
          expect(response.status).to.be.oneOf([200,400])
})
    })
    it('get all books',()=>{
      cy.request('http://localhost:5000/').then((response)=>{
        expect(response.status).to.eq(200)
        expect(response.body).to.be.an('object')
      })
    })
    it('get book by id',()=>{
      cy.request('http://localhost:5000/isbn/1').then((response)=>{
        expect(response.status).to.eq(200)
        expect(response.body).to.be.an('object')
      })
    })
    it('Register a new user',()=>{
        cy.request({
          method:'POST',
          url:'http://localhost:5000/register',
          failOnStatusCode: false,
          body:{
            "username":"testuser"+Date.now(),
            "password":"testPassword"
          }
        }).then((response)=>
        {
          cy.log("Response Body:",JSON.stringify(response.body))
          expect(response.status).to.eq(200)
          expect(response.body).to.be.an('object')
        })
    })
    it('Login with valid credentials',()=>{
      const username = "testuser"+Date.now();
      const password = "testPassword"
      //register the user first 
      cy.request({
        method:'POST',
        url:'http://localhost:5000/register',
        failOnStatusCode: false,
        body:{username,password}
      }).then(()=>{
        //login with the same credentials
        cy.request({
          method:'POST',
          url:'http://localhost:5000/customer/login',
          failOnStatusCode: false,
          body:{username,password}
        }).then((response)=>{
          cy.log("Login Response Body:",JSON.stringify(response.body))
          expect(response.status).to.eq(200)
          expect(response.body).to.be.a('string')
          expect(response.body).to.eq('user successfully logged in')
        })
      })
      
    })
    it('validate login with invalid Credentials',()=>{
      const username = "invalidUser"+ Date.now()
      const password = "invalidPassword";
      cy.request({
          method:'POST',
          url:'http://localhost:5000/customer/login',
          failOnStatusCode:false,
          body:{username,password}
        }).then((response)=>{
          cy.log("Login Response Body:",JSON.stringify(response.body));
          expect(response.status).to.eq(400)
          expect(response.body).to.be.a('string')
          expect(response.body).to.eq('Invalid username or password')
        })
      })
    })
   
