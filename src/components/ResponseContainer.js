import React from 'react';
import {Box, Typography} from '@mui/material';

const ResponseContainer = ({responses}) => {
    return (
        <Box sx={{p: 2, border: '1px solid #ccc', borderRadius: 4}}>
            <Typography variant="body1" sx={{my: 1}}>
                {responses}
            </Typography>
        </Box>
    );
};

export default ResponseContainer;