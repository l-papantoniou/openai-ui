import Button from "@mui/material/Button";
import RefreshIcon from "@mui/icons-material/Refresh";

const ClearButton = ({onClick}) => {
    return (
        <Button
            style={{width: "100px"}}
            fullWidth
            color="warning"
            variant="contained"
            onClick={onClick}
            sx={{ml: 60}}
        >
            <RefreshIcon/>
        </Button>
    )
}
export default ClearButton;