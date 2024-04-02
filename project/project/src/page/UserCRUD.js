import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Typography, Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import RegistrationPage from './registration';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [updateUserId, setUpdateUserId] = useState('');
  const [updateName, setUpdateName] = useState('');
  const [updateEmail, setUpdateEmail] = useState('');
  const [updateRole, setUpdateRole] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/auth/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('Failed to fetch users. Please try again.');
    }
  };

  const handleUpdateOpen = (id, name, email, role) => {
    setUpdateUserId(id);
    setUpdateName(name);
    setUpdateEmail(email);
    setUpdateRole(role);
    setOpen(true);
  };

  const handleUpdateClose = () => {
    setOpen(false);
  };

  const updateUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Token not found in localStorage. Please log in again.');
        return;
      }
  
      const userData = {
        name: updateName,
        email: updateEmail,
        role: updateRole
      };
  
      await axios.post(`http://localhost:3000/api/auth/users/updateuser/${updateUserId}`, userData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchUsers();
      setOpen(false);
      alert('User updated successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user. Please try again.');
    }
  };
  
  

  const deleteUser = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Token not found in localStorage. Please log in again.');
        return;
      }
      await axios.delete(`http://localhost:3000/api/auth/users/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
      alert('User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user. Please try again.');
    }
  };

  return (
    <div>
      <Grid container alignItems="center">
        <Grid item xs>
          <Typography variant="h4" gutterBottom>User List</Typography>
        </Grid>
        <Grid item>
          <RegistrationPage />
        </Grid>
      </Grid>
      <List>
        {users.map(user => (
          <ListItem key={user._id}>
            <ListItemText 
              primary={`Name: ${user.name}, Email: ${user.email}, Role: ${user.role}`} 
            />
            <Button variant="contained" color="primary" onClick={() => handleUpdateOpen(user._id, user.name, user.email, user.role)}>Update</Button>
            <Button variant="contained" color="secondary" onClick={() => deleteUser(user._id)}>Delete</Button>
          </ListItem>
        ))}
      </List>

      {/* Update Dialog */}
      <Dialog open={open} onClose={handleUpdateClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Update User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={updateName}
            onChange={(e) => setUpdateName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            value={updateEmail}
            onChange={(e) => setUpdateEmail(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              value={updateRole}
              onChange={(e) => setUpdateRole(e.target.value)}
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose} color="primary">
            Cancel
          </Button>
          <Button onClick={updateUser} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UserList;
