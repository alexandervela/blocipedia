const wikiQueries = require ('../db/queries.wikis.js');
const collaboratorQueries = require("../db/queries.collaborators.js");
const Authorizer = require('../policies/wiki');

module.exports = {
    create(req, res, next){
        collaboratorQueries.createCollaborator(req, (err, collaborator) => {
            if(err){
                req.flash("error", err);
            }
            res.redirect(req.headers.referrer);
        });
    },
    edit(req, res, next){
        wikiQueries.getWiki(req.params.wikiId, (err, result) => {
            wiki = result["wiki"];
            collaborators = result["collaborators"];
            if(err || wiki == null){
                res.redirect(404, "/");
            } else {
                const authorized = new Authorizer(req.user, wiki, collaborators).edit();
                if(authorized){
                    res.render("collaborators/edit", {wiki, collaborators});
                } else {
                    req.flash("You are not authorized to do that.");
                    res.redirect(`/wikis/${req.params.wikiId}`);
                }
            }
        });
    },
    destroy(req, res, next){
        if(req.user){
            collaboratorQueries.deleteCollaborator(req, (err, collaborator) => {
                if(err){
                    req.flash("error", err);
                }
                res.redirect(req.headers.referrer);
            });
        } else {
            req.flash("notice", "You must be signed in to remove Collaborators!");
            res.redirect(req.headers.referrer);
        }
    }
}