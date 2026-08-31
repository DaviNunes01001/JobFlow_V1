// ============================================================
// IMPORTAÇÕES
// ============================================================

// Importa o pool de conexão com o banco de dados PostgreSQL
const pool = require("../config/database");

// ============================================================
// CREATE — CRIAR UMA NOVA CANDIDATURA
// ============================================================

async function create(application) {
  // Desestrutura os dados recebidos da aplicação
  const {
    idUser,
    company,
    sector,
    companyLinkedin,
    city,
    platform,
    jobTitle,
    level,
    workModel,
    applicationDate,
    status,
    recruiter,
    contact,
    salary,
    jobUrl,
    notes,
  } = application;

  // Executa o INSERT no banco de dados
  const result = await pool.query(
    `
      INSERT INTO Applications (
        ID_USER_FK,
        COMPANY,
        SECTOR,
        COMPANY_LINKEDIN,
        CITY,
        PLATFORM,
        JOB_TITLE,
        LEVEL,
        WORK_MODEL,
        APPLICATION_DATE,
        STATUS,
        RECRUITER,
        CONTACT,
        SALARY,
        JOB_URL,
        NOTES
      )

      VALUES (
        $1, $2, $3, $4, $5, $6,
        $7, $8, $9, $10, $11, $12,
        $13, $14, $15, $16
      )

      RETURNING *
    `,

    // Valores que substituem os parâmetros $1, $2, $3...
    [
      idUser,
      company,
      sector,
      companyLinkedin,
      city,
      platform,
      jobTitle,
      level,
      workModel,
      applicationDate,
      status,
      recruiter,
      contact,
      salary,
      jobUrl,
      notes,
    ],
  );

  // Retorna a candidatura que acabou de ser criada
  return result.rows[0];
}

// ============================================================
// FIND BY ID — BUSCAR UMA CANDIDATURA PELO ID
// ============================================================

async function FindById(id) {
  // Busca uma candidatura específica através do ID
  const result = await pool.query(
    `
      SELECT *
      FROM Applications
      WHERE ID_APP = $1
    `,
    [id],
  );

  // Retorna a candidatura encontrada
  return result.rows[0];
}

// ============================================================
// UPDATE — ATUALIZAR UMA CANDIDATURA
// ============================================================

async function update(id, application) {
  // Desestrutura os dados que serão atualizados
  const {
    company,
    sector,
    companyLinkedin,
    city,
    platform,
    jobTitle,
    level,
    workModel,
    applicationDate,
    status,
    recruiter,
    contact,
    salary,
    jobUrl,
    notes,
  } = application;

  // Atualiza os dados da candidatura no banco
  const result = await pool.query(
    `
      UPDATE Applications

      SET
        COMPANY = $1,
        SECTOR = $2,
        COMPANY_LINKEDIN = $3,
        CITY = $4,
        PLATFORM = $5,
        JOB_TITLE = $6,
        LEVEL = $7,
        WORK_MODEL = $8,
        APPLICATION_DATE = $9,
        STATUS = $10,
        RECRUITER = $11,
        CONTACT = $12,
        SALARY = $13,
        JOB_URL = $14,
        NOTES = $15,

        -- Atualiza automaticamente a data da última alteração
        UPDATED_AT = CURRENT_TIMESTAMP

      -- Define qual candidatura será atualizada
      WHERE ID_APP = $16

      -- Retorna os dados atualizados
      RETURNING *
    `,

    // Valores dos parâmetros $1 até $16
    [
      company,
      sector,
      companyLinkedin,
      city,
      platform,
      jobTitle,
      level,
      workModel,
      applicationDate,
      status,
      recruiter,
      contact,
      salary,
      jobUrl,
      notes,
      id,
    ],
  );

  // Retorna a candidatura atualizada
  return result.rows[0];
}

// ============================================================
// DELETE — EXCLUIR UMA CANDIDATURA
// ============================================================

async function DeleteApplications(id) {
  // Remove a candidatura cujo ID foi informado
  const result = await pool.query(
    `
      DELETE FROM Applications
      WHERE ID_APP = $1

      -- Retorna o ID do registro que foi excluído
      RETURNING ID_APP
    `,
    [id],
  );

  // Retorna o registro excluído
  return result.rows[0];
}

// ============================================================
// GET ALL APPLICATIONS — BUSCAR TODAS AS CANDIDATURAS
// ============================================================

async function GetAllplicationsALL() {
  // Busca todos os registros através da ViewGetAll
  const result = await pool.query(
    `
      SELECT *
      FROM ViewGetAll
    `,
  );

  // Retorna todas as candidaturas
  return result.rows;
}

//

async function QueryDinamicaFindFilters(filters) {
  let query = `
  SELECT * 
  FROM Applications 
  WHERE 1 = 1 `;

  // Cria um Array que acumula paramentros de pesquisa
  const values = [];

  //Cria a query dinamica que monta o filtro apartir do paramentro
  if (filters.status) {
    values.push(filters.status);
    query += ` AND STATUS =$${values.length}`;
  }

  if (filters.level) {
    values.push(filters.level);
    query += ` AND LEVEL =$${values.length}`;
  }

  if (filters.workModel) {
    values.push(filters.workModel);
    query += ` AND WORK_MODEL =$${values.length}`;
  }

  if (filters.company) {
    values.push(filters.company);
    query += ` AND COMPANY =$${values.length}`;
  }

  if (filters.sector) {
    values.push(filters.sector);
    query += ` AND SECTOR =$${values.length}`;
  }

  if (filters.city) {
    values.push(filters.city);
    query += ` AND CITY =$${values.length}`;
  }
  
  if (filters.plataform) {
    values.push(filters.plataform);
    query += ` AND PLATAFORM =$${values.length}`;
  }

  if (filters.Minsalary) {
    values.push(filters.Minsalary);
    query += ` AND SALARY >=$${values.length}`;
  }

  if (filters.Maxsalary) {
    values.push(filters.Maxsalary);
    query += ` AND SALARY <=$${values.length}`;
  }
    query += ` ORDER BY APPLICATION_DATE DESC`;
  
    const result = await pool.query(query,values)

    return result.rows
}

// ============================================================
// EXPORTAÇÕES
// ============================================================

// Disponibiliza as funções para serem utilizadas
// pelos Controllers e outras partes do Backend
module.exports = {
  create,
  FindById,
  update,
  DeleteApplications,
  GetAllplicationsALL,
  QueryDinamicaFindFilters
};
