const express = require("express");
const {
  CreateApplication,
  FindById,
  UpdateApplication,
  DeleteApplications,
  GetAllApplication,
  FiltroDinamico,
} = require("../controllers/applicationController");
const authMiddleware = require("../middlewares/authMiddlewares");

const router = express.Router();

router.use(authMiddleware);
router.get("/filters", FiltroDinamico);
router.get("/", GetAllApplication);
router.post("/", CreateApplication);
router.get("/:id", FindById);
router.put("/:id", UpdateApplication);
router.delete("/:id", DeleteApplications);

module.exports = router;