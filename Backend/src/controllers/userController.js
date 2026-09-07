const UserModels = require("../models/UserModels");
const { registerUser, loginUser } = require("../services/authServices");

// ============================================================
// CREATE USER — CRIAR USUÁRIO
// ============================================================
const CreateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await registerUser(name, email, password);

    return res.status(201).json(user);
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: "Erro ao criar usuário",
      error: error.message,
    });
  }
};

// ============================================================
// LOGIN — AUTENTICAR USUÁRIO
// ============================================================
const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { token, user } = await loginUser(email, password);

    return res.status(200).json({
      message: "Login realizado com sucesso",
      token,
      user,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: "Erro ao realizar login",
      error: error.message,
    });
  }
};

// ============================================================
// FIND BY ID — BUSCAR USUÁRIO PELO ID
// ============================================================
const FindUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user =
      await UserModels.FindById(id);

    if (!user) {
      return res.status(404).json({
        message: "Usuário não encontrado",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao buscar usuário",
      error: error.message,
    });
  }
};

// ============================================================
// GET ALL USERS — BUSCAR TODOS OS USUÁRIOS
// ============================================================
const GetAllUsers = async (req, res) => {
  try {
    const users =
      await UserModels.FindByAll();

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao buscar usuários",
      error: error.message,
    });
  }
};

// ============================================================
// UPDATE USER — ATUALIZAR USUÁRIO
// ============================================================
const UpdateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const updatedUser =
      await UserModels.UptadeUser(
        id,
        name,
        email
      );

    if (!updatedUser) {
      return res.status(404).json({
        message: "Usuário não encontrado",
      });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao atualizar usuário",
      error: error.message,
    });
  }
};

// ============================================================
// DELETE USER — EXCLUIR USUÁRIO
// ============================================================
const DeleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser =
      await UserModels.DeleteUser(id);

    if (!deletedUser) {
      return res.status(404).json({
        message: "Usuário não encontrado",
      });
    }

    return res.status(200).json({
      message: "Usuário excluído com sucesso",
      id: deletedUser.ID_USER,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao excluir usuário",
      error: error.message,
    });
  }
};

// ============================================================
// EXPORTAÇÕES
// ============================================================
module.exports = {
  CreateUser,
  LoginUser,
  FindUserById,
  GetAllUsers,
  UpdateUser,
  DeleteUser,
};