import {useState} from 'react';
import axios from 'axios';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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

    return (
        <div>
            <Box disableGutters
                 sx={{
                     ml: 50,
                     maxWidth: "sm",
                     marginTop: 7,
                     display: "flex",
                     flexDirection: "column",
                     alignItems: "center",
                     backgroundColor: "rgba(0,0,0,.5)",
                     color: "#fff",
                     borderRadius: "0%",
                     padding: "20px",
                 }}>
                <form onSubmit={handleSubmit}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-evenly",
                        }}
                    >
                        <TextField id="outlined-basic" label="Outlined" variant="filled" value={input}
                                   onChange={handleInputChange}/>
                        <Button
                            style={{width: "100px"}}
                            type="submit"
                            fullWidth
                            color="secondary"
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Submit
                        </Button>
                    </Box>
                </form>
            </Box>
            {output && <div>{output}</div>}
        </div>
    );
}

export default App;