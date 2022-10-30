module.exports.login = (req, res) => {
    res.status(200).json({
        login: {
            email: req.body.email,
            pass: req.body.pass,
        },
    })
}

module.exports.register = (req, res) => {
    res.status(200).json({
        message: 'register',
    })
}