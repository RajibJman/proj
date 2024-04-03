import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Typography } from '@material-ui/core';
import axios from 'axios';

function ModuleList() {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/auth/modules');
      setModules(response.data.modules);
    } catch (error) {
      console.error('Error fetching modules:', error);
      alert('Failed to fetch modules. Please try again.');
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Module List</Typography>
      <List>
        {modules.map(module => (
          <ListItem key={module._id}>
            <ListItemText 
              primary={`Module Name: ${module.moduleName}, Start Date: ${new Date(module.startDate).toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', month: 'numeric', day: 'numeric'})}, End Date: ${new Date(module.endDate).toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', month: 'numeric', day: 'numeric'})}, Status: ${module.moduleStatus}`} 
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default ModuleList;
