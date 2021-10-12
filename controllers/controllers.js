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

module.exports.addData = (req, res) => {
    const newData = req.body    

    const keys = Object.keys(newData)

    if(!(keys.includes("id") && keys.includes("description") && keys.includes("price"))){
        res.status(404).json({ message: "Must have id, price and description" })
    }  

    const newList = [...products, newData]    
    res.status(201).json(newList)
}

module.exports.deleteData = (req, res) => {
    const { id } = req.params
    const wasFound = products.find(item => item.id == id)

    if(!wasFound){
        res.status(404).send({ message: 'Invalid ID'})
    }

    const listProds = products.filter(item => item.id != id)

    res.status(201).json(listProds)   
}