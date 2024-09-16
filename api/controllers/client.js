import { db } from "../db.js";

// Retorna todos os clientes cadastrados no banco de dados
export const getClients = (_, res) => {
  const query = "SELECT * FROM clientes";

  db.query(query, (err, data) => {
    if (err) {
      // Tratamento específico para erro de conexão fatal com o banco de dados
      if (err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR") {
        return res
          .status(500)
          .json({ success: false, msg: "Conexão com banco de dados falhou" });
      }
      return res.json({ success: false, msg: err });
    }

    return res.status(200).json({ success: true, data });
  });
};

// Retorna um cliente específico pelo ID fornecido na URL
export const getClient = (req, res) => {
  const query = "SELECT * FROM clientes WHERE id = ?";

  db.query(query, [req.params.id], (err, data) => {
    if (err) {
      return res.json({ success: false, msg: err });
    }

    return res.status(200).json({ success: true, data: data[0] });
  });
};

// Função para adicionar um novo cliente no banco de dados
export const addClient = (req, res) => {
  const query =
    "INSERT INTO clientes(`codigo`, `nome`, `cpf_cnpj`, `cep`, `logradouro`, `endereco`, `numero`, `bairro`, `cidade`, `uf`, `complemento`, `fone`, `limite_credito`, `validade`) VALUES(?)";

  const values = [
    req.body.codigo,
    req.body.nome,
    req.body.cpf_cnpj,
    req.body.cep,
    req.body.logradouro,
    req.body.endereco,
    req.body.numero,
    req.body.bairro,
    req.body.cidade,
    req.body.uf,
    req.body.complemento,
    req.body.fone,
    req.body.limite_credito,
    req.body.validade,
  ];

  db.query(query, [values], err => {
    if (err)
      return res.json({
        success: false,
        msg: `Não foi possivel criar o cliente. Erro: ${err}`,
      });

    return res
      .status(200)
      .json({ success: true, msg: "Cliente criado com sucesso." });
  });
};

// Função para atualizar as informações de um cliente existente
export const updateClient = (req, res) => {
  const allowedFields = [
    "codigo",
    "nome",
    "cpf_cnpj",
    "cep",
    "logradouro",
    "endereco",
    "numero",
    "bairro",
    "cidade",
    "uf",
    "complemento",
    "fone",
    "limite_credito",
    "validade",
  ];

  // Filtra os campos que existem no req.body e estão permitidos para atualização
  const fields = Object.keys(req.body)
    .filter(field => allowedFields.includes(field)) // Garante que o campo está na lista de permitidos
    .map(field => `\`${field}\` = ?`);

  const values = Object.keys(req.body)
    .filter(field => allowedFields.includes(field)) // Garante que o campo está na lista de permitidos
    .map(field => req.body[field]);

  // Verifica se há campos para atualizar
  if (fields.length === 0) {
    return res
      .status(400)
      .json({ success: false, msg: "Nenhum campo para atualizar." });
  }

  // Adiciona o ID do cliente no final dos valores
  values.push(req.params.id);

  const query = `UPDATE clientes SET ${fields.join(", ")} WHERE \`id\` = ?`;

  db.query(query, values, err => {
    if (err) {
      return res.json({
        success: false,
        msg: `Não foi possível alterar o cliente. Erro: ${err}`,
      });
    }

    return res.status(200).json({
      success: true,
      msg: `Cliente #${req.params.id} atualizado com sucesso.`,
    });
  });
};

// Função para deletar um cliente existente do banco de dados
export const deleteClient = (req, res) => {
  const query = "DELETE FROM clientes WHERE `id` = ?";

  db.query(query, [req.params.id], err => {
    if (err)
      return res.json({
        success: false,
        msg: `Não foi possivel deletar o cliente. Erro: ${err}`,
      });

    return res
      .status(200)
      .json({ success: true, msg: "Cliente deletado com sucesso." });
  });
};

// Função para buscar um endereço com base no CEP utilizando a API ViaCEP
export const findCepClient = async (req, res) => {
  const { cep } = req.params;
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Erro ao buscar CEP" });
  }
};
