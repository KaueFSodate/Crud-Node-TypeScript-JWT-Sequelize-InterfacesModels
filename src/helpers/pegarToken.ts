import { Request } from "express";

const pegarToken = (req: Request):string => {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];

    return token!
}

export default pegarToken