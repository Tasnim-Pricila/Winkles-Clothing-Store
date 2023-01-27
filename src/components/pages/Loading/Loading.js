import React from 'react';
import { SyncLoader } from 'react-spinners';
import { Box } from '@mui/system';

const Loading = () => {

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '90vh'
        }}>
            <SyncLoader size={20} color={"#B51BE1"} />
        </Box>
    );
};

export default Loading;