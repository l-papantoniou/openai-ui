import { CircularProgress } from '@mui/material';

const LoadingIndicator = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress />
        </div>
    );
};

export default LoadingIndicator;