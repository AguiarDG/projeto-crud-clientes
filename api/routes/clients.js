import express from 'express';
import {
  addClient,
  deleteClient,
  findCepClient,
  getClients,
  updateClient,
  getClient,
} from '../controllers/client.js';

const router = express.Router();

/**
 * Rota para obter a lista de todos os clientes.
 * Método: GET
 * Endpoint: /clients
 * Retorna: Lista de todos os clientes cadastrados.
 */
router.get('/clients', getClients);

/**
 * Rota para obter os detalhes de um cliente específico.
 * Método: GET
 * Endpoint: /clients/:id
 * Parâmetro: id - O ID do cliente a ser buscado.
 * Retorna: Dados do cliente especificado.
 */
router.get('/clients/:id', getClient);

/**
 * Rota para adicionar um novo cliente.
 * Método: POST
 * Endpoint: /clients/
 * Corpo da requisição: Dados do cliente a ser adicionado (nome, código, CPF/CNPJ, etc).
 * Retorna: Sucesso ou erro ao adicionar o cliente.
 */
router.post('/clients/', addClient);

/**
 * Rota para atualizar os dados de um cliente específico.
 * Método: PUT
 * Endpoint: /clients/:id
 * Parâmetro: id - O ID do cliente a ser atualizado.
 * Corpo da requisição: Novos dados do cliente.
 * Retorna: Sucesso ou erro ao atualizar o cliente.
 */
router.put('/clients/:id', updateClient);

/**
 * Rota para deletar um cliente específico.
 * Método: DELETE
 * Endpoint: /clients/:id
 * Parâmetro: id - O ID do cliente a ser deletado.
 * Retorna: Sucesso ou erro ao deletar o cliente.
 */
router.delete('/clients/:id', deleteClient);

/**
 * Rota para buscar informações de endereço baseado no CEP.
 * Método: GET
 * Endpoint: /clients/cep/:cep
 * Parâmetro: cep - O CEP para busca de informações de endereço.
 * Retorna: Informações sobre o endereço correspondente ao CEP fornecido.
 */
router.get('/clients/cep/:cep', findCepClient);

export default router;
