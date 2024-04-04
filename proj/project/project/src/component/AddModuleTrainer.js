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
  backgroundColor: '#ff9800',
  fontSize: '1.2rem',
  width: '100%',
  marginBottom: '10px',
});

const AddUserModuleButton = styled(Button)({
  fontSize: '1.2rem',
  width: '100%',
  marginBottom: '10px',
});

function AddModuleTrainer() {
  const [users, setUsers] = useState([]);
  const [modules, setModules] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/auth/allData")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.user); // Logging user data to check structure
        // Filter users with role === 'employee'
        const filteredUsers = data.user.filter(user => user.role === 'Employee');
        setUsers(filteredUsers);
      })
      .catch((error) => console.error("Error fetching trainer data:", error));
  
    fetch("http://localhost:3000/api/auth/modules")
      .then((response) => response.json())
      .then((data) => setModules(data.modules))
      .catch((error) => console.error("Error fetching module data:", error));
  }, []);
  

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleModuleChange = (event) => {
    setSelectedModule(event.target.value);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const addUserModule = () => {
    if (selectedUser && selectedModule) {
      // Prepare the request body
      const requestBody = {
        selectedUser_id: selectedUser,
        selectedModule_id: selectedModule
      };
  
      // Send a POST request to the specified endpoint
      fetch('http://localhost:3000/api/auth/moduletrainer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })
        .then(response => {
          switch (response.status) {
            case 200:
              // Success: Module added successfully
              return response.json();
            case 400:
              // Bad Request: Module already added to user
              throw new Error('Module already added to user');
            case 404:
              // Not Found: User not found
              throw new Error('User not found');
            case 500:
              // Internal Server Error: Server error occurred
              throw new Error('Internal server error');
            default:
              throw new Error('Unknown error occurred');
          }
        })
        .then(data => {
          // Handle success response
          console.log('Module added for user:', data);
          alert('Module added successfully');
          setSelectedUser("");
          setSelectedModule("");
          handleDialogClose(); // Close the dialog after successful update
        })
        .catch(error => {
          // Handle errors
          console.error('Error adding trainer:', error.message);
          alert(error.message);
        });
    }
  };
  

  return (
    <div>
      <AddUserModuleButton variant="contained" color="primary" onClick={handleDialogOpen}>
        Add Module Trainer
      </AddUserModuleButton>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Add Trainer for Module</DialogTitle>
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
            <InputLabel id="userDropdownLabel">Select Trainer</InputLabel>
            <Select
              labelId="userDropdownLabel"
              id="userDropdown"
              value={selectedUser}
              onChange={handleUserChange}
              fullWidth
            >
              {users.map((user) => (
                <MenuItem key={user._id} value={user._id}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <OrangeButton onClick={addUserModule} color="primary">
            Add Trainer
          </OrangeButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddModuleTrainer;
