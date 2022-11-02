module.exports = (res, err) => {
    res.status(500).json({
        succsess: false,
        message: err.message ? err.message : err,
    });
}