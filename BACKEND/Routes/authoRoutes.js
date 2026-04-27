import { Router } from "express";
import { checkAutho } from "../Controllers/authoController.js";


const router = Router()


router.get('/user', checkAutho)

export default router