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

function AddUserModule() {
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
        setUsers(data.user);
      })
      .catch((error) => console.error("Error fetching user data:", error));

    fetch("http://localhost:3000/api/auth/module")
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
      fetch('http://localhost:3000/api/auth/addusermodule', {
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
        })
        .catch(error => console.error('Error adding module:', error));
    }
  };
  

  return (
    <div>
      <StyledButton variant="contained" color="primary" onClick={handleDialogOpen}>
        AddUserModule
      </StyledButton>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Add Module for User</DialogTitle>
        <DialogContent>
          <StyledFormControl>
            <InputLabel id="userDropdownLabel">Select User</InputLabel>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addUserModule} color="primary">
            Add Module
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddUserModule;
