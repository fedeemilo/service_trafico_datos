const express = require('express')
const router = express.Router()
const getData = require('../db/getData')
const _ = require('underscore')

let cacheData = {}

// Mostrar todos los datos
router.get('/', async (req, res) => {
	let data = {}

	// Si el cache esta vacío obtengo la data del servidor
	if (_.isEmpty(cacheData)) {
		data = await getData()
		Object.assign(cacheData, JSON.parse(data[1].get('fullData')))
		res.json(data[0])
		return
	}

	res.json(cacheData)
})

// Filtrar un resultado por nombre
router.get('/:categoria', async (req, res) => {
	let name = req.params.categoria.toUpperCase()
	let data = {}
	let idx
	let filteredData = {}

	console.log(_.isEmpty(cacheData))

	if (_.isEmpty(cacheData)) {
		data = await getData()
		Object.assign(cacheData, JSON.parse(data[1].get('fullData')))
		data = data[0]
	} else {
		Object.assign(data, cacheData)
	}

	for (let prop in data) {
		if (prop === 'metaData') {
			data[prop].forEach((obj, i) => {
				if (obj.name === name) {
					filteredData = obj
					idx = i
				}
			})
		} else {
			data[prop].forEach(arr => {
				let d = new Date(arr[0])
				let date = `${d.getDay()}/${d.getMonth()}/${d.getFullYear()}`
				filteredData[`${date}`] = arr[idx]
			})
		}
	}
	res.json(filteredData)
})

module.exports = router
