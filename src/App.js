import React, { useState, useRef } from 'react';
import { Container, Grid, Paper, Typography, Button } from '@mui/material';
import ApiDetails from './ApiDetails';
import './index.css';


const apiUrls = [
    'https://jsonplaceholder.typicode.com/posts',
    'https://jsonplaceholder.typicode.com/comments',
    'https://jsonplaceholder.typicode.com/albums',
    'https://jsonplaceholder.typicode.com/photos',
    'https://jsonplaceholder.typicode.com/todos',
    'https://jsonplaceholder.typicode.com/users',
    'https://api.publicapis.org/entries',
    'https://api.coingecko.com/api/v3/ping',
    'https://api.github.com/users/github',
    'https://dog.ceo/api/breeds/image/random'
];

function App() {
    const [selectedApi, setSelectedApi] = useState(null);
    const detailsRef = useRef(null);

    const handleMonitorClick = (url) => {
        setSelectedApi(url);
        setTimeout(() => {
            detailsRef.current.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    return (
        <Container sx={{ padding: '20px', minHeight: '100vh', backgroundColor: '#121212' }}>
            <Grid container spacing={3} justifyContent="center">
                {apiUrls.map((url, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <Paper
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '20px',
                                height: '150px',
                                backgroundColor: '#1d1d1d',
                                borderRadius: '10px',
                                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.7)',
                                },
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    fontSize: '1.2rem',
                                    fontWeight: 'bold',
                                    color: '#4caf50',
                                    marginBottom: '10px',
                                    textAlign: 'center',
                                }}
                            >
                                API {index + 1}
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleMonitorClick(url)}
                                sx={{
                                    backgroundColor: '#4caf50',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    borderRadius: '20px',
                                    padding: '10px 20px',
                                    '&:hover': {
                                        backgroundColor: '#388e3c',
                                    },
                                }}
                            >
                                Monitorar API
                            </Button>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
            {selectedApi && (
         <div ref={detailsRef} style={{ marginTop: '60px' }}>
        <ApiDetails apiUrl={selectedApi} />
        </div>
        )}

        </Container>
    );
}

export default App;
