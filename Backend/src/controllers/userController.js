const userModel = require("../models/userModel");

// ============================================================
// CREATE USER — CRIAR USUÁRIO
// ============================================================

async function createUser(req, res) {
  try {
    const {
      name,
      email,
      password,
    } = req.body;

    // Verifica campos obrigatórios
    if (!name || !email || !password) {
      return res.status(400).json({
        mensagem: "Campos obrigatórios: name, email e password",
      });
    }

    //fazer o hash da senha
    const HashPassoword = password;

    // Chama o Model
    const user = await userModel.createUser(
      name,
      email,
      HashPassoword
    );

    return res.status(201).json(user);

  } catch (erro) {
    console.error(erro);

    return res.status(500).json({
      mensagem: "Erro ao criar usuário",
      erro: erro.message,
    });
  }
}

// ============================================================
// FIND BY ID — BUSCAR USUÁRIO
// ============================================================

async function findById(req, res) {
  try {
    const { id } = req.params;

    const user = await userModel.FindById(id);

    // Usuário não encontrado
    if (!user) {
      return res.status(404).json({
        mensagem: "Usuário não encontrado",
      });
    }

    return res.status(200).json(user);

  } catch (erro) {
    console.error(erro);

    return res.status(500).json({
      mensagem: "Erro ao buscar usuário",
      erro: erro.message,
    });
  }
}

// ============================================================
// UPDATE USER — ATUALIZAR USUÁRIO
// ============================================================

async function updateUser(req, res) {
  try {
    const { id } = req.params;

    const {
      name,
      email,
    } = req.body;

    // Verifica campos obrigatórios
    if (!name || !email) {
      return res.status(400).json({
        mensagem: "Campos obrigatórios: name e email",
      });
    }

    // Chama o Model
    const user = await userModel.UptadeUser(
      id,
      name,
      email
    );

    // Usuário não encontrado
    if (!user) {
      return res.status(404).json({
        mensagem: "Usuário não encontrado",
      });
    }

    return res.status(200).json(user);

  } catch (erro) {
    console.error(erro);

    return res.status(500).json({
      mensagem: "Erro ao atualizar usuário",
      erro: erro.message,
    });
  }
}

// ============================================================
// DELETE USER — EXCLUIR USUÁRIO
// ============================================================

async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    // Chama o Model
    const user = await userModel.DeleteUser(id);

    // Usuário não encontrado
    if (!user) {
      return res.status(404).json({
        mensagem: "Usuário não encontrado",
      });
    }

    return res.status(200).json({
      mensagem: "Usuário excluído com sucesso",
      id: user.id_user,
    });

  } catch (erro) {
    console.error(erro);

    return res.status(500).json({
      mensagem: "Erro ao excluir usuário",
      erro: erro.message,
    });
  }
}

// ============================================================
// EXPORTAÇÕES
// ============================================================

module.exports = {
  createUser,
  findById,
  updateUser,
  deleteUser,
};