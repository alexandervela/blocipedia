const userQueries = require("../db/queries.users.js");
const wikiQueries = require("../db/queries.wikis.js");
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
        passwordConfirmation: req.body.passwordConfirmation,
        role: req.body.role
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
    },
    signInForm(req, res, next){
      res.render("users/sign_in");
    },
    signIn(req, res, next){
      passport.authenticate("local")(req, res, function() {
        if(!req.user){
          req.flash("notice", "Sign in failed. Please try again.")
          res.redirect("/users/sign_in");
        } else {
          req.flash("notice", "You've successfully signed in!");
          res.redirect("/");
        }
      })
    },
    signOut(req, res, next){
      req.logout();
      req.flash("notice", "You've successfully signed out!");
      res.redirect("/");
    },
    show(req, res, next){
       userQueries.getUser(req.params.id, (err, user) => {
         if(err || user === undefined){
           req.flash("notice", "No user found with that ID.");
           res.redirect("/");
         } else {
           res.render("users/show", {user});
         }
       });
     },
     upgradeForm(req, res, next){
      res.render("users/upgrade");
    },
    upgradeAccount(req, res, next){
      userQueries.updateUser(req.params.id, 1, (err, user) => {
        if(err || user == null){
          console.log(err);
          res.redirect(404, "/");
        } else {
          req.flash("notice", "You've successfully upgraded to a Premium account!");
          res.redirect("/");
        }
      });
    },
    downgradeForm(req, res, next){
      req.flash("notice", "Switching to a Standard account will change any Private wikis to Public");
      res.render("users/downgrade");
    },
    downgradeAccount(req, res, next){
      userQueries.updateUser(req.params.id, 0, (err, user) => {
        if(err || !user){
          console.log(err);
          res.redirect(404, "/");
        } else {
          req.flash("notice", "You've successfully switched to a Standard account!");
          req.flash("notice", "All Private Wikis are now Public")
          res.redirect("/");
        }
      });
      wikiQueries.updatePrivacy(req.params.id, false, (err, user) => {
        if(err || !user){
          console.log(err);
          res.redirect(404, "/");
        }
      });
    }
  }