// src/Components/StudentPopup.js
import React from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const StudentPopup = ({ open, onClose, student }) => {
  if (!student) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant='h4'>Student Details</Typography>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          style={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant="h6">First Name: {student.first_name}</Typography>
        <Typography variant="h6">Last Name: {student.last_name}</Typography>
        <Typography variant="h6">Email: {student.email}</Typography>
        <Typography variant="h6">Phone: {student.phone}</Typography>
        <Typography variant="h6">Gender: {student.gender}</Typography>
        <Typography variant="h6">Address: {student.address}</Typography>
        <Typography variant="h6">Field: {student.field}</Typography>
        <Typography variant="h6">Hobbies: {student.hobbies.join(', ')}</Typography>
        <Typography variant="h6">Joining Date: {student.joining_date}</Typography>
        {student.image && (
          <img
            src={`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/images/${student.image}`}
            alt="Student"
            style={{ maxWidth: '100%', maxHeight: '300px', marginTop: '1rem' }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default StudentPopup;
