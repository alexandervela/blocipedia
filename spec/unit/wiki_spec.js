const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").User;
const Wiki = require("../../src/db/models").Wiki;

describe("Wiki", () => {
    
    beforeEach((done) => {
        this.user;
    
        sequelize.sync({force: true}).then((res) => {
    
          User.create({
            username:"awesomedude",
            email: "user@example.com",
            password: "123456"
          })
          .then((user) => {
            this.user = user;
    
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        });
    });

    describe("#create", () => {
        it("should create a wiki object with a title, body, private, and associated user id", (done) => {
            Wiki.create({
                title:"GoT S8 predictions",
                body: "What thrills are you expecting for this season?",
                private: false,
                userId: this.user.id
            })
            .then((wiki) => {
                expect(wiki.title).toBe("GoT S8 predictions");
                expect(wiki.body).toBe("What thrills are you expecting for this season?");
                expect(wiki.private).toBe(false);
                expect(wiki.userId).toBe(this.user.id);
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });

        it("should not create a wiki object with an empty title, body, or userId", (done) => {
            Wiki.create({
                body:"I am a body"
            })
            .then((wiki) => {

                //will be skipped

                done();
            })
            .catch((err) => {
                expect(err.message).toContain("Wiki.title cannot be null");
                expect(err.message).toContain("Wiki.userId cannot be null");
                done();
            });
        });
        
    });
    
});