const express = require('express');
const router = express.Router();

const ViewController = require('../Controller/ViewController');
const AuthHelper = require('../auth/AuthHelper');

// No authentication required for signup and signin routes
router.get("/signup", ViewController.register);
router.get("/signin", ViewController.login); 

// Authenticated routes
router.get("/", AuthHelper, ViewController.Home);
router.get("/show", AuthHelper, ViewController.Authuser, ViewController.show);
router.get("/create", AuthHelper, ViewController.Authuser, ViewController.createSnippet);

module.exports = router;
