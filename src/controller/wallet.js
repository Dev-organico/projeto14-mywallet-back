
import db from '../config/database.js'
import dayjs from "dayjs"

export async function addFinacialRecord(req, res) {

    const record = req.body
    const checkSession = res.locals.session


    try {

        const obj = {
        value: record.value,
        description: record.description,
        date: dayjs().format("DD/MM"),
        type: record.type,
        idUser: checkSession.idUser
        }

        const recordObj = await db.collection("records").insertOne(obj)

        console.log(obj)
        
        res.status(201).send("registro adicionado!")



    } catch (err) {
        res.status(500).send(err.message)
    }

}


export async function finacialRecord(req, res) {

    const checkSession = res.locals.session

    try {
        const records = await db.collection("records").find({idUser:checkSession.idUser}).toArray()
    
        console.log(records)
    
        res.send(records)

      } catch (error) {
        res.status(500).send("erro no servidor")
      }
}
