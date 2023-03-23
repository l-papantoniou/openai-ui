import {useState, Fragment} from 'react';
import axios from 'axios';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ResponseContainer from "./components/ResponseContainer";
import LoadingIndicator from "./components/LoadingIndicator";


import CardContent from '@mui/material/CardContent';
import Container from "@mui/material/Container";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CardComponent from "./components/CardComponent";
import ClearButton from "./components/ClearButton";

const CHAT_URI = `http://localhost:5000/chat`;

function App() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('Lampis');
    const [isLoading, setIsLoading] = useState(false)

    const initialStates = () => {
        setInput('')
        setOutput('')
    };

    const handleInputChange = event => {
        setInput(event.target.value);
    };

    const handleSubmit = async event => {
        setIsLoading(true);
        event.preventDefault();
        try {
            const response = await axios.post(CHAT_URI);
            setOutput(response.data);

        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    };


    return (
        <Fragment>
            <Container maxWidth="xl">
                <CardComponent>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <TextField id="outlined-basic"
                                       label="Hey, how can I help you?"
                                       variant="outlined"
                                       fullWidth
                                       value={input}
                                       onChange={handleInputChange}/>
                        </form>
                        <Button
                            style={{width: "100px"}}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 1}}
                        >
                            <PlayArrowIcon/>
                        </Button>
                        {output !== '' &&
                            <ClearButton onClick={() => initialStates()}/>
                        }
                    </CardContent>
                </CardComponent>
                {isLoading && <LoadingIndicator/>}
                {output && <ResponseContainer responses={output}/>}
            </Container>
        </Fragment>
    );
}

export default App;