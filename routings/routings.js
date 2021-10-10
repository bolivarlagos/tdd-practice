const express = require('express')
const router = express.Router()
const controllers = require('../controllers/controllers')

router.get('/products', controllers.getAllProducts)
router.get('/products/:id', controllers.getSingleProduct)


module.exports = router 
