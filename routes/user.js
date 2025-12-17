const express = require("express");
const router = express.Router();

const user = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const {signupUsers, renderSignup, renderloginUsers, login, logout} = require("../controllers/users.js");
const userController = require("../controllers/users");

// Forgot Password Route
router.get("/forgot", userController.renderForgotForm);
router.post("/forgot", userController.sendResetLink);

// Reset Password Route
router.get("/reset/:token", userController.renderResetForm);
router.post("/reset/:token", userController.resetPassword);
// signup page
router.route("/signup")
.get( renderSignup )
.post(wrapAsync(signupUsers));
// login page
router.route("/login")
.get( renderloginUsers)
.post(saveRedirectUrl, passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), login);

//logout page
router.get("/logout", logout)
module.exports = router;