const applicationModel = require("../models/applicationModel");

// ============================================================
// CREATE — CRIAR CANDIDATURA
// ============================================================

async function create(req, res) {
  try {
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
    } = req.body;

    // Campos obrigatórios
    if (!idUser || !company || !jobTitle || !applicationDate || !status) {
      return res.status(400).json({
        mensagem:
          "Campos obrigatórios: idUser, company, jobTitle, applicationDate e status",
      });
    }

    const application = await applicationModel.create({
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
    });

    return res.status(201).json(application);
  } catch (erro) {
    console.error(erro);

    return res.status(500).json({
      mensagem: "Erro ao criar candidatura",
      erro: erro.message,
    });
  }
}

// ============================================================
// FIND BY ID — BUSCAR POR ID
// ============================================================

async function findById(req, res) {
  try {
    const { id } = req.params;

    const application = await applicationModel.FindById(id);

    if (!application) {
      return res.status(404).json({
        mensagem: "Candidatura não encontrada",
      });
    }

    return res.status(200).json(application);
  } catch (erro) {
    console.error(erro);

    return res.status(500).json({
      mensagem: "Erro ao buscar candidatura",
      erro: erro.message,
    });
  }
}

// ============================================================
// UPDATE — ATUALIZAR CANDIDATURA
// ============================================================

async function update(req, res) {
  try {
    const { id } = req.params;

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
    } = req.body;

    if (!company || !jobTitle || !applicationDate || !status) {
      return res.status(400).json({
        mensagem:
          "Campos obrigatórios: company, jobTitle, applicationDate e status",
      });
    }

    const application = await applicationModel.update(id, {
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
    });

    if (!application) {
      return res.status(404).json({
        mensagem: "Candidatura não encontrada",
      });
    }

    return res.status(200).json(application);
  } catch (erro) {
    console.error(erro);

    return res.status(500).json({
      mensagem: "Erro ao atualizar candidatura",
      erro: erro.message,
    });
  }
}

// ============================================================
// DELETE — EXCLUIR CANDIDATURA
// ============================================================

async function remove(req, res) {
  try {
    const { id } = req.params;

    const application = await applicationModel.DeleteApplications(id);

    if (!application) {
      return res.status(404).json({
        mensagem: "Candidatura não encontrada",
      });
    }

    return res.status(200).json({
      mensagem: "Candidatura excluída com sucesso",
      id: application.id_app,
    });
  } catch (erro) {
    console.error(erro);

    return res.status(500).json({
      mensagem: "Erro ao excluir candidatura",
      erro: erro.message,
    });
  }
}

// ============================================================
// GET ALL — BUSCAR TODAS
// ============================================================

async function getAll(req, res) {
  try {
    const applications = await applicationModel.GetAllplicationsALL();

    return res.status(200).json(applications);
  } catch (erro) {
    console.error(erro);

    return res.status(500).json({
      mensagem: "Erro ao buscar candidaturas",
      erro: erro.message,
    });
  }
}

// ============================================================
// FILTERS — BUSCAR COM FILTROS
// ============================================================

async function findFilters(req, res) {
  try {
    const filters = req.query;

    const applications =
      await applicationModel.QueryDinamicaFindFilters(filters);

    return res.status(200).json(applications);
  } catch (erro) {
    console.error(erro);

    return res.status(500).json({
      mensagem: "Erro ao buscar candidaturas com filtros",
      erro: erro.message,
    });
  }
}

// ============================================================
// EXPORTAÇÕES
// ============================================================

module.exports = {
  create,
  findById,
  update,
  remove,
  getAll,
  findFilters,
};