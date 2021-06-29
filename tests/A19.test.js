const chai = require('chai')
const request = require('supertest')
const sinon = require('sinon')
const should = chai.should()

const app = require('../app')
const routes = require('../routes/index')
const db = require('../models')
const helpers = require('../_helpers');

<<<<<<< HEAD
describe('# A19: 建立 User Profile', function () {

  context('# [瀏覽 Profile]', () => {
    before(async () => {
=======
describe('# A19: 建立 User Profile', function() {
    
  context('# [瀏覽 Profile]', () => {
    before(async() => {
>>>>>>> origin/A20-test
      this.ensureAuthenticated = sinon.stub(
        helpers, 'ensureAuthenticated'
      ).returns(true);
      this.getUser = sinon.stub(
        helpers, 'getUser'
<<<<<<< HEAD
      ).returns({ id: 1, Followings: [] });

      await db.User.destroy({ where: {}, truncate: true })
      await db.User.create({ name: 'User1' })
    })

    it(" GET /users/:id ", (done) => {
      request(app)
        .get('/users/1')
        .end(function (err, res) {
          res.text.should.include('User1')
          done()
=======
      ).returns({id: 1, Followings: []});

      await db.User.destroy({where: {},truncate: true})
      await db.User.create({name: 'User1'})
    })

    it(" GET /users/:id ", (done) => {
        request(app)
          .get('/users/1')
          .end(function(err, res) {
            res.text.should.include('User1')
            done()
>>>>>>> origin/A20-test
        });
    });

    after(async () => {
      this.ensureAuthenticated.restore();
      this.getUser.restore();
<<<<<<< HEAD
      await db.User.destroy({ where: {}, truncate: true })
=======
      await db.User.destroy({where: {},truncate: true})
>>>>>>> origin/A20-test
    })

  })

  context('# [瀏覽編輯 Profile 頁面]', () => {
<<<<<<< HEAD
    before(async () => {
=======
    before(async() => {
>>>>>>> origin/A20-test
      this.ensureAuthenticated = sinon.stub(
        helpers, 'ensureAuthenticated'
      ).returns(true);
      this.getUser = sinon.stub(
        helpers, 'getUser'
<<<<<<< HEAD
      ).returns({ id: 1 });

      await db.User.destroy({ where: {}, truncate: true })
      await db.User.create({ name: 'User1' })
    })

    it(" GET /users/:id/edit ", (done) => {
      db.User.findByPk(1).then(user => {
        user.isAdmin.should.equal(false);
        request(app)
          .get('/users/1/edit')
          .end(function (err, res) {
            res.text.should.include('form')
            db.User.findByPk(1).then(user => {
              user.name.should.equal('User1');
              return done();
            })
          });
      })
=======
      ).returns({id: 1});

      await db.User.destroy({where: {},truncate: true})
      await db.User.create({name: 'User1'})
    })

    it(" GET /users/:id/edit ", (done) => {
        db.User.findByPk(1).then(user => {
          user.isAdmin.should.equal(false);
          request(app)
            .get('/users/1/edit')
            .end(function(err, res) {
              res.text.should.include('form')
              db.User.findByPk(1).then(user => {
                user.name.should.equal('User1');
                return done();
              })
          });
        })
>>>>>>> origin/A20-test
    });

    after(async () => {
      this.ensureAuthenticated.restore();
      this.getUser.restore();
<<<<<<< HEAD
      await db.User.destroy({ where: {}, truncate: true })
=======
      await db.User.destroy({where: {},truncate: true})
>>>>>>> origin/A20-test
    })

  })

  context('# [編輯 Profile]', () => {
<<<<<<< HEAD
    before(async () => {
=======
    before(async() => {
>>>>>>> origin/A20-test
      this.ensureAuthenticated = sinon.stub(
        helpers, 'ensureAuthenticated'
      ).returns(true);
      this.getUser = sinon.stub(
        helpers, 'getUser'
<<<<<<< HEAD
      ).returns({ id: 1 });

      await db.User.destroy({ where: {}, truncate: true })
      await db.User.create({ name: 'User1' })
=======
      ).returns({id: 1});

      await db.User.destroy({where: {},truncate: true})
      await db.User.create({name: 'User1'})
>>>>>>> origin/A20-test
    })

    it(" PUT /users/:id ", (done) => {
      request(app)
        .put('/users/1')
        .type("form")
<<<<<<< HEAD
        .send({ name: 'User1User1' })
        .end(function (err, res) {
=======
        .send({name: 'User1User1'})
        .end(function(err, res) {
>>>>>>> origin/A20-test
          db.User.findByPk(1).then(user => {
            user.name.should.equal('User1User1');
            return done();
          })
<<<<<<< HEAD
        });
=======
      });
>>>>>>> origin/A20-test
    });

    after(async () => {
      this.ensureAuthenticated.restore();
      this.getUser.restore();
<<<<<<< HEAD
      await db.User.destroy({ where: {}, truncate: true })
=======
      await db.User.destroy({where: {},truncate: true})
>>>>>>> origin/A20-test
    })

  })

})