import React, { useState } from 'react';
import axios from 'axios';
import './AddQuizForm.css';
const AddQuizForm = () => {
  const [quizData, setQuizData] = useState({
    topic: '',
    questions: []
  });
  const [submissionStatus, setSubmissionStatus] = useState('');

  const handleChange = (e, questionIndex, optionIndex) => {
    const { name, value } = e.target;
    if (name === 'text') {
      const updatedOptions = [...quizData.questions[questionIndex].options];
      updatedOptions[optionIndex] = { text: value };
      const updatedQuestions = [...quizData.questions];
      updatedQuestions[questionIndex] = {
        ...updatedQuestions[questionIndex],
        options: updatedOptions
      };
      setQuizData({ ...quizData, questions: updatedQuestions });
    } else {
      const updatedQuestions = [...quizData.questions];
      updatedQuestions[questionIndex] = {
        ...updatedQuestions[questionIndex],
        [name]: value
      };
      setQuizData({ ...quizData, questions: updatedQuestions });
    }
  };

  const addOption = (questionIndex) => {
    const updatedOptions = [...quizData.questions[questionIndex].options, { text: '' }];
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[questionIndex] = {
      ...updatedQuestions[questionIndex],
      options: updatedOptions
    };
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  const addQuestion = () => {
    setQuizData({
      ...quizData,
      questions: [
        ...quizData.questions,
        { question: '', options: [{ text: '' }], answer: '' }
      ]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/insertQuiz', quizData);
      console.log('Quiz added:', response.data);
      setSubmissionStatus('Question added successfully!');
      // Clear the form after successful submission
      setQuizData({
        topic: '',
        questions: []
      });
    } catch (error) {
      console.error('Error adding quiz:', error);
      setSubmissionStatus('Failed to add question');
    }
  };

  return (
    <div>
      {submissionStatus && <p>{submissionStatus}</p>}
      <form className="form-container" onSubmit={handleSubmit}>
        <label htmlFor="topic">Topic:</label>
        <input type="text" id="topic" name="topic" value={quizData.topic} onChange={(e) => setQuizData({ ...quizData, topic: e.target.value })} required />
        
        {quizData.questions.map((question, questionIndex) => (
          <div key={questionIndex} className="question-container">
            <label htmlFor={`question${questionIndex}`}>Question:</label>
            <input type="text" id={`question${questionIndex}`} name={`question`} value={question.question} onChange={(e) => handleChange(e, questionIndex)} required />
            
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex} className="option-container">
                <label htmlFor={`option${questionIndex}${optionIndex}`}>Option:</label>
                <input type="text" id={`option${questionIndex}${optionIndex}`} name="text" value={option.text} onChange={(e) => handleChange(e, questionIndex, optionIndex)} required />
              </div>
            ))}
            
            <button type="button" onClick={() => addOption(questionIndex)}>Add Option</button>
            
            <label htmlFor={`answer${questionIndex}`}>Answer:</label>
            <input type="text" id={`answer${questionIndex}`} name={`answer`} value={question.answer} onChange={(e) => handleChange(e, questionIndex)} required />
          </div>
        ))}
        
        <button type="button" onClick={addQuestion}>Add Question</button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddQuizForm;
