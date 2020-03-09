


const expect = require('chai').expect;
const request = require('supertest');

const app = require('../server');


describe('/api/user routes', function() {
    const {
        getAllUsersLoginDet,
        getAllUsers
    } = require('../database');
    
  
    describe('GET /api/user/', function() {
  
      it('returns an array', function() {
        return request(app)
          .get('/api/user/')
          .expect(200)
          .then((response) => {
            expect(response.body).to.be.an.instanceOf(Array);
          });
      });
  
      it('returns an array of all users', function() {
        return request(app)
          .get('/api/user/')
          .expect(200)
          .then((response) => {
            let length = getAllUsers().length;
            expect(response.body.length).to.be.equal(length);
            response.body.forEach((user) => {
              expect(user).to.have.ownProperty('id');
              expect(user).to.have.ownProperty('name');
              expect(user).to.have.ownProperty('role');
              expect(user).to.have.ownProperty('email');
            })
          });
      });

      it('returns an array with id 200', function() {
        return request(app)
          .get('/api/user/1')
          .expect(200)
      });

      it('returns an array with wrong id', function() {
        return request(app)
          .get('/api/user/124')
          .expect(404)
      });

      it('returns an array 200 Response type', function() {
        return request(app)
          .get('/api/user/1')
          .expect(200)
          .then(res=> expect(res.body).to.be.an.instanceOf(Object))
      });


    });
});
describe('/api/login/ routes', function() {

describe('POST /api/login/', function() {

  it('returns successful login 200', function() {
  return request(app)
  .post('/api/login')
  .send({"email":"arunrajachandar@gmail.com","password":"adsfr"}) // x-www-form-urlencoded upload
  .expect(200)
  .end((err, res) => {
    if (err) {
      return done(err);
    }
    expect(res.text).to.be.equal('Hi Arun');
    return done();
  })
  });
  it('returns unsuccessful login 404', function() {
    request(app)
    .post('/api/login')
    .send({"email":"arunrajachandar@gmail.com","password":"asfr"}) // x-www-form-urlencoded upload
    .expect(404);
    });
  

});
});


describe('/api/register/', function() {
  describe('POST /api/register/', function() {
  it('returns insufficient info 500', function() {
   request(app)
  .post('/api/register')
  .send({"email":"rajachandar@gmail.com","password":"adsfr"}) // x-www-form-urlencoded upload
  .expect(500)
  .end((err,res) => {
    if (err) return done(err);
    expect(res.text).to.be.equal('Insufficent info');
    done();
});
   
   });
   
  it('returns user already exists 204', function() {
    let newUser = {
      "email":"arunrajachandar@gmail.com",
    "password":"adsfr",
    "role":"Associate Consultant",
    "name":"Olivia"
  };
    return request(app)
    .post('/api/register')
     .send(newUser)
  // .send({"email":"arunrajachandar@gmail.com","password":"adsfr"}) // x-www-form-urlencoded upload
    .expect(204)
    // 
     });
  it('returns user created 201', function() {
    let newUser = {
      "email":"Olivia@gmail.com",
    "password":"asdfff",
    "role":"Associate Consultant",
    "name":"Olivia"
  };
      return request(app)
    .post('/api/register')
    .send(newUser)
//    .send({"email":"arunrajachandar@gmail.com","password":"adsfr"}) // x-www-form-urlencoded upload
    .expect(201)
    
  });
  it('returns user created 201 - check response', function() {
    let newUser = {
      "email":"Olivia@gmail.com",
    "password":"asdfff",
    "role":"Associate Consultant",
    "name":"Olivia"
  };
      return request(app)
    .post('/api/register')
    .send(newUser)
//    .send({"email":"arunrajachandar@gmail.com","password":"adsfr"}) // x-www-form-urlencoded upload
    .then(res=>{
        expect(res.body).to.have.ownProperty('id');
        expect(res.body).to.have.ownProperty('name');
        expect(res.body).to.have.ownProperty('role');
        expect(res.body).to.have.ownProperty('email');

    })
    
  });
  
 
});
});