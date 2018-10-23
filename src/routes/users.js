const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const validation = require("./validation");

router.get("/users/sign_up", userController.signUp);
router.post("/users", validation.validateUsers, userController.create);
router.get("/users/sign_in", userController.signInForm);
router.post("/users/sign_in", validation.validateUsers, userController.signIn);
router.get("/users/sign_out", userController.signOut);
router.get("/users/:id", userController.show);
router.get("/users/:id/upgrade", userController.upgradeForm);
router.post("/users/:id/upgrade",userController.upgradeAccount);
router.get("/users/:id/downgrade", userController.downgradeForm);
router.post("/users/:id/downgrade", userController.downgradeAccount);
router.get("/users/collaborations", userController.showCollaborations);

module.exports = router;