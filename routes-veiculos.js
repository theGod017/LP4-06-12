const express = require('express');
const router = express.Router();

// Simular um banco de dados em memória
let veiculos = [
  { id: 1, nome: 'Gol', fabricante: 'Volkswagen', ano: 2020, combustivel: 'Gasolina', cor: 'Branco', preco: 40000 },
  { id: 2, nome: 'Civic', fabricante: 'Honda', ano: 2022, combustivel: 'Gasolina', cor: 'Prata', preco: 110000 },
];

// Rota POST: Adicionar um veículo
router.post('/', (req, res) => {
  const { nome, fabricante, ano, combustivel, cor, preco } = req.body;
  if (!nome || !fabricante || !ano || !combustivel || !cor || !preco) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
  }

  const novoVeiculo = { id: veiculos.length + 1, nome, fabricante, ano, combustivel, cor, preco };
  veiculos.push(novoVeiculo);

  res.status(201).json(novoVeiculo);
});

// Rota PUT: Atualizar o preço de um veículo
router.put('/', (req, res) => {
  const { id, preco } = req.body;
  if (!id || !preco) {
    return res.status(400).json({ erro: 'ID e preço são obrigatórios.' });
  }

  const veiculo = veiculos.find(v => v.id === id);
  if (!veiculo) {
    return res.status(404).json({ erro: 'Veículo não encontrado.' });
  }

  veiculo.preco = preco;
  res.status(200).send(`O preço do veículo ID ${id} foi atualizado para R$${preco}.`);
});

// Rota DELETE: Excluir um veículo
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  veiculos = veiculos.filter(v => v.id !== id);

  res.status(202).send(`O veículo de ID ${id} foi excluído com sucesso.`);
});

module.exports = router;
