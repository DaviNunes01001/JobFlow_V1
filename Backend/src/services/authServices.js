const bcrypt = require("bcrypt");
const UserModels = require("../models/UserModels");
const { generateToken } = require("../utils/JWT");

async function registerUser(name, email, password) {
  const existingUser = await UserModels.FindByEmail(email);

  if (existingUser) {
    const error = new Error("E-mail já cadastrado");
    error.statusCode = 409;
    throw error;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  return UserModels.createUser(name, email, passwordHash);
}

async function loginUser(email, password) {
  const user = await UserModels.FindByEmail(email);
  const passwordMatch = user
    ? await bcrypt.compare(password, user.PASSOWORD_HASH)
    : false;

  if (!passwordMatch) {
    const error = new Error("E-mail ou senha inválidos");
    error.statusCode = 401;
    throw error;
  }

  return {
    token: generateToken({ id: user.ID_USER }),
    user: {
      id: user.ID_USER,
      name: user.NAME_USER,
      email: user.EMAIL,
    },
  };
}

module.exports = {
  registerUser,
  loginUser,
};