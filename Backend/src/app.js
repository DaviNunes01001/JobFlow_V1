require("dotenv").config();

const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

//app.use(express.static(path.join(__dirname, "src", "public")));
//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

//const clienteRoutes = require("./src/routes/clienteRoutes");
//app.use("/clientes", clienteRoutes);

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
