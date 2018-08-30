const userQueries = require("../db/queries.users.js");
const passport = require("passport");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
    signUp(req, res, next){
      res.render("users/sign_up");
    },
    create(req, res, next){
      let newUser = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        passwordConfirmation: req.body.passwordConfirmation
      };

      userQueries.createUser(newUser, (err, user) => {
        if(err){
          req.flash("error", err);
          res.redirect("users/sign_up");
        } else {
          passport.authenticate("local")(req, res, () => {
            req.flash("notice", "You've successfully signed in!");
            res.redirect("/");

            const msg = {
              to: newUser.email,
              from: 'example@blocipedia.com',
              subject: 'Thank you for joining Blocipedia!',
              text: 'Get started creating wikis now!',
              html: '<strong>Get started creating wikis now</strong>',
            };
            sgMail.send(msg);
          })
        }
      });
    }
  }