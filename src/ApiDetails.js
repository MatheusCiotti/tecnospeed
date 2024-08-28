import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

function ApiDetails() {
    const { apiUrl } = useParams();
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const fetchLogs = async (rota) => {
            try {
                const response = await axios.get(`http://localhost:3001/api/logs/rota/${encodeURIComponent(rota)}`);
                setLogs(response.data);
            } catch (error) {
                console.error(`Error fetching logs for ${rota}:`, error.message);
            }
        };
        
        fetchLogs(apiUrl);
    }, [apiUrl]);

    const data = {
        labels: logs.map((log) => new Date(log.created_at).toLocaleString()), // Convertendo o timestamp para um formato de data legível
        datasets: [
            {
                label: 'Status da API',
                data: logs.map((log) => log.status),
                fill: false,
                borderColor: logs.map((log, index) => {
                    const currentStatus = log.status;
                    const previousStatus = logs[index - 1] ? logs[index - 1].status : 200; // Status 200 como padrão se não houver log anterior
                    const nextStatus = logs[index + 1] ? logs[index + 1].status : 200; // Status 200 como padrão se não houver log posterior

                    if (currentStatus !== 200) {
                        return 'red';
                    } else if (previousStatus !== 200 || nextStatus !== 200) {
                        return 'red';
                    } else {
                        return 'green';
                    }
                }),
                tension: 0.1,
                pointBackgroundColor: logs.map((log) => (log.status === 200 ? 'green' : 'red')),
            },
        ],
    };

    return (
        <Container sx={{ padding: '20px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
            <Typography variant="h4" gutterBottom>
                Logs da API: {decodeURIComponent(apiUrl)}
            </Typography>
            <Typography variant="body2" gutterBottom>
                <Link to="/">Voltar à lista de APIs</Link>
            </Typography>
            <Line data={data} />
        </Container>
    );
}

export default ApiDetails;
