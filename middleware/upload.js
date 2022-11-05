const multer = require('multer');
const moment = require('moment');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/') // with nodejs convenction we say that we don't have any errors
    },
    filename(req, file, cb) {
        const date = moment().format('DDMMYYYY-HHmmss_SSS');// our name is unique with that dates
        cb(null, `${date}-${file.originalname}`)
    }
});

const fileFilter = (req, file, cb) => {
    const imageFormats = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];

    if (imageFormats.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
};

const limits = {
    fileSize: 1014 * 1024 * 5
}

module.exports = multer({
    storage,
    fileFilter,
    limits,
})