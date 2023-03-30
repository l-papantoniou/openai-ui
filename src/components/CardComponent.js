import Card from "@mui/material/Card";

const CardComponent = ({children}) => {
    return (
        <Card sx={{
            ml: 35,
            maxWidth: "md",
            marginTop: 7,
            mb: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",

        }}>
            {children}
        </Card>
    )
}

export default CardComponent;
