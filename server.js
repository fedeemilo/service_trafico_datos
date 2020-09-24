// require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000
const bodyParser = require('body-parser')

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Parse application/json
app.use(bodyParser.json())

app.use(require('./routes/index'))

app.listen(PORT, () => {
	console.log(`Escuchando el puerto ${PORT}`)
})
