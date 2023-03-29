import React from "react";
import {AppBar, Box, Container} from "@mui/material";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import DarkMode from "./DarkMode";

export const NavBar = () => {

    return (
        <Box sx={{flexGrow: 2, paddingTop: 1}}>
            <AppBar position="static" color="transparent">
                <Container>
                    <Toolbar>
                        <Typography textAlign='center' variant="h6" component="div" sx={{flexGrow: 1}}>
                            Travel-GTP By PapGk
                        </Typography>
                        <DarkMode/>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
}