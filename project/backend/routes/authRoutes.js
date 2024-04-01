// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controlers/authController');
const registrationController = require('../controlers/regController');
const { requireAuth } = require('../middleware/authmiddleware');
const passwordResetController = require('../controlers/passwordResetController');

// Authentication routes
router.post('/login', authController.login);

// Registration route with authentication middleware
router.post('/register', requireAuth, registrationController.register);

router.post('/forgot', passwordResetController.requestPasswordReset);
router.post('/reset', passwordResetController.resetPassword);

module.exports = router;
