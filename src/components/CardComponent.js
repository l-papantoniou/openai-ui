import Card from "@mui/material/Card";

const CardComponent = ({children}) => {
    return (
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
            {children}
        </Card>
    )
}

export default CardComponent;
