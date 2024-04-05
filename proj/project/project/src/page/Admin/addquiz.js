import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, InputLabel } from '@mui/material';
import { styled } from '@mui/system';
import Navbar from '../../component/Navbar'; // Assuming the correct file path for Navbar

// Styled form container with custom styles
const FormContainer = styled('div')({
  backgroundColor: '#f0f0f0',
  padding: '20px',
  borderRadius: '8px',
  width: '60%',
  margin: '0 auto',
});

const AddQuizForm = () => {
  const [quizData, setQuizData] = useState({
    topic: '',
    questions: [{ question: '', options: [{ text: '' }], answer: '' }],
  });
  const [submissionStatus, setSubmissionStatus] = useState('');

  const handleChange = (e, questionIndex, optionIndex) => {
    const { name, value } = e.target;
    const updatedQuestions = [...quizData.questions];

    if (name === 'question' || name === 'answer') {
      updatedQuestions[questionIndex][name] = value;
    } else if (name === 'text') {
      updatedQuestions[questionIndex].options[optionIndex].text = value;
    }

    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  const addOption = (questionIndex) => {
    const updatedOptions = [...quizData.questions[questionIndex].options, { text: '' }];
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[questionIndex] = { ...updatedQuestions[questionIndex], options: updatedOptions };
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  const addQuestion = () => {
    setQuizData({
      ...quizData,
      questions: [...quizData.questions, { question: '', options: [{ text: '' }], answer: '' }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post('http://localhost:3000/api/auth/insertQuiz', quizData, config);
      console.log('Quiz added:', response.data);
      setSubmissionStatus('Quiz added successfully!');
      setQuizData({ topic: '', questions: [{ question: '', options: [{ text: '' }], answer: '' }] });
    } catch (error) {
      console.error('Error adding quiz:', error);
      setSubmissionStatus('Failed to add quiz');
    }
  };

  return (
    <div>
      <Navbar />
      <h1 style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>Add Question</h1>
      <FormContainer>
        {submissionStatus && <Typography variant="body1">{submissionStatus}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Topic"
            fullWidth
            value={quizData.topic}
            onChange={(e) => setQuizData({ ...quizData, topic: e.target.value })}
            required
            sx={{
              marginBottom: '20px',
              '& input': {
                backgroundColor: '#FF8000',
                borderRadius: '4px',
                border: '2px solid #007bff',
                boxShadow: '0 0 5px rgba(0, 123, 255, 0.5)',
              },
              '& label': {
                fontSize: '1.2rem', // Increase label text size
                fontWeight: 'bold', // Make label text bold
                marginBottom: '8px', // Add margin below label
              },
            }}
          />

          {quizData.questions.map((question, questionIndex) => (
            <div key={questionIndex}>
              <TextField
                label={`Question ${questionIndex + 1}`}
                fullWidth
                value={question.question}
                onChange={(e) => handleChange(e, questionIndex, null)}
                name="question"
                required
                sx={{
                  marginBottom: '10px',
                  '& input': {
                    backgroundColor: '#4FAF81',
                    borderRadius: '4px',
                    border: '2px solid #007bff',
                    boxShadow: '0 0 5px rgba(0, 123, 255, 0.5)',
                  },
                  '& label': {
                    fontSize: '1.1rem', // Increase label text size
                    fontWeight: 'bold', // Make label text bold
                    marginBottom: '8px', // Add margin below label
                  },
                }}
              />

              {question.options.map((option, optionIndex) => (
                <div key={optionIndex}>
                  <TextField
                    label={`Option ${optionIndex + 1}`}
                    fullWidth
                    value={option.text}
                    onChange={(e) => handleChange(e, questionIndex, optionIndex)}
                    name="text"
                    required
                  />
                </div>
              ))}

              <Button variant="outlined" onClick={() => addOption(questionIndex)}>
                Add Option
              </Button>

              <TextField
                label={`Answer for Question ${questionIndex + 1}`}
                fullWidth
                value={question.answer}
                onChange={(e) => handleChange(e, questionIndex, null)}
                name="answer"
                required
              />
            </div>
          ))}

          <Button variant="outlined" onClick={addQuestion}>
            Add Question
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </form>
      </FormContainer>
    </div>
  );
};

export default AddQuizForm;
