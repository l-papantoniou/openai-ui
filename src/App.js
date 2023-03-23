import {useState} from 'react';
import axios from 'axios';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from "@mui/material/Container";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RefreshIcon from '@mui/icons-material/Refresh';


function App() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const handleInputChange = event => {
        setInput(event.target.value);
    };

    const handleSubmit = async event => {
        event.preventDefault();

        const response = await axios.post(`http://localhost:5000/chat`);

        setOutput(response.data);
    };

    const initialStates = () => {
        setInput("")
        setOutput("")
    };

    return (
        <div>
            <Container maxWidth="xl">
                <Card sx={{
                    ml: 50,
                    maxWidth: "sm",
                    marginTop: 7,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    color: "#fff",
                    padding: "20px",
                }}>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <TextField id="outlined-basic"
                                       label="Hey, how can I help you?"
                                       variant="outlined"
                                       value={input}
                                       onChange={handleInputChange}/>
                            <Button
                                style={{width: "100px"}}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 1, ml: 4}}
                            >
                                <PlayArrowIcon/>
                            </Button>
                        </form>

                    </CardContent>
                    //Clear Button
                    <Button
                        style={{width: "100px"}}
                        fullWidth
                        color="warning"
                        variant="contained"
                        onClick={() => initialStates()}
                        sx={{ml: 60}}
                    >
                        <RefreshIcon/>
                    </Button>
                </Card>
            </Container>
            {
                output && <div>{output}</div>
            }
        </div>
    )
        ;
}

export default App;