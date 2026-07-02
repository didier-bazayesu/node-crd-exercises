import { body } from "express-validator";

const createDataValidation = [
  body("id").notEmpty().isInt({min:1}).withMessage("ID must be a non-empty positive integer"),
  body("name").notEmpty({ checkNull: true , checkFalsy: true }).withMessage("Name is required").isLength({ min: 3 }).withMessage("Name must be at least 3 characters long"),
  body("email").notEmpty().isEmail().withMessage("Valid email is required"),
  body("address").notEmpty().withMessage("Address is required"),
]

export const updateDataValidation = [
  body("name").optional().notEmpty({ checkNull: true , checkFalsy: true }).withMessage("Name cannot be empty").isLength({ min: 3 }).withMessage("Name must be at least 3 characters long"),
  body("email").optional().notEmpty().isEmail().withMessage("Valid email is required"),
  body("address").optional().notEmpty().withMessage("Address cannot be empty"),
]

export default createDataValidation;