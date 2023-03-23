import {Typography} from '@mui/material';
import CardComponent from "./CardComponent";

const ResponseContainer = ({responses}) => {
    return (
       <CardComponent>
            <Typography variant="body1" sx={{my: 1}}>
                {responses}
            </Typography>
       </CardComponent>
    );
};

export default ResponseContainer;