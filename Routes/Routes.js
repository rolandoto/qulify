const {Router} = require('express')
const {check} = require('express-validator')
const { LoginUsuario, createRegister } = require('../Controller/ControllerUser')
const { ValidarCampos } = require('../middleweres/middleaweares')

const router = Router()

router.post('/login',

    [
        check('numbers','el numbers es obligatorio').isLength({min:9}),
        check('passwordone','el numbers es obligatorio').isLength({min:6}),
        ValidarCampos
    ],

LoginUsuario)

router.post('/register',
    [
        check('email','el email  es obligatorio').isEmail(),
        check('numbers','el numbers es obligatorio').isLength({min:9}),
        check('passwordone','el numbers es obligatorio').isLength({min:6}),
        check('passwordtwo','el numbers es obligatorio').isLength({min:6}),
        ValidarCampos
    ],
    createRegister
)
//+19107824959
module.exports={router}