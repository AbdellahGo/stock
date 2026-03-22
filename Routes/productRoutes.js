import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, updateProduct } from "../Controllers/productController.js";


const router = Router()


router.get('/', getAllProducts)
router.post('/', createProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)

export default router