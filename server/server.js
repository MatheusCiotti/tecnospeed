const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());

const db = new sqlite3.Database('./honesto.sqlite3');

// Endpoint para obter todos os logs
// Exemplo de configuração para Express
app.get('/logs', (req, res) => {
    const { rota, limit } = req.query;
    const query = `SELECT status, created_at FROM log WHERE rota = ? ORDER BY created_at DESC LIMIT ?`;
    db.all(query, [rota, limit], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});



// Endpoint para obter os últimos 10 logs por rota
app.get('/api/logs/rota/:rota', (req, res) => {
    const rota = req.params.rota;
    console.log(`Fetching last 10 logs for rota: ${rota}`);
    db.all('SELECT * FROM log WHERE rota LIKE ? ORDER BY id DESC LIMIT 10', [`%${rota}%`], (err, rows) => {
        if (err) {
            console.error('Database error:', err.message);
            res.status(500).send(err.message);
            return;
        }
        console.log(`Logs found for ${rota}: ${rows.length}`);
        res.json(rows);
    });
});

app.listen(port, () => {
    console.log(`API server running on http://localhost:${port}`);
});
