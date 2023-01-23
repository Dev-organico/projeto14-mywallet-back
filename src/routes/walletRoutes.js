import { Router } from 'express'
import { validateSchema } from "../middleware/validateSchema.js"
import { authValidation } from '../middleware/authValidation.js'
import { recordSchema } from '../schema/recordSchema.js'
import { addFinacialRecord, finacialRecord } from '../controller/wallet.js'

const walletRouter = Router()

walletRouter.use(authValidation)
walletRouter.get("/home",finacialRecord)
walletRouter.post("/nova-entrada",validateSchema(recordSchema),addFinacialRecord)
walletRouter.post("/nova-saida",validateSchema(recordSchema),addFinacialRecord)

export default walletRouter