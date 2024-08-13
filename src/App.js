import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText, Paper } from '@mui/material';
import ApiDetails from './ApiDetails';

function App() {
    const [rotas, setRotas] = useState([]);
    const [selectedRota, setSelectedRota] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3001/api/logs')
            .then(response => {
                const uniqueRotas = [...new Set(response.data.map(log => log.rota))];
                setRotas(uniqueRotas);
            })
            .catch(error => {
                console.error('Error fetching routes:', error);
            });
    }, []);

    const handleRotaClick = (rota) => {
        setSelectedRota(rota);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                API Monitoring Logs
            </Typography>
            <Paper>
                <List>
                    {rotas.map((rota, index) => (
                        <ListItem button key={index} onClick={() => handleRotaClick(rota)}>
                            <ListItemText primary={rota} />
                        </ListItem>
                    ))}
                </List>
            </Paper>
            {selectedRota && <ApiDetails rota={selectedRota} />}
        </Container>
    );
}

export default App;
