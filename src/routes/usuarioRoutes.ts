import express from 'express';
const router = express.Router()
import usuarioController from '../controller/usuarioController'

// Helpers
import autenticado from '../helpers/verificarToken'

router.get('/', usuarioController.listar)
router.get('/:id', usuarioController.listarId)
router.post('/', usuarioController.cadastrar)
router.post('/login', usuarioController.login)
router.put('/:id', autenticado, usuarioController.editar)
router.delete('/:id', autenticado, usuarioController.deletar)

export default router