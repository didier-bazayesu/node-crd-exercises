import {
  deleteByIdService,
  createDataService,
  getAllService,
  getByIdService,
  updateDataService,
} from "../service/index.js";
import { validationResult } from "express-validator";

export async function getAll(__, res) {
  try {
    const data = await getAllService();
    return res.status(200).json(data);
  } catch (erro) {
    res.status(500).json({ message: erro.message });
  }
}

export async function getById(req, res) {
  try {
    const { id } = req.params;
    const data = await getByIdService(id);
    return res.status(200).json({ message: "data found", data });
  } catch (erro) {
    if (erro.message === "not data") {
      return res.status(404).json({ message: erro.message });
    }
    res.status(500).json({ message: erro.message });
  }
}

export async function createData(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        errros: errors.array(),
      });
    }
    const newData = await createDataService(req.body);
    return res.status(201).json({ message: "data created", data: newData });
  } catch (error) {
    if (error.message === "ID already exists") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
}

export async function updateData(req, res) {
  try {
    const { id } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
      });
    }
    const data = await updateDataService(id, req.body);
    return res.status(200).json({ message: "data updated", data });
  } catch (err) {
    if (err.message === "not data") {
      return res.status(404).json({ message: err.message });
    }
    if (err.message === "you are not allowed to update the id") {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: err.message });
  }
}

export async function DeleteData(req, res) {
  try {
    const { id } = req.params;
    const deletedData = await deleteByIdService(id);
    if (!deletedData)
      return res.status(404).json({ message: "Data not found" });
    return res.status(200).json({ message: "data deleted", deletedData });
  } catch (erro) {
    res.status(500).json({ message: erro.message });
  }
}
