const express = require('express')
const router = express.Router()
const controllers = require('../controllers/controllers')

router.get('/products', controllers.getAllProducts)
router.get('/products/:id', controllers.getSingleProduct)
router.post('/products/post', controllers.addData)
router.delete('/products/:id', controllers.deleteData)
router.put('/products/:id', controllers.updateData)



module.exports = router 
