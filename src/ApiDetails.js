import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import axios from 'axios';

function ApiDetails() {
    const { apiUrl } = useParams();
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLogs = async () => {
            setLoading(true);  // Inicia o carregamento
            try {
                const response = await axios.get(`http://localhost:3001/api/logs/rota/${encodeURIComponent(apiUrl)}`);
                setLogs(response.data);
                setError(null);  // Limpa qualquer erro anterior
            } catch (err) {
                setError(`Erro ao buscar logs para ${apiUrl}: ${err.message}`);
                setLogs([]);  // Limpa os logs em caso de erro
            } finally {
                setLoading(false);  // Finaliza o carregamento
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
                <CircularProgress />  // Indicador de carregamento
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
