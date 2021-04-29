const express = require("express");
const app = express();
app.use(express.json());
const axios = require("axios");
const baseConsulta = {};
const funcoes = {
    ClienteCadastrado: (cliente) => {
        baseConsulta[cliente.contador] = cliente;
    },
    IngressoCriado: (ingresso) => {
        const ingressos =
            baseConsulta[ingresso.clienteId]["ingressos"] || [];
        ingressos.push(ingresso);
        baseConsulta[ingresso.clienteId]["ingressos"] =
            ingressos;
    },
    IngressoAtualizado: (ingresso) => {
        const ingressos = baseConsulta[ingresso.clienteId]["ingressos"];
        const indice = ingressos.findIndex((o) => o.id === ingresso.id);
        ingressos[indice] = ingresso;
    }
};

app.get("/clientes", (req, res) => {
    res.status(200).send(baseConsulta);
});
app.post("/eventos", (req, res) => {
    try {
        funcoes[req.body.tipo](req.body.dados);
    } catch (err) {}
    res.status(200).send(baseConsulta);
});
app.listen(4000, async () => {
    console.log("Consultas. Porta 4000");
    const resp = await axios.get("http://localhost:1000/eventos");

    resp.data.forEach((valor, indice, colecao) => {
        try {
            funcoes[valor.tipo](valor.dados);
        } catch (err) {}
    });
});