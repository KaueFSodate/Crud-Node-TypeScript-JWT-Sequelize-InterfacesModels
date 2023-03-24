import pegarToken from './pegarToken'
import {RequestHandler, Request} from 'express'
import jwt from 'jsonwebtoken'

const secret = 'AX88GH9H38KG0B0304LG'

interface CustomRequest extends Request {
  usuario?: any

}

const verificarToken: RequestHandler = (req: CustomRequest, res, next) => {


    if(!req.headers.authorization){
        return res.json({message: "Acesso negado"})
    }

 
    const pegaToken = pegarToken(req)

    if(!pegaToken){
        res.json({message: "Acesso negado"})
    }

    try {
        const verified = jwt.verify(pegaToken, 'teste')

        req.usuario = verified
        
        next()

    } catch (error) {
        res.json({message: "Acesso negado", error})

    }

}

 
export default verificarToken