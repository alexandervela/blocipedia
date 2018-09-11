const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/users/";
const User = require("../../src/db/models").User;
const Wiki = require("../../src/db/models").Wiki;
const sequelize = require("../../src/db/models/index").sequelize;

describe("routes : users", () => {

  beforeEach((done) => {

    sequelize.sync({force: true})
    .then(() => {
      done();
    })
    .catch((err) => {
      console.log(err);
      done();
    });
  });

  describe("GET /users/sign_up", () => {

    it("should render a view with a sign up form", (done) => {
      request.get(`${base}sign_up`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Welcome to Blocipedia");
        done();
      });
    });

  });

  describe("POST /users", () => {

        it("should create a new user with valid values and redirect", (done) => {
          const options = {
            url: base,
            form: {
              username: "awesomedude",
              email: "user@example.com",
              password: "123456789"
            }
          }
    
          request.post(options,
            (err, res, body) => {
              User.findOne({where: {email: "user@example.com"}})
              .then((user) => {
                expect(user).not.toBeNull();
                expect(user.username).toBe("awesomedude");
                expect(user.email).toBe("user@example.com");
                expect(user.id).toBe(1);
                done();
              })
              .catch((err) => {
                console.log(err);
                done();
              });
            }
          );
        });
    
        it("should not create a new user with invalid attributes and redirect", (done) => {
          request.post(
            {
              url: base,
              form: {
                username: "awesomedude",
                email: "a",
                password: "123456789"
              }
            },
            (err, res, body) => {
              User.findOne({where: {email: "a"}})
              .then((user) => {
                expect(user).toBeNull();
                done();
              })
              .catch((err) => {
                console.log(err);
                done();
              });
            }
          );
        });
    
      });

      describe("GET /users/sign_in", () => {

        it("should render a view with a sign in form", (done) => {
          request.get(`${base}sign_in`, (err, res, body) => {
            expect(err).toBeNull();
            expect(body).toContain("Sign In");
            done();
          });
        });
   
      });

      describe("GET /users/:id", () => {

        beforeEach((done) => {
          this.user;
          this.wiki;
   
          User.create({
            username:"awesomedude",
            email: "user@example.com",
            password: "123456"
          })
          .then((res) => {
            this.user = res;

            done();
          });
        });
   
          it("should profile page for the user", (done) => {
   
            request.get(`${base}${this.user.id}`, (err, res, body) => {
              expect(body).toContain("profile");
              done();
            });
          });

        
      });

      describe("POST users/:id/upgrade", () => {
        beforeEach((done) => {
          User.create({
            username: "coolguy",
            email: "super@example.com",
            password: "123456",
            role: 0
          })
          .then((res) => {
            this.user = res;
            done();
          });
        });

          it("should upgrade a standard member to premium", (done) => {
            request.post(`${base}${this.user.id}/upgrade`, (err, res, body) => {
              expect(err).toBeNull();
              User.findOne({ where: {id: this.user.id}})
              .then((user)=> {
                expect(user.role).toBe(1);
                done();
              });
            });
          });
        
      });

      describe("POST users/:id/downgrade", () => {
        beforeEach((done) => {
          User.create({
            username: "coolguy",
            email: "super@example.com",
            password: "123456",
            role: 1
          })
          .then((res) => {
            this.user = res;
            done();
          });
        });

        it("should switch a premium member to standard member", (done) => {
          request.post(`${base}${this.user.id}/downgrade`, (err, res, body) => {
            expect(err).toBeNull();
            User.findOne({ where: {id: this.user.id}})
            .then((user)=> {
              expect(user.role).toBe(0);
              done();
            });
          });
        });
        
      });

});