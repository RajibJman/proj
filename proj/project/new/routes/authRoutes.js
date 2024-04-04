// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controlers/authController');
// const registrationController = require('../controlers/regController');
const { requireAuth } = require('../middleware/authmiddleware');
const passwordResetController = require('../controlers/passwordResetController');
const { addModule, getModule, updateModule, deleteModule } = require('../controlers/moduleController');
const { getQuestionsByTopicId,insertQuizQuestion,getAllTopicNames,checkAnswerByTopicId} = require('../controlers/quiz');
const { addUserModule } = require('../controlers/addusermodule');
const { createUser,getAllUsers,getUserById,deleteUser,updateUser } = require('../controlers/regController');
const { createEvent,getAllEvents,updateEvent,deleteEvent } = require('../controlers/EventController');
const { getAllMarks,getMarksByModuleId,getMarksByUserId,addMarks } = require('../controlers/marksController');
const updateModuleQuizId = require('../controlers/modulequiz');
const handleForgotPasswordSubmission = require('../controlers/forgotpassController');
const { addModuleTrainer } = require('../controlers/addmoduletrainer');



// Authentication routes
router.post('/login', authController.login);
router.get('/allData', authController.allData);


// Registration route with authentication middleware
router.post('/register', requireAuth, createUser);
router.get('/users', getAllUsers);
router.get('/users/:id',requireAuth,getUserById);
router.delete('/users/delete/:id', requireAuth, deleteUser);
router.post('/users/updateuser/:id', updateUser);


router.post('/modulequiz',updateModuleQuizId);

router.post('/moduletrainer',addModuleTrainer);

// Route for adding a module
router.post('/addmodule',addModule);

// Route for getting all modules
router.get('/modules', getModule);

// Route for updating a module
router.post('/modules/:Id',updateModule);

// Route for deleting a module
router.delete('/modules/:Id',deleteModule);



// router.post('/forgot', passwordResetController.requestPasswordReset);
// router.post('/reset', passwordResetController.resetPassword);

router.post('/reset-password',passwordResetController.resetPassword);

// // Route for handling forgot password form submission
router.post('/forgot-password', handleForgotPasswordSubmission);


// router.post('/insertQuiz',insertQuizQuestion);

// router.get('/getQuestionsByTopic/:topic',getQuestionsByTopic); 

// router.post('/checkAnswer',checkAnswer);
// router.get('/topic',getAllTopicNames);

router.post('/addusermodule',addUserModule);

router.post('/createevent',createEvent);
router.post('/events/:id',updateEvent);
router.delete('/delevent/:id',deleteEvent);
router.get('/getevent',getAllEvents);

router.post('/insertquiz', insertQuizQuestion);
router.get('/quiz/:topicId', getQuestionsByTopicId);
router.post('/quiz/:topicId/check-answer', checkAnswerByTopicId);
router.get('/alltopics', getAllTopicNames);



// Route to add marks
router.post('/addmarks', addMarks);

// Route to get all marks
router.get('/allmarks', getAllMarks);

// Route to get marks by module ID
router.get('/marks/module/:moduleId', getMarksByModuleId);

// Route to get marks by user ID
router.get('/marks/user/:userId', getMarksByUserId);


module.exports = router;
