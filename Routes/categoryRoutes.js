import { Router } from "express";
import getAllCategories from "../Controllers/categoryController.js";

const router = Router()

router.get('/', getAllCategories)

export default router