const ApplicationsModels = require("../models/ApplicationModels");

const CreateApplication = async (req, res) => {
  try {
    const application = { ...req.body, idUser: req.user.id };

    const newApplication = await ApplicationsModels.create(application);
    return res.status(201).json(newApplication);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao criar aplicação",
      error: error.message,
    });
  }
};

const FindById = async (req, res) => {
  try {
    const application = await ApplicationsModels.FindById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: "Aplicação não encontrada" });
    }
    return res.status(200).json(application);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao buscar aplicação",
      error: error.message,
    });
  }
};

const UpdateApplication = async (req, res) => {
  try {
    const application = await ApplicationsModels.update(req.params.id, req.body);
    if (!application) {
      return res.status(404).json({ message: "Aplicação não encontrada" });
    }
    return res.status(200).json(application);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao atualizar aplicação",
      error: error.message,
    });
  }
};

const DeleteApplications = async (req, res) => {
  try {
    const application = await ApplicationsModels.DeleteApplications(req.params.id);
    if (!application) {
      return res.status(404).json({ message: "Aplicação não encontrada" });
    }
    return res.status(200).json({
      message: "Aplicação excluída com sucesso",
      id: application.id_app,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao excluir aplicação",
      error: error.message,
    });
  }
};

const GetAllApplication = async (req, res) => {
  try {
    return res.status(200).json(await ApplicationsModels.GetAllplicationsALL());
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao buscar aplicações",
      error: error.message,
    });
  }
};

const FiltroDinamico = async (req, res) => {
  try {
    return res.status(200).json(
      await ApplicationsModels.QueryDinamicaFindFilters(req.query),
    );
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao filtrar aplicações",
      error: error.message,
    });
  }
};

module.exports = {
  CreateApplication,
  FindById,
  UpdateApplication,
  DeleteApplications,
  GetAllApplication,
  FiltroDinamico,
};