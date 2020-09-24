const run = require('./select')
const cache = require('memory-cache')

const fetchData = async () => {

    let newCache = new cache.Cache()
    let data = await run()

    newCache.put('fullData', JSON.stringify(data))

    return [data, newCache]
}

module.exports = fetchData