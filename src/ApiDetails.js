import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';

function ApiDetails({ rota }) {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/api/logs/rota/${encodeURIComponent(rota)}`)
            .then(response => {
                console.log(`Logs for ${rota}:`, response.data);
                setLogs(response.data);
            })
            .catch(error => {
                console.error(`Error fetching logs for ${rota}:`, error);
            });
    }, [rota]);

    return (
        <Container>
            <Typography variant="h5" gutterBottom>
                Logs for {rota}
            </Typography>
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Rota</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Timestamp</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {logs.map(log => (
                            <TableRow key={log.id}>
                                <TableCell>{log.id}</TableCell>
                                <TableCell>{log.rota}</TableCell>
                                <TableCell>{log.status}</TableCell>
                                <TableCell>{log.timestamp}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Container>
    );
}

export default ApiDetails;
