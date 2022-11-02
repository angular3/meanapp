const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const errorHandler = require('../utils/errorHandler');

module.exports.login = async (req, res) => {
    const candidate = await User.findOne({ email: req.body.email });
    if (!candidate) {
        res.status(404).json({
            message: 'User not found, please register!'
        })
    } else {
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if (passwordResult) {
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id, 
            }, keys.jwtSecret, {expiresIn: 60 * 60});
            res.status(200).json({
                token: `Bearer ${token}`, 
                message: 'You are logged in!'
            })
        } else {
            res.status(401).json({
                message: 'Password incorrect, try again!'
            })
        }
    }

}

module.exports.register = async (req, res) => {
    const candidate = await User.findOne({email: req.body.email}) // вся работа с базой данных это асинхронные операции - поэтому обязательно используем констркуцию acync await и тогда мы можем не ждать результат сами и не применять промисы
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password;
    if (candidate) {
        res.status(409).json({
            message: 'This user already exists, please log in'
        })
    } else {
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt),
        });

        try {   
            await user.save()
            res.status(201).json({
                user,
                message: 'User was created'
            })
        } catch (e) {
            errorHandler(res, e);
        }

    }
}