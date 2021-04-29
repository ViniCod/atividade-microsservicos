const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const eventos = [];

app.post("/eventos", async (req, res) => {
    const evento = req.body;
    eventos.push(evento);
    axios.post("http://localhost:2000/eventos", evento);
    axios.post("http://localhost:3000/eventos", evento);
    axios.post("http://localhost:4000/eventos", evento);
    axios.post("http://localhost:5000/eventos", evento);
    res.status(200).send({
        msg: "ok"
    });
});

app.get('/eventos', (req, res) => {
    res.send(eventos);
});

app.listen(1000, () => {
    console.log('Barramento de eventos. Porta 1000.')
})