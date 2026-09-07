const { verifyToken } = require("../utils/JWT");

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  const [scheme, token] = authHeader ? authHeader.split(" ") : [];

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ message: "Token não informado" });
  }

  try {
    req.user = verifyToken(token);
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido ou expirado" });
  }
}

module.exports = authMiddleware;