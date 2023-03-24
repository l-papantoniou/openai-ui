import {Typography} from '@mui/material';
import CardComponent from "./CardComponent";

const ResponseContainer = ({responses, children}) => {
    return (
        <CardComponent>
            <Typography variant="body1" sx={{my: 1}}>
                {responses}
            </Typography>
            {children}
        </CardComponent>
    );
};

export default ResponseContainer;