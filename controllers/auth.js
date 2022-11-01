const bcrypt = require('bcryptjs');
const User = require('../models/User')

module.exports.login = (req, res) => {
    res.status(200).json({
        login: {
            email: req.body.email,
            pass: req.body.pass,
        },
    })
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
            //TODO: handle err
        }

    }
}