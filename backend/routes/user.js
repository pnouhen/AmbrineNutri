const express = require("express")
const router = express.Router()
const userCtrl = require("../controllers/user")
const auth = require('../middleware/auth');

router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)
router.get('/me', auth, userCtrl.getMe);
router.post('/me', auth, userCtrl.addToPanier)
router.delete('/me/panier/:recipeId', auth, userCtrl.removeToPanier)

module.exports = router