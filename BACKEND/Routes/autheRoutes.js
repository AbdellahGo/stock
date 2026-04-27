import { Router } from "express";
import { createUser, logInUser } from "../Controllers/autheController.js";


const router = Router()


router.post('/register', createUser)
router.post('/login', logInUser)

export default router