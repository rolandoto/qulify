const {Router} = require('express')
const {check} = require('express-validator')
const { LoginUsuario, Peticion } = require('../Controller/ControllerUser')
const { ValidarCampos } = require('../middleweres/middleaweares')

const router = Router()

router.post('/login',

    [
        check('username','el username es obligatorio').not().isEmpty(),
        check('password','el password es obligatorio').isLength({min:6}),
        ValidarCampos
    ],
    LoginUsuario
)

router.post('/Peticion',
    [
        check('numbers','el numbers es obligatorio').isLength({min:6}),
    ],
    Peticion
)
//+19107824959
module.exports={router}