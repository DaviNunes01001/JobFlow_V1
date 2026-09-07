const express = require("express");
const {
  FindUserById,
  GetAllUsers,
  UpdateUser,
  DeleteUser,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddlewares");

const router = express.Router();

router.use(authMiddleware);
router.get("/", GetAllUsers);
router.get("/:id", FindUserById);
router.put("/:id", UpdateUser);
router.delete("/:id", DeleteUser);

module.exports = router;