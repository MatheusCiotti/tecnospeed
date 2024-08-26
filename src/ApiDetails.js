import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

function ApiDetails() {
    const { apiUrl } = useParams();
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/logs?rota=${encodeURIComponent(apiUrl)}&limit=10`);
                setLogs(response.data);
                setError(null);  // Limpa o erro se a requisição for bem-sucedida
            } catch (error) {
                setError(`Erro ao buscar logs para ${apiUrl}: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };
        fetchLogs();
    }, [apiUrl]);

    return (
        <Container sx={{ padding: '20px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
            <Typography variant="h4" gutterBottom>
                Logs da API: {decodeURIComponent(apiUrl)}
            </Typography>
            <Typography variant="body2" gutterBottom>
                <Link to="/">Voltar à lista de APIs</Link>
            </Typography>
            {loading ? (
                <Typography variant="body2">Carregando...</Typography>
            ) : error ? (
                <Typography variant="body2" color="error">
                    {error}
                </Typography>
            ) : logs.length > 0 ? (
                <List>
                    {logs.map((log, index) => (
                        <ListItem key={index}>
                            <ListItemText
                                primary={`Status: ${log.status}`}
                                secondary={`Data: ${log.created_at}`}
                            />
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography variant="body2">Nenhum log disponível.</Typography>
            )}
        </Container>
    );
}

export default ApiDetails;
