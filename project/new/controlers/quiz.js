const Quiz = require('../models/quiz');

async function insertQuizQuestion(req, res) {
    const { topic, questions } = req.body;
      
    try {
      const existingQuiz = await Quiz.findOne({ topic: topic });
  
      if (!existingQuiz) {
        const newQuiz = new Quiz({
          topic: topic,
          questions: questions
        });
  
        const savedQuiz = await newQuiz.save();
        res.status(201).json(savedQuiz);
      } else {
        // Push the new questions to the existing quiz's questions array
        existingQuiz.questions.push(...questions);
  
        // Save the updated quiz
        const savedQuiz = await existingQuiz.save();
  
        res.status(201).json(savedQuiz);
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  

async function getQuestionsByTopic(req, res) {
    const topic = req.params.topic;
    // console.log(topic)
    try {
      const quiz = await Quiz.find();
      console.log(quiz[0].topic)
      if (!quiz) {
        return res.status(404).json({ message: 'Quiz not found for the given topic' });
      }


    
  
    //   const questions = quiz.questions.map(que => ({
    //     question_id: que._id,
    //     question: que.question,
    //     options: que.options.map(option => option.text)
    //   }));
  
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }



  async function checkAnswer(req, res) {
    const { topic, questionId, userOption } = req.body;

  try {
    // Find the quiz by its topic
    const quiz = await Quiz.findOne({ topic: topic });

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found for the given topic' });
    }
      // Find the question by its ID
      const question = quiz.questions.find(q => q._id.toString() === questionId);

      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }
  
      // Check if the user's option matches the correct answer
      if (userOption === question.answer) {
        // If the answer is correct, add 5 points to the user's score (assuming you have a scoring system)
        // Replace this logic with your actual scoring mechanism
        const updatedScore = 5;
  
        return res.json({ message: 'Correct answer!', score: updatedScore });
      } else {
        // If the answer is incorrect, you can handle it accordingly
        return res.json({ message: 'Incorrect answer' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }


  async function getAllTopicNames(req, res) {
    try {
      // Fetch all topics from the database
      const topics = await Quiz.find({}, { topic: 1 });
  
      // Extract topic names from the retrieved topics
      console.log(topics);

      const topicNames = topics.map(t => t.topic);
      console.log(topicNames);
  
      // Send the topic names as a JSON response
      res.json(topics);
    } catch (error) {
      // Handle any errors that occur during the database operation
      res.status(500).json({ message: error.message });
    }
  }





module.exports = {
  insertQuizQuestion,
  getQuestionsByTopic,
  checkAnswer,
  getAllTopicNames
};
