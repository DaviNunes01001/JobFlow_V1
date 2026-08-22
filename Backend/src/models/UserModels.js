const pool = require("../config/database"); // chama as configurações do database para fazer as consultas e query

// function for create User
const user = {
  async createUser(name, email, HashPassoword) {
    const result = await pool.query(                    //chama o resultado a query usando await para esperar a resposta do banco e pool.query para fazer o comando sql
      `INSERT INTO Users (NAME_USER, PASSOWORD_HASH, CREATE_AT, UPDATE_T)
            VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
            RETURNING 
                ID_USER,
                NAME_USER,
                EMAIL
                PASSOWORD_HASH,
                CREATE_AT,
                 UPDATE_T`,
      [name, email, HashPassoword], //chama o que foi ser mudado
    );

    return result.rows[0];
  },
  // function for Find User by Id
  async FindById(id) {
    const result = await pool.query(
      `SELECT
        ID_USER,
        NAME_USER,
        EMAIL,
        PASSOWORD_HASH,
        CREATE_AT,
        UPDATE_T FROM Users WHERE ID_USER = $1 `,
      [id],
    );
    return result.rows[0];
  },

  // function for Find User by email
  async FindByEmail(email) {
    const result = await pool.query(
      `SELECT
        ID_USER,
        NAME_USER,
        EMAIL,
        PASSOWORD_HASH,
        CREATE_AT,
        UPDATE_T FROM Users WHERE EMAIL = $1 `,
      [email],
    );
    return result.rows[0];
  },

    // function for Find User All
  async FindByAll() {
    const result = await pool.query(
      `SELECT
        ID_USER,
        NAME_USER,
        EMAIL,
        PASSOWORD_HASH,
        CREATE_AT,
        UPDATE_T FROM Users ORDER BY ID_USER `,
      [email],
    );
    return result.rows;
  },
  // function for Update User by Id, name email
  async UptadeUser(id, name, email) {
    const result = await pool.query(
      `UPDATE Users SET 
        NAME_USER = $1,
        EMAIL = $2
        UPDATED_T = CURRENT_TIMESTAMP
    WHERE ID_USER = $3
    RETURING
        ID_USER,
        NAME_USER,
        EMAIL,
        CREATE_AT,
        UPDATE_T`,
      [id, name, email],
    );
    return result.rows[0];
  },
    // function for delete User by Id
  async DeleteUser(id) {
    const result = await pool.query(
      `DELETE FROM Users
        WHERE ID_USER = $1
        RETURNING ID_USER`,
      [id],
    );
    return result.rows[0];
  },
};

module.exports = user;
