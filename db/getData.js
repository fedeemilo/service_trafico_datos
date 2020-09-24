const run = require('./select')
const cache = require('memory-cache')

const fetchData = async () => {
    let data = await run()
    return data
}

module.exports = fetchData