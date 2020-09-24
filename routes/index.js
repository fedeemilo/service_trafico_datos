const express = require('express')
const router = express.Router()
const run = require('../db/select')
const mcache = require('memory-cache')

let cache = duration => {
	return (req, res, next) => {
		let key = '__express__' + req.originalUrl || req.url
		let cachedBody = mcache.get(key)

		if (cachedBody) {
			res.send(cachedBody)
			return
		} else {
			res.sendResponse = res.send
			res.send = body => {
				mcache.put(key, body, duration * 1000, function(key, value) {      
                    console.log(value)             
                    res.json(value)
                })
			}
			next()
		}
	}
}

// Mostrar todos los datos
router.get('/', cache(20), async (req, res) => {
    let data = await run()
    console.log(mcache)

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
