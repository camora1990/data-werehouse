

module.exports = {
    ...require('./validate-fields'),
    ...require('./validate-JWT'),
    ...require('./validate-role')
}