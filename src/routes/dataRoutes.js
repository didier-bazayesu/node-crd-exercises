import { Router } from "express";
import { createData, DeleteData, getAll, getById, updateData } from "../controller/dataController.js";
const router = Router();
router.get('/', getAll)
router.get('/:id', getById)
router.post('/', createData)
router.patch('/:id', updateData)
router.delete('/:id', DeleteData)
export default router;
  
