import jwt from 'jsonwebtoken'
import { Response, Request } from "express"
import usuario  from "../models/usuario"


const criarToken = async(req: Request, res: Response, usuarios: usuario) => {

    try {
        
        // Criar token
        const token = jwt.sign({
            id: usuarios.id
        }, 
        'teste'
        )


        // Retornar token
        res.json({
            auth: true,
            token: token,
            usuarioid: usuarios.id
        })

    }catch (error) {
        console.log(error)
    }
}

export default criarToken