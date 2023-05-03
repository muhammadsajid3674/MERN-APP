import { Backdrop, CircularProgress } from '@mui/material';
import { memo } from 'react';

const LoaderComponent = memo(function LoaderComponent() {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
})

export default LoaderComponent;