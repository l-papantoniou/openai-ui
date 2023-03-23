import {Typography} from '@mui/material';

const TitleComponent = ({children, variant = 'h4'}) => {
    return (
        <Typography variant={variant} gutterBottom>
            {children}
        </Typography>
    );
};

export default TitleComponent;