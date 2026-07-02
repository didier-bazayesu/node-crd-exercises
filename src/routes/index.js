import { Router } from "express";
import createDataValidation,{updateDataValidation} from '../validator/index.js'
import { createData, DeleteData, getAll, getById, updateData } from "../controller/index.js";
const router = Router();
router.get('/', getAll)
router.get('/:id', getById)
router.post('/', createDataValidation, createData)
router.patch('/:id',updateDataValidation, updateData)
router.delete('/:id', DeleteData)

export default router;
  
