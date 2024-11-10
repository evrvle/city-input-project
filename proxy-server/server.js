const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = 4000;

app.use(cors());

app.get('/proxy', async (req, res) => {
    const query = req.query.query;
    const url = `https://kladr-api.ru/api.php?contentType=city&query=${query}`;

    axios.get(url, { timeout: 5000 })
        .then(response => {
            if (response.status !== 200) {
                return res.status(response.status).send('Error fetching data from KLADR API');
            }
            res.json(response.data);
        })
        .catch(err => {
            console.error('Request error:', err);
            res.status(500).send('Error connecting to the KLADR API');
        });
});

app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
});