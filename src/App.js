import OpenAiForm from "./modules/OpenAiForm";
import {LocalizationProvider} from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';


const App = () => {

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <OpenAiForm/>
            </LocalizationProvider>
        </>
    )

};

export default App;