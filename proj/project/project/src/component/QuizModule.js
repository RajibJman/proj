import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledFormControl = styled(FormControl)({
  minWidth: 200,
  marginBottom: 16,
});

const StyledButton = styled(Button)({
  marginTop: 16,
});

const OrangeButton = styled(Button)({
//   backgroundColor: '#ff9800',
  fontSize: '1.2rem',
  width: '100%',
  marginBottom: '10px',
});

function QuizModule() {
  const [modules, setModules] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedQuiz, setSelectedQuiz] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/auth/modules")
      .then((response) => response.json())
      .then((data) => {
        if (data.modules) {
          setModules(data.modules);
        } else {
          console.error("Modules data not found:", data);
        }
      })
      .catch((error) => console.error("Error fetching module data:", error));

    fetch("http://localhost:3000/api/auth/alltopics")
      .then((response) => response.json())
      .then((data) => setQuizzes(data))
      .catch((error) => console.error("Error fetching quiz data:", error));
  }, []);

  const handleModuleChange = (event) => {
    setSelectedModule(event.target.value);
  };

  const handleQuizChange = (event) => {
    setSelectedQuiz(event.target.value);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const addUserModule = () => {
    if (selectedModule && selectedQuiz) {
      // Prepare the request body
      const requestBody = {
        moduleId: selectedModule,
        quizId: selectedQuiz
      };
  
      // Send a POST request to the specified endpoint
      fetch('http://localhost:3000/api/auth//modulequiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
        
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Module added for user:', data);
          handleDialogClose(); // Close the dialog after successful update
          alert('Module added successfully');
          setSelectedModule("");
        setSelectedQuiz("");
        })
        .catch(error => console.error('Error adding module:', error));
    }
  };
  

  return (
    <div>
      <OrangeButton variant="contained" color="primary" onClick={handleDialogOpen}>
        Add Module Quiz
      </OrangeButton>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Add Quiz For Module</DialogTitle>
        <DialogContent>
          <StyledFormControl>
            <InputLabel id="moduleDropdownLabel">Select Module</InputLabel>
            <Select
              labelId="moduleDropdownLabel"
              id="moduleDropdown"
              value={selectedModule}
              onChange={handleModuleChange}
              fullWidth
            >
              {modules.map((module) => (
                <MenuItem key={module._id} value={module._id}>
                  {module.moduleName}
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>
          <StyledFormControl>
            <InputLabel id="quizDropdownLabel">Select Quiz Topic</InputLabel>
            <Select
              labelId="quizDropdownLabel"
              id="quizDropdown"
              value={selectedQuiz}
              onChange={handleQuizChange}
              fullWidth
            >
              {quizzes.map((quiz) => (
                <MenuItem key={quiz._id} value={quiz._id}>
                  {quiz.topic}
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addUserModule} color="primary">
            Add Quiz
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default QuizModule;
