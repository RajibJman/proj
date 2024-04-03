import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './QuizPage.css';

const QuizPage = () => {
  const [quiz, setQuiz] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [resultPopup, setResultPopup] = useState(null); // State for result popup
  const quizId = localStorage.getItem('quizId');

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/auth/quiz/${quizId}`);
        setQuiz(response.data);
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };

    if (quizId) {
      fetchQuiz();
    }
  }, [quizId]);

  const handleOptionChange = (questionId, optionText) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: optionText,
    });
  };

  const handleSubmit = async () => {
    // Initialize marks counter
    let marks = 0;

    // Loop through each question in the quiz
    quiz.forEach((question) => {
      // Find the selected option text for the current question
      const selectedOption = selectedAnswers[question._id];

      // Find the correct answer for the current question
      const correctAnswer = question.options.find((option) => option.text === question.answer);

      // Check if the selected option text matches the correct answer text
      if (selectedOption === correctAnswer.text) {
        // Increment marks if the answer is correct
        marks++;
      }
    });

    // Calculate percentage
    const percentage = (marks / quiz.length) * 100;

    // Get user ID and module ID from localStorage
    const userId = localStorage.getItem('userId');
    const moduleId = localStorage.getItem('moduleId');

    // Prepare data object to send to the API
    const data = {
      moduleId: moduleId,
      userId: userId,
      marks: percentage.toFixed(2) // Sending the calculated percentage as marks
    };

    try {
      // Send data to the API endpoint
      await axios.post('http://localhost:3000/api/auth/addmarks', data);
    } catch (error) {
      console.error('Error submitting marks:', error);
    }

    // Determine pass/fail status
    let resultMessage = '';
    let resultColor = '';
    if (percentage >= 75) {
      resultMessage = 'Pass';
      resultColor = 'green';
    } else {
      resultMessage = 'Fail';
      resultColor = 'red';
    }

    // Set result popup content
    setResultPopup(
      <div className="result-popup">
        <h2>Quiz Result</h2>
        <p>Your marks: {marks}/{quiz.length}</p>
        <p>Percentage: {percentage.toFixed(2)}%</p>
        <p style={{ color: resultColor }}>{resultMessage}</p>
        <button onClick={() => setResultPopup(null)}>Close</button>
      </div>
    );

    // Set submitted to true
    setSubmitted(true);
  };

  return (
    <div className="container">
      {quiz ? (
        <div>
          {quiz.map((question) => (
            <div className="question" key={question._id}>
              <h3>{question.question}</h3>
              <ul className="options">
                {question.options.map((option) => (
                  <li className="option" key={option._id}>
                    <input
                      type="radio"
                      name={`question_${question._id}`}
                      id={option._id}
                      value={option._id}
                      onChange={() => handleOptionChange(question._id, option.text)}
                      checked={selectedAnswers[question._id] === option.text}
                      disabled={submitted}
                    />
                    <label htmlFor={option._id}>{option.text}</label>
                  </li>
                ))}
              </ul>
              {submitted && (
                <p style={{ color: selectedAnswers[question._id] === question.answer ? 'green' : 'red' }}>
                  {selectedAnswers[question._id] === question.answer ? 'Correct!' : `Incorrect. Correct answer: ${question.answer}`}
                </p>
              )}
            </div>
          ))}
          <button onClick={handleSubmit} disabled={submitted}>
            Submit
          </button>
          {resultPopup}
        </div>
      ) : (
        <p className="loading">Loading...</p>
      )}
    </div>
  );
};

export default QuizPage;
