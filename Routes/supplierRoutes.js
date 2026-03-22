import { Router } from "express";
import getAllSuppliers from "../Controllers/supplierController.js";

const router = Router();

router.get('/', getAllSuppliers);

export default router;