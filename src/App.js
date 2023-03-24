import {Fragment, useState} from 'react';
import axios from 'axios';
import TextField from "@mui/material/TextField";
import ResponseContainer from "./components/ResponseContainer";
import LoadingIndicator from "./components/LoadingIndicator";
import CardContent from '@mui/material/CardContent';
import Container from "@mui/material/Container";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SpeedIcon from '@mui/icons-material/Speed';
import CardComponent from "./components/CardComponent";
import ClearButton from "./components/ClearButton";
import SubmitButton from "./components/SubmitButton";


const CHAT_URI = 'http://localhost:5000/chat'
const EVALUATION_URI = 'http://localhost:5000/evaluate';

const App = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [evaluation, setEvaluation] = useState('')
    const [isLoadingChat, setIsLoadingChat] = useState(false)
    const [isLoadingEval, setIsLoadingEval] = useState(false)

    const initialStates = () => {
        setInput('')
        setOutput('')
        setEvaluation('')
    };

    const handleInputChange = event => {
        setInput(event.target.value);
    };

    const handleSubmit = async event => {
        initialStates();
        setIsLoadingChat(true);
        event.preventDefault();
        try {
            await axios.post(CHAT_URI, {input}).then((response) => {
                    setOutput(response.data);
                }
            )
        } catch (error) {
            console.error(error);
        }
        setIsLoadingChat(false);
    };

    const handleEvaluateSubmit = async (event) => {
        setIsLoadingEval(true);
        event.preventDefault();
        try {
            const response = await axios.post(EVALUATION_URI, {output});
            setEvaluation(response.data);

        } catch (error) {
            console.error(error);
        }
        setIsLoadingEval(false);
    };

    return (
        <Fragment>
            <Container maxWidth="xl">
                <CardComponent>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <TextField id="outlined-basic"
                                       label="Tell me your interests?"
                                       variant="outlined"
                                       fullWidth
                                       value={input}
                                       onChange={handleInputChange}/>
                        </form>
                        <SubmitButton onClick={handleSubmit} label={<PlayArrowIcon/>} color={"primary"}/>
                        {output !== '' &&
                            <ClearButton onClick={() => initialStates()}/>
                        }
                    </CardContent>
                </CardComponent>
                {isLoadingChat && <LoadingIndicator/>}
                {output !== '' &&
                    <ResponseContainer responses={output}>
                        <SubmitButton onClick={handleEvaluateSubmit} label={<SpeedIcon/>} color={"success"}/>
                    </ResponseContainer>
                }
                {isLoadingEval && <LoadingIndicator/>}
                {evaluation &&
                    <ResponseContainer responses={evaluation}/>
                }
            </Container>
        </Fragment>
    );
}

export default App;