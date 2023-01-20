import bcrypt from 'bcrypt'
import { v4 as uuidV4 } from 'uuid'
import db from "../config/database.js"
import { signUpSchema } from '../schema/signUpSchema.js'
import { signInSchema } from '../schema/signInSchema.js'

// users = db.collection("users")
// sessions = db.collection("sessions")


export async function signUp(req, res) {

    const { name, email, password, confirmPassword } = req.body

    const { error } = signUpSchema.validate({ name, email, password, confirmPassword }, { abortEarly: false })

    if (error) {
        const errorMessages = error.details.map(err => err.message)
        return res.status(422).send(errorMessages)
    }

    const passwordHashed = bcrypt.hashSync(user.password, 10)


    try {

        const isInclude = await db.collection("users").findOne({ email: user.email })

        if (isInclude) return res.send("Esse e-mail já está cadastrado.")

        await db.collection("users").insertOne({ name, email, password: passwordHashed })

        res.status(201).send("Usuário cadastrado com sucesso!")


    } catch (err) {
        res.status(500).send(err.message)

    }


}

export async function signIn(req, res) {

    const { email, password } = req.body

    const { error } = signInSchema.validate({ email, password }, { abortEarly: false })

    if (error) {
        const errorMessages = error.details.map(err => err.message)
        return res.status(422).send(errorMessages)
    }

    try {

        const checkUser = await db.collection("users").findOne({email})

        if (!checkUser) return res.status(400).send("Usuário ou senha incorretos")

        const isCorrectPassword = bcrypt.compareSync(password, checkUser.password)

        if(!isCorrectPassword) return req.status(400).send("Usuário ou senha incorretos")

        const token = uuidV4()

        await db.collection("sessions").insertOne({idUser:checkUser._id,token})

        return res.status(200).send(token)


    } catch (err) {

        res.status(500).send(err.message)
        
    }

}