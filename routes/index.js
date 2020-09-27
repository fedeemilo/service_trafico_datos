const express = require('express')
const router = express.Router()
const {
	getAllData,
	getDataByCategory,
	getDataByCelPhone
} = require('../controllers')

let cacheData = {}

// Mostrar todos los datos                                 - GET /
router.get('/', getAllData)

// Filtrar un resultado por nombre                         - GET /:categoria
router.get('/:categoria', getDataByCategory)

// Mostrar datos ingresando un num. de celular             - GET /:numero_cel
router.get('/:numero_cel', getDataByCelPhone)

module.exports = router
