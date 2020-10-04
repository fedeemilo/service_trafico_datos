const getData = require('../db/getData')
const _ = require('underscore')

let cacheData = {}

module.exports = {
	async getAllData(req, res, next) {
		let data = {}

		// Si el cache esta vacío obtengo la data del servidor
		if (_.isEmpty(cacheData)) {
			data = await getData('')
			Object.assign(cacheData, JSON.parse(data[1].get('fullData')))
			res.json(data[0])
			return
		}

		// Caso contrario devuelvo la data cacheada
		res.json(cacheData)
	},

	async getDataByCategory(req, res, next) {
		let name = req.params.categoria.toUpperCase()
		let data = {}
		let filteredData = {}
		let idx

		if (_.isEmpty(cacheData)) {
			data = await getData('')
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
	},

<<<<<<< HEAD
	async getDataByCelPhone(req, res, next) {},
=======
	async getDataByCelPhone(req, res, next) {
		let data = {}
		let celPhone = req.params.numerocel

		data = await getData(celPhone)
		Object.assign(cacheData, JSON.parse(data[1].get('fullData')))
		res.json(data[0])
	}
>>>>>>> c8e7cc1be7755acc858d09490d98d4f65933f27b
}
