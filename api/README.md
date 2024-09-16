## 📖 Documentação da API

A seguir estão os endpoints disponíveis na API para gerenciamento de clientes.

### Lista de Endpoints

#### 1. Obter lista de clientes
- **Método:** `GET`
- **Endpoint:** `/clients`
- **Descrição:** Retorna a lista de todos os clientes cadastrados no sistema.
- **Resposta de sucesso:**
  ```json
  [
    {
      "id": 1,
      "nome": "Nome do Cliente",
      "codigo": "12345",
      "cpf_cnpj": "000.000.000-00"
    },
    {
      "id": 2,
      "nome": "Outro Cliente",
      "codigo": "54321",
      "cpf_cnpj": "111.111.111-11"
    }
  ]
  ```
#### 2. Obter detalhes de um cliente
- **Método:** `GET`
- **Endpoint:** `/clients/:id`
- **Parámetro:** `id` - O ID do cliente a ser buscado.
- **Descrição:** Retorna os detalhes de um cliente específico.
- **Resposta de sucesso:**
  ```json
  [
    {
      "id": 1,
      "nome": "Nome do Cliente",
      "codigo": "12345",
      "cpf_cnpj": "000.000.000-00",
      "endereco": "Rua Exemplo, 123"
    }
  ]
  ```
#### 3. Adicionar um novo cliente
- **Método:** `POST`
- **Endpoint:** `/clients/`
- **Corpo da requisição:**
  ```json
  {
    "nome": "Cliente API",
    "codigo": "12333",
    "cpf_cnpj": "33333",
    "endereco": "Avenida APIIII",
    "cep": "1222",
    "logradouro": "LOGRA API",
    "numero": "N/A",
    "bairro": "Bairro API",
    "cidade": "Cidade API",
    "uf": "API"
  }
  ```
- **Descrição:** Adiciona um novo cliente ao sistema.
- **Resposta de sucesso:**
  ```json
  {
    "success": true,
    "msg": "Cliente criado com sucesso."
  }
  ```
#### 4. Atualizar um cliente existente
- **Método:** `PUT`
- **Endpoint:** `/clients/:id`
- **Parametro:** `id` - O ID do cliente a ser atualizado.
- **Corpo da requisição:**
  ```json
  {
    "nome": "Cliente Atualizado",
    "codigo": "67890",
    "cpf_cnpj": "22222222222",
    "endereco": "Avenida Alterada"
  }
  ```
- **Descrição:** Atualiza as informações de um cliente específico.
- **Resposta de sucesso:**
  ```json
  {
    "success": true,
    "msg": "Cliente atualizado com sucesso."
  }
  ```
#### 5. Deletar um cliente
- **Método:** `DELETE`
- **Endpoint:** `/clients/:id`
- **Parametro:** `id` - O ID do cliente a ser deletado
- **Descrição:** Remove um cliente do sistema.
- **Resposta de sucesso:**
  ```json
  {
    "success": true,
    "msg": "Cliente deletado com sucesso"
  }
  ```
#### 6. Buscar informações de endereço por CEP
- **Método:** `GET`
- **Endpoint:** `/clients/cep/:cep`
- **Parametro:** `cep` - O CEP para buscar as informações do endereço.
- **Descrição:** Busca e retorna as informações de endereço com base no CEP fornecido.
- **Resposta de sucesso:**
  ```json
  {
    "cep": "12345-678",
    "logradouro": "Rua Exemplo",
    "bairro": "Bairro Exemplo",
    "localidade": "Cidade Exemplo",
    "estado": "SP"
  }
  ```
Esses são os principais endpoints disponíveis na API. Certifique-se de fornecer os dados corretos no corpo das requisições POST e PUT, e de usar os parâmetros adequados nas requisições GET e DELETE.