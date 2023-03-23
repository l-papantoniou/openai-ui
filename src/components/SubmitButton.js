import {Button} from '@mui/material';

const SubmitButton = ({onClick, label}) => {
    return (
        <Button
            style={{width: "100px"}}
            type="submit"
            fullWidth
            sx={{mt: 1, ml: 4}}
            variant="contained" color="primary" onClick={onClick}>
            {label}
        </Button>
    );
};

export default SubmitButton;