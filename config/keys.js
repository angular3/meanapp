if (process.env.NODE_ENV === 'production') {
    module.exports = {
        mongoURI: process.env.MONGO_URI,
        jwtSecret: process.env.JWT,
    }
}else {
    module.exports = require('./keys.dev')
}
