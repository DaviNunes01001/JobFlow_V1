require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER, // Lê DB_USER do .env
  host: process.env.DB_HOST, // Lê DB_HOST do .env
  database: process.env.DB_NAME, // Lê DB_NAME do .env
  password: process.env.DB_PASSWORD, // Lê DB_PASSWORD do .env
  port: parseInt(process.env.DB_PORT), // Lê DB_PORT e converte para número
});

pool.connect((error, client, realese) => {
  if (error) {
    console.log("Erro ao conectar ao PG", error.message);
    console.log(
      "Verifique as credenciais no aquivo .env, Processos abertos ou configurações remanecentes",
    );
  } else {
    console.log("===========================");
    console.log("Conectado com Sucesso ao PG");
    console.log("===========================");
    console.log(`Banco ${process.env.DB_NAME}`);
    console.log(`Host ${process.env.DB_HOST}`);
    console.log(`PORT ${process.env.DB_PORT}`);
    realese();
  }
});

module.exports = pool