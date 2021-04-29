const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());

const idade = 'importante';

const funcoes = {
    ClienteCadastrado: (cliente) => {
        cliente.status =
            cliente.texto.includes(idade) ?
            'importante' : 'comum';
        axios.post("http://localhost:1000/eventos", {
            tipo: "ClienteClassificado",
            dados: observacao,
        });
    },
}
app.post('/eventos', (req, res) => {
    try {
        funcoes[req.body.tipo](req.body.dados);
    } catch (err) {}
    res.status(200).send({
        msg: "ok"
    });
});
app.listen(3000, () => console.log("Classificação. Porta 3000"));