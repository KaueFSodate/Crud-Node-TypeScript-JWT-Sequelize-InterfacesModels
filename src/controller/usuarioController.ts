import { RequestHandler } from "express";
import usuario from '../models/usuario'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


// Helpers
import pegarToken from '../helpers/pegarToken'
import pegarUsuarioToken from "../helpers/pegarUsuarioToken";
import criarToken from "../helpers/criarToken";

export default class usuarioController {

    static listar:RequestHandler = async(req, res) => {

      let currentUser

      if(req.headers.authorization){

          const token = pegarToken(req)
          const decoded:any = jwt.verify(token, 'teste')

          currentUser = await usuario.findByPk(decoded.id)


      }else{
          currentUser = null
          return
      }

      res.json({message: currentUser})

    }

    static listarId:RequestHandler = async(req, res) => {
      const { id } = req.params;

      const usuarioo:  usuario | null = await  usuario.findByPk(id);
      return res
        .status(200)
        .json({ message: "Usuario listado por id com sucesso", data: usuarioo });
    };
    

    static cadastrar:RequestHandler = async(req, res) => {

        const { name, email, password } = req.body;

        // Validações
        const existeUsuario = await usuario.findOne({
            where: {
              email,
            },
          });

        if (existeUsuario) {
            return res.status(409).json({
              message: 'Email already exists',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        const user: usuario = await usuario.create({
            name,
            email,
            password: hashedPassword,
        });

        await criarToken(req, res, user)
    }

    static login:RequestHandler = async(req, res) => {
        const { email, password } = req.body;

        const user = await usuario.findOne({
          where: {
            email,
          },
        });
        
        if (!user) {
          return res.status(401).json({
            message: 'E-mail ou senha invalido',
          });
        }

        const senhaValida:boolean = await bcrypt.compare(password, user.password);
        
        if (!senhaValida) {
          return res.status(401).json({
            message: 'E-mail ou senha invalido',
          });
        }
        
        await criarToken(req, res, user)

    }

    static editar:RequestHandler = async(req, res) => {
      const {id}:any = req.params;
      
      // Checa se o usuário existe e pegar o usuario
      const token = pegarToken(req)
      const usuarioT = await pegarUsuarioToken(res,token)
      
      const {name, password} = req.body
      usuarioT!.id = id;

        // Validações 

        if(!name){
            res.json({message:"Insira um nome"})
            return
        }

        usuarioT!.name = name
        console.log(usuarioT!.name)

        if(!password){
            res.json({message:"Insira uma senha"})
            return
        }


        // Criar senha criptografada
        const salt = await bcrypt.genSalt(12)
        const senhaHash = await bcrypt.hash(password, salt)

        usuarioT!.password = senhaHash

        console.log(usuarioT!.dataValues)

        try {
            
          await usuario.update(usuarioT!.dataValues,{
            where:{
                id: req.params.id
            }
        });
        const updatedUsuarios: usuario | null = await usuario.findByPk(id);
        res.status(200).json({msg:  "Usuario alterado com sucesso", data: updatedUsuarios });
        } catch (error) {
            console.log(error);
        }

    }

    static deletar:RequestHandler = async(req, res) => {

        const { id } = req.params;
        await usuario.destroy({ where: { id } });
        return res
        .status(200)
        .json({ message: "Usuario deletado com sucesso" });

    }



}