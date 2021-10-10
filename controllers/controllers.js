const { products } = require('../utils/utils')

module.exports.getAllProducts = (req, res) => {
    res.status(201).json(products)
}

module.exports.getSingleProduct = (req, res) => {
    const { id } = req.params    
    const prod = products.filter(item => item.id == id)
    
    if(prod.length === 0){
        res.status(404).json({ message: 'Unknow ID' })
    }
    res.status(201).json(prod[0])    
}