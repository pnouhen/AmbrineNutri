const express = require("express")
const router = express.Router()
const userCtrl = require("../controllers/user")
const auth = require('../middleware/auth');

router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)
router.get('/me', auth, userCtrl.getMe);

router.post('/me/panier', auth, userCtrl.addToPanier)
router.delete('/me/panier/:recipeId', auth, userCtrl.removeToPanier)

router.post('/me/address', auth, userCtrl.addToAddress)
router.put('/me/address', auth, userCtrl.updateAddressById)
router.delete('/me/address/:addressId', auth, userCtrl.removeToAddress)

module.exports = router