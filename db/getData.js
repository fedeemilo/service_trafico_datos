const run = require('./select')
const cache = require('memory-cache')

const fetchData = async (celPhone) => {

    let newCache = new cache.Cache()
    let data = await run(celPhone)

    newCache.put('fullData', JSON.stringify(data))
    return [data, newCache]
}

module.exports = fetchData