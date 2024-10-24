const axios = require('axios');
const cron = require('node-cron');
const { Pool } = require('pg');
const { format } = require('date-fns');

// Configuração do banco PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '123456',
    port: 5432,
});

const apiUrls = [
    'http://www.homologacao.plugboleto.com.br/api/v1/boletos',
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

async function checkApiStatus(apiUrl) {
    const created_at = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    try {
        const response = await axios.get(apiUrl);
        console.log(`API ${apiUrl} está funcionando. Status: ${response.status}`);
        
        await pool.query(
            'INSERT INTO log (rota, status, created_at) VALUES ($1, $2, $3)',
            [apiUrl, response.status, created_at]
        );
    } catch (error) {
        console.error(`Falha ao conectar na API ${apiUrl}:`, error.message);
        
        await pool.query(
            'INSERT INTO log (rota, status, created_at) VALUES ($1, $2, $3)',
            [apiUrl, 999, created_at]
        );
    }
}

async function checkAllApis() {
    for (const url of apiUrls) {
        await checkApiStatus(url);
    }
}

cron.schedule('*/30 * * * * *', () => {
    console.log('Verificando o status das APIs...');
    checkAllApis();
});

console.log('Monitorando 10 APIs. A cada 30 segundos, será realizada uma verificação.');
