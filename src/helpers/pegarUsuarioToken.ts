import jwt  from 'jsonwebtoken'
import { Response, Request } from "express"
import  usuario  from "../models/usuario"

// Pegar usuário por token

const pegarUsuarioToken = async(res: Response,token:string) => {
    
    if(!token){
        res.json({message: "Acesso negado"})
    }


    const decoded:any  = jwt.verify(token, 'teste')
    const usuarioid = decoded.id


    const usuarioo = await usuario.findByPk(usuarioid)

    return usuarioo

}

export default  pegarUsuarioToken