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
import {islandsOptions} from "../constants/IslandsOptions";
import {transportationOptions} from "../constants/TransportationOptions";
import {NavBar} from "../components/NavBar";
import {budgetOptions} from "../constants/BudgetOptions";
import {seasonOptions} from "../constants/SeasonOptions";
import {
    handleBudgetOption, handleInputChange,
    handleIslandChange,
    handleSeasonChange,
    handleTransportationChange
} from "../service/handlers";
import {Grid} from "@mui/material";


const CHAT_URI = 'http://localhost:5000/chat'
const EVALUATION_URI = 'http://localhost:5000/evaluate';


const OpenAiForm = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [evaluation, setEvaluation] = useState('')
    const [isLoadingChat, setIsLoadingChat] = useState(false)
    const [isLoadingEval, setIsLoadingEval] = useState(false)
    const [island, setIsland] = useState(islandsOptions[0].value);
    const [transportation, setTransportation] = useState(transportationOptions[0].value);
    const [budgetOption, setBudgetOption] = useState(budgetOptions[0].value);
    const [season, setSeason] = useState(seasonOptions[0].value);


    const initialStates = () => {
        setInput('')
        setOutput('')
        setEvaluation('')
    };


    const handleSubmit = async event => {
        setIsLoadingChat(true);
        event.preventDefault();
        try {
            await axios.post(CHAT_URI, {island, transportation, season, budgetOption, input}).then((response) => {
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
            const response = await axios.post(EVALUATION_URI, {output, budgetOption, input, transportation});
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
                            options={islandsOptions}
                            value={island}
                            onChange={e => handleIslandChange(e, setIsland, island)}
                        />
                        <CustomSelect
                            label="Transportation"
                            options={transportationOptions}
                            value={transportation}
                            onChange={e => handleTransportationChange(e, setTransportation, transportation)}
                        />
                        <CustomSelect
                            label="Season"
                            options={seasonOptions}
                            value={season}
                            onChange={e => handleSeasonChange(e, setSeason, season)}
                        />
                        <CustomSelect
                            label="Budget"
                            options={budgetOptions}
                            value={budgetOption}
                            onChange={e => handleBudgetOption(e, setBudgetOption, budgetOption)}
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