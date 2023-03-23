import React from 'react';
import { Button } from '@mui/material';

const SubmitButton = ({ onClick, label }) => {
    return (
        <Button variant="contained" color="primary" onClick={onClick}>
            {label}
        </Button>
    );
};

export default SubmitButton;