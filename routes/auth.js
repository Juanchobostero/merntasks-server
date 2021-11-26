// Routes for authenticate users
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// Creates an user
// api/auth
router.post('/',
    authController.authenticateUser
);

router.get('/', 
    auth,
    authController.authenticatedUser
);

module.exports = router;





