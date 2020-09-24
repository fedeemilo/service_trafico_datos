const run = require('./select')

const fetchData = async () => {
    let data = await run()
    return data
}

module.exports = fetchData