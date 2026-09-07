require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });

const path = require("path");
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const applicationRoutes = require("./routes/applicattionRoutes");
const app = express();
const PORT = process.env.PORT || 3000;

//app.use(express.static(path.join(__dirname, "src", "public")));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/applications", applicationRoutes);

app.get("/", (req, res) => {
  res.json({
    mensagem: "API do JobFlow_V1 | Testes iniciais",
    versao: "1.0",
    ambiente: process.env.NODE_ENV || "development",
    banco: "PostgreSQL",
  });
});

app.listen(PORT, () => {
  console.log("=".repeat(50));
  console.log("Servidor rodando!");
  console.log(`URL: http://localhost:${PORT}`);
  console.log(`Banco: PostgreSQL (${process.env.DB_NAME})`);
  console.log(`Ambiente: ${process.env.NODE_ENV || "development"}`);
  console.log("=".repeat(50));
});
