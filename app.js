const express = require('express')
const cors = require('cors')
const routings = require('./routings/routings')

const app = express()

app.use(express.json())

app.use(cors())

app.use('/api', routings)

app.get('/', (req, res) => {
    res.json({ message: 'Home Page' })
})

module.exports = app
