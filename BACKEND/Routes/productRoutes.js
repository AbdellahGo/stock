import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, updateProduct } from "../Controllers/productController.js";
import productDataValidator from "../middleware/dataValidation.js";


const router = Router()


router.get('/', getAllProducts)
router.post('/', productDataValidator, createProduct)
router.put('/:id', productDataValidator, updateProduct)
router.delete('/:id', deleteProduct)

export default router