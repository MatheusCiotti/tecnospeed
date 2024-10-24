const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());

// Conexão com PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '123456',
    port: 5432,
});

// Endpoint para obter todos os logs
app.get('/logs', async (req, res) => {
    const { rota, limit } = req.query;
    console.log(`Fetching logs for rota: ${rota} with limit: ${limit}`);
    const query = `SELECT status, created_at FROM log WHERE rota = $1 ORDER BY created_at DESC LIMIT $2`;
    try {
        const result = await pool.query(query, [rota, limit]);
        console.log(`Logs found: ${result.rows.length}`);
        res.json(result.rows);
    } catch (err) {
        console.error('Database error:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// Endpoint para obter os últimos 10 logs por rota
app.get('/api/logs/rota/:rota', async (req, res) => {
    const rota = req.params.rota;
    console.log(`Fetching last 10 logs for rota: ${rota}`);
    const query = `SELECT * FROM log WHERE rota LIKE $1 ORDER BY id DESC LIMIT 10`;
    try {
        const result = await pool.query(query, [`%${rota}%`]);
        console.log(`Logs found for ${rota}: ${result.rows.length}`);
        res.json(result.rows);
    } catch (err) {
        console.error('Database error:', err.message);
        res.status(500).send(err.message);
    }
});

// Endpoint para obter todos os logs de erro
app.get('/api/errors', async (req, res) => {
    console.log('Fetching all error logs');
    const query = `SELECT rota, status, created_at FROM log WHERE status != 200 ORDER BY created_at DESC`;
    try {
        const result = await pool.query(query);
        console.log(`Errors found: ${result.rows.length}`);
        res.json(result.rows);
    } catch (err) {
        console.error('Database error:', err.message);
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`API server running on http://localhost:${port}`);
});
