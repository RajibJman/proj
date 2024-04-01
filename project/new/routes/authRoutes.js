// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controlers/authController');
// const registrationController = require('../controlers/regController');
const { requireAuth } = require('../middleware/authmiddleware');
const passwordResetController = require('../controlers/passwordResetController');
const { addModule, getModule, updateModule, deleteModule } = require('../controlers/moduleController');
const { insertQuizQuestion,getQuestionsByTopic,checkAnswer, getAllTopicNames } = require('../controlers/quiz');
const { addUserModule } = require('../controlers/addusermodule');
const { createUser,getAllUsers,getUserById,deleteUser,updateUser } = require('../controlers/regController');
const { createEvent,getAllEvents } = require('../controlers/EventController');



// Authentication routes
router.post('/login', authController.login);
router.get('/allData', authController.allData);


// Registration route with authentication middleware
router.post('/register', requireAuth, createUser);
router.get('/users', getAllUsers);
router.get('/users/:id',requireAuth,getUserById);
router.delete('/users/delete/:id', requireAuth, deleteUser);
router.post('/users/updateuser/:id', requireAuth, updateUser);




// router.post('/forgot', passwordResetController.requestPasswordReset);
// router.post('/reset', passwordResetController.resetPassword);

router.post('/reset-password',passwordResetController.resetPassword);
router.post('/addmodule',addModule);

router.post('/insertQuiz',insertQuizQuestion);

router.get('/getQuestionsByTopic/:topic',getQuestionsByTopic); 

router.post('/checkAnswer',checkAnswer);
router.get('/topic',getAllTopicNames);
router.get('/module',getModule);
router.post('/addusermodule',addUserModule);

router.post('/createevent',createEvent);
router.get('/getevent',getAllEvents);


module.exports = router;
