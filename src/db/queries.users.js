const User = require("./models").User;
const Wiki = require("./models").Wiki;
const Collaborator = require("./models").Collaborator;
const bcrypt = require("bcryptjs");

module.exports = {
  createUser(newUser, callback){
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(newUser.password, salt);

    return User.create({
      username: newUser.username,
      email: newUser.email,
      password: hashedPassword
    })
    .then((user) => {
      callback(null, user);
    })
    .catch((err) => {
      callback(err);
    })
  },
  getUser(id, callback){
    let result = {};
    User.findById(id)
    .then((user) => {
      if(!user){
        callback(404);
      } else {
        result["user"] = user;
        Collaborator.scope({method: ["addCollaborations", id]}).all()
        .then((collaborations) => {
          result["collaborations"] = collaborations;
          callback(null, result);
        })
        .catch((err) => {
          callback(err);
        })
      }
    })
  },
  updateUser(id, newRole, callback){
    return User.findById(id)
      .then((user) => {
        user.update({
          role: newRole
        }, {
          fields: ['role']
        })
        .then((user) => {
          callback(null, user);
        })
        .catch((err) => {
          callback(err);
        });
      });
  }

}