import {Button} from '@mui/material';

const SubmitButton = ({onClick, label, color}) => {
    return (
        <Button
            style={{width: "100px"}}
            type="submit"
            fullWidth
            sx={{mt: 1, ml: 4}}
            variant="contained" color={color} onClick={onClick}>
            {label}
        </Button>
    );
};

export default SubmitButton;