const express = require('express');
const app = express();
app.use(express.json());
const axios = require("axios");
const clientes = {};
contador = 0;
app.get('/clientes', (req, res) => {
    res.send(clientes);
});
app.put('/clientes', async (req, res) => {
    contador++;
    const {
        nome,
        endereco,
        idade,
        status
    } = req.body;
    clientes[contador] = {
        contador,
        nome,
        endereco,
        idade,
        status
    }
    await axios.post("http://localhost:1000/eventos", {
        tipo: "ClienteCadastrado",
        dados: {
            contador,
            nome,
            endereco,
            idade,
            status
        },
    });
    res.status(201).send(clientes[contador]);
});
app.listen(2000, () => {
    console.log('Clientes. Porta 2000');
});