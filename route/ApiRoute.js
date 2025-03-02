const express = require('express');
const router = express.Router();

const apiController = require('../Controller/apiController');
const authController = require('../Controller/authController');
const AuthHelper = require('../auth/AuthHelper');
const ViewController = require('../Controller/ViewController');


// Authentication routes
router.post('/register',authController.register);  // Register a new user
router.post('/login', authController.login);        // Login an existing user
router.get('/logout', authController.logout);       // Logout a user

// Snippet-related routes
router.post('/create',AuthHelper,ViewController.Authuser,apiController.createSnippet);   // Create a new snippet
router.get('/snippets', apiController.getAllSnippets);  // Get all snippets
router.get('/snippet/:id', apiController.getSnippetById); // Get a snippet by ID
router.get('/delete/:id',AuthHelper,apiController.deleteSnippet,apiController.deleteSnippet); // Delete a snippet

module.exports = router;
