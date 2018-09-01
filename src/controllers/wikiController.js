const wikiQueries = require("../db/queries.wikis.js");
const passport = require("passport");

module.exports = {
    index(req, res, next){
        wikiQueries.getAllWikis((err, wikis) => {
            if(err){
                res.redirect(500, "static/index");
            } else {
                res.render("wikis/wiki", {wikis});
            }
        })
    },
    new(req, res, next){
        res.render("wikis/new");
    },
    create(req, res, next){
        let newWiki = {
            title: req.body.title,
            body: req.body.body
          };
          wikiQueries.createWiki(newWiki, (err, wiki) => {
            if(err){
              res.redirect(500, "/wikis/new");
            } else {
              res.redirect(303, `/wikis/${wiki.id}`);
            }
          });
    },
    show(req, res, next){
        wikiQueries.getWiki(req.params.id, (err, wiki) => {
            if(err || wiki === null){
                res.redirect(401, "/");
            } else {
                render("wikis/show");
            }
        });
    },
    destroy(req, res, next){
        wikiQueries.deleteWiki(req.params.id, (err, wiki) => {
            if(err){
                res.redirect(500, `/wikis/${wiki.id}`);
            } else {
                render(303, "/wikis");
            }
        });
    },
    edit(req, res, next){
        wikiQueries.getWiki(req.params.id, (err, wiki) => {
            if(err || wiki === null){
                red.redirect(404, "/");
            } else {
                render("wikis/edit", {wiki});
            }
        });
    },
    update(req, res, next){
        wikiQueries.updateWiki(req.params.id, req.params.body, (err, wiki) => {
            if(err || wiki === null){
                res.redirect(404, `/wikis/${req.params.id}/edit`);
            } else {
                res.redirect(`/wikis/${wiki.id}`);
            }
        });
    }
}