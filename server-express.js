// Importar as bibliotecas
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Configuração do servidor
const localhost = '127.0.0.1';
const port = 8080;

// Criação do aplicativo servidor
const app = express();

// Configurar body-parser para aceitar JSON
app.use(bodyParser.json());

// Configurar a pasta de arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota raiz para exibir a página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Importar as configurações de rotas para veículos
const veiculosRotas = require('./routes-veiculos');
app.use('/veiculo', veiculosRotas);

// Rodar o servidor
app.listen(port, localhost, () =>
  console.log(`O servidor está rodando em http://${localhost}:${port}`)
);
