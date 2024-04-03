import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper, Table, TableHead, TableBody, TableCell, TableRow } from '@material-ui/core';
import Navbar from '../component/NAvbar';
import axios from 'axios'; // Import axios for making HTTP requests

const useStyles = makeStyles((theme) => ({
  section: {
    margin: theme.spacing(2, 0),
    padding: theme.spacing(2),
    cursor: 'pointer',
    '&.expanded': {
      background: theme.palette.grey[200],
    },
  },
  heading: {
    textAlign: 'center', // Center align the headings
    marginBottom: theme.spacing(4), // Increase margin bottom
  },
  h5: {
    textAlign: 'left', // Align h5 to the left
  },
}));

const ModuleStatus = () => {
  const classes = useStyles();
  const [completedModules, setCompletedModules] = useState([]);
  const [ongoingModules, setOngoingModules] = useState([]);
  const [pendingModules, setPendingModules] = useState([]);
  const [expandedStatus, setExpandedStatus] = useState(null);

  useEffect(() => {
    // Fetch module data from the API endpoint
    axios.get('http://localhost:3000/api/auth/modules')
      .then(response => {
        // Filter modules based on status and update state accordingly
        const completed = response.data.modules.filter(module => module.moduleStatus === 'complete');
        const ongoing = response.data.modules.filter(module => module.moduleStatus === 'ongoing');
        const pending = response.data.modules.filter(module => module.moduleStatus === 'pending');

        setCompletedModules(completed);
        setOngoingModules(ongoing);
        setPendingModules(pending);
      })
      .catch(error => {
        console.error('Error fetching module data:', error);
      });
  }, []);

  // Function to format date
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `${formattedDate} ${formattedTime}`;
  }

  // Function to handle click on section
  const handleSectionClick = (status) => {
    setExpandedStatus(expandedStatus === status ? null : status);
  };

  return (
    <>
      <Navbar />
      <Typography variant="h3" gutterBottom className={classes.heading}>Module Status</Typography>
      <div className={classes.moduleStatus}>
        <Paper className={`${classes.section} ${expandedStatus === 'completed' ? 'expanded' : ''}`} onClick={() => handleSectionClick('completed')}>
          <Typography variant="h5" gutterBottom className={`${classes.heading} ${classes.h5}`}>Completed  Module ({completedModules.length})</Typography>
          {expandedStatus === 'completed' && (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Module Name</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {completedModules.map(module => (
                  <TableRow key={module._id}>
                    <TableCell>{module.moduleName}</TableCell>
                    <TableCell>{formatDate(module.startDate)}</TableCell>
                    <TableCell>{formatDate(module.endDate)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Paper>
        <Paper className={`${classes.section} ${expandedStatus === 'ongoing' ? 'expanded' : ''}`} onClick={() => handleSectionClick('ongoing')}>
          <Typography variant="h5" gutterBottom className={`${classes.heading} ${classes.h5}`}>Ongoing  Module ({ongoingModules.length})</Typography>
          {expandedStatus === 'ongoing' && (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Module Name</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ongoingModules.map(module => (
                  <TableRow key={module._id}>
                    <TableCell>{module.moduleName}</TableCell>
                    <TableCell>{formatDate(module.startDate)}</TableCell>
                    <TableCell>{formatDate(module.endDate)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Paper>
        <Paper className={`${classes.section} ${expandedStatus === 'pending' ? 'expanded' : ''}`} onClick={() => handleSectionClick('pending')}>
          <Typography variant="h5" gutterBottom className={`${classes.heading} ${classes.h5}`}>Pending Module ({pendingModules.length})</Typography>
          {expandedStatus === 'pending' && (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Module Name</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pendingModules.map(module => (
                  <TableRow key={module._id}>
                    <TableCell>{module.moduleName}</TableCell>
                    <TableCell>{formatDate(module.startDate)}</TableCell>
                    <TableCell>{formatDate(module.endDate)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Paper>
      </div>
    </>
  );
}

export default ModuleStatus;
