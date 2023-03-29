import {Fragment, useState} from 'react';
import axios from 'axios';
import TextField from "@mui/material/TextField";
import ResponseContainer from "../components/ResponseContainer";
import LoadingIndicator from "../components/LoadingIndicator";
import CardContent from '@mui/material/CardContent';
import Container from "@mui/material/Container";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SpeedIcon from '@mui/icons-material/Speed';
import CardComponent from "../components/CardComponent";
import ClearButton from "../components/ClearButton";
import SubmitButton from "../components/SubmitButton";
import CustomSelect from "../components/CustomSelect";
import {DestinationOptions} from "../constants/DestinationOptions";
import {TransportationOptions} from "../constants/TransportationOptions";
import {NavBar} from "../components/NavBar";
import {
    handleInputChange,
    handleIslandChange, handleLanguageOptions,
    handleTravelerOptions
} from "../service/handlers";
import {TravelerOptions} from "../constants/TravelerOptions";
import {LanguageOptions} from "../constants/LanguageOptions";


const CHAT_URI = 'http://localhost:5000/chat'
const EVALUATION_URI = 'http://localhost:5000/evaluate';


const OpenAiForm = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [evaluation, setEvaluation] = useState('')
    const [isLoadingChat, setIsLoadingChat] = useState(false)
    const [isLoadingEval, setIsLoadingEval] = useState(false)
    const [destination, setDestination] = useState(DestinationOptions[0].value);
    const [transportation, setTransportation] = useState(TransportationOptions[0].value);
    const [travelers, setTravelers] = useState(TravelerOptions[0].value);
    const [language, setLanguage] = useState(LanguageOptions[0].value);


    const initialStates = () => {
        setInput('')
        setOutput('')
        setEvaluation('')
    };


    const handleSubmit = async event => {
        setIsLoadingChat(true);
        event.preventDefault();
        try {
            await axios.post(CHAT_URI, {destination, travelers,}).then((response) => {
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
            const response = await axios.post(EVALUATION_URI, {output, input, transportation});
            setEvaluation(response.data)

        } catch (error) {
            console.error(error);
        }
        setIsLoadingEval(false);
    };

    return (
        <Fragment>
            <NavBar/>
            <Container maxWidth="xl">
                <CardComponent>
                    <CardContent>
                        <CustomSelect
                            label="Destination"
                            options={DestinationOptions}
                            value={destination}
                            onChange={e => handleIslandChange(e, setDestination, destination)}
                        />
                        <CustomSelect
                            label="Travelers"
                            options={TravelerOptions}
                            value={travelers}
                            onChange={e => handleTravelerOptions(e, setTravelers, travelers)}
                        />
                        <CustomSelect
                            label="Language"
                            options={LanguageOptions}
                            value={language}
                            onChange={e => handleLanguageOptions(e, setLanguage, language)}
                        />
                    </CardContent>
                </CardComponent>
                <CardComponent>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <TextField id="Textfield"
                                       label="What are you interested in?"
                                       variant="outlined"
                                       fullWidth
                                       value={input}
                                       onChange={e => handleInputChange(e, setInput, input)}/>
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
    )
        ;
}

export default OpenAiForm;