let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Users', () => {
  /*
  beforeEach(done => {
    Book.remove({}, err => {
      done();
    });
  });
  */

  var agent = chai.request.agent(server);

  describe('/POST login', () => {
    it('it should login', done => {
      agent
        .post('/api/user/login')
        .set('Content-Type', 'application/json')
        .type('json')
        .send({
          google_id: '114271016355104950548',
          name: 'mjohnfh123',
          email: 'oo7680485@gmail.com',
          google_token: 'brbbrbrbrbrbr',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.have.property('errcode');
          res.body.errcode.should.be.have.equal(0);
          res.body.result.should.be.have.property('user_id');
          res.body.result.should.be.have.property('user_name');
          res.body.result.should.be.have.property('is_admin');
          done();
        });
    });
  });

  describe('/GET user', () => {
    it('it should GET all the users', done => {
      agent.get('/api/user/list').end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.have.property('errcode');
        res.body.errcode.should.be.have.equal(0);
        res.body.result.should.be.a('array');
        res.body.result.length.should.to.be.above(1);
        done();
      });
    });
  });

  describe('/POST api/user/:user_id', () => {
    it('it should update user info', done => {
      agent
        .post('/api/user/12')
        .set('Content-Type', 'application/json')
        .type('json')
        .send({
          is_admin: true,
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.have.property('errcode');
          res.body.errcode.should.be.have.equal(0);
          done();
        });
    });
  });
});
