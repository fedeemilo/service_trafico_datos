const express = require('express')
const router = express.Router()
const getData = require('../db/getData')
const cache = require('memory-cache')

// Mostrar todos los datos
router.get('/', async (req, res) => {
	let data = await getData()

	res.json(data)
})

// Filtrar un resultado por nombre
router.get('/:filtro', async (req, res) => {
	let name = req.params.filtro.toUpperCase()
	let data = await run()
	let idx
	let filteredData = {}
	console.log(data)

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
				let date = `${arr[0].getDay()}/${arr[0].getMonth()}/${arr[0].getYear()}`
				filteredData[`${date}`] = arr[idx]
			})
		}
	}
	res.json(filteredData)
})

module.exports = router
