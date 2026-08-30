const pool = require("../config/database");
const { FindById } = require("./UserModels");

const application = {
  async create(application) {
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
    const result = await pool.query(
      `INSERT INTO Applications (
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
            RETURNING *`,
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
    return result.rows[0];
  },

  async FindById(id) {
    const result = await pool.query(
      `SELECT FROM Applications WHERE ID_APP = $1`[id],
    );
    return result.rows[0];
  },
  async FindByUserId(idUser) {
    const result = await pool.query(
      `SELECT FROM Applications WHERE ID_USER_FK = $1
        ORDER BY APPLICATION_DATE DESC`[idUser],
    );
    return result.rows[0];
  },

  async update(id, application) {
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

    const result = await pool.query(
      `UPDATE Applications
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
                UPDATED_AT = CURRENT_TIMESTAMP
             WHERE ID_APP = $16
             RETURNING *`,
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

    return result.rows[0];
  },

  async DeleteApplications(id) {
    const result = await pool.query(
      `DELETE FROM Applications WHERE ID_APP = $1
        RETURNING ID_APP`[id],
    );
    return result.rows[0];
  },

  async GetAllplicationsALL() {
    const result = await pool.query(`SELECT * FROM ViewGetAll`);
    return result.rows[0];
  },

  async GetCompany() {
    const result = await pool.query(`SELECT company FROM Applications`);
    return result.rows[0];
  },

  async GetFiltrosOne() {
    const result = await pool.query(`
      SELECT * from ViewFiltroOne`)
  }
};

module.exports = application;
