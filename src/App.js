import React from 'react';
import { Container, Grid, Paper, Typography, Button } from '@mui/material';
import { Route, Routes, Link } from 'react-router-dom';
import ApiDetails from './ApiDetails';

// Lista das URLs das APIs
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
    return (
        <Container sx={{ padding: '20px', minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
            <Routes>
                <Route path="/" element={
                    <Grid container spacing={3} justifyContent="center">
                        {apiUrls.map((url, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
                                <Paper
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '20px',
                                        height: '150px',
                                        backgroundColor: '#fff',
                                        borderRadius: '10px',
                                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                                        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                                        '&:hover': {
                                            transform: 'translateY(-5px)',
                                            boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
                                        },
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontSize: '1.2rem',
                                            fontWeight: 'bold',
                                            color: '#3f51b5',
                                            marginBottom: '10px',
                                        }}
                                    >
                                        API {index + 1}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        component={Link}
                                        to={`/api/${encodeURIComponent(url)}`}
                                        sx={{
                                            backgroundColor: '#3f51b5',
                                            color: 'white',
                                            fontWeight: 'bold',
                                            borderRadius: '20px',
                                            padding: '10px 20px',
                                            '&:hover': {
                                                backgroundColor: '#303f9f',
                                            },
                                        }}
                                    >
                                        Monitorar API
                                    </Button>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                } />
                <Route path="/api/:apiUrl" element={<ApiDetails />} />
            </Routes>
        </Container>
    );
}

export default App;
