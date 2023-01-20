import { Router } from 'express'
import { signUp, signIn } from '../controller/auth.js'

const authRouter = Router()

authRouter.post("/", signIn)
authRouter.post("/cadastro", signUp)

export default authRouter