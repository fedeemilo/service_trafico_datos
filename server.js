require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000
const bodyParser = require('body-parser')

const run = require('./db/select')

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Parse application/json
app.use(bodyParser.json())

app.get('/', async (req, res) => {
	let data = await run()
    console.log(data)
    console.log(typeof data)
	res.json(data)
})

app.listen(PORT, () => {
	console.log(`Escuchando el puerto ${PORT}`)
})
