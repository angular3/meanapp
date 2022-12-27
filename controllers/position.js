const Position = require('../models/position');
const errorHandler = require('../utils/errorHandler');

module.exports.getByCategoryId = async (req, res) => {
    try {
        const positions = await Position.find({
            category: req.params.categoryId,// get catId from REQUEST PARAMS MAAAN
            user: req.user.id // user field here we add in our middleware, get it from token :D
        }) 
        res.status(200).json(positions);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.create = async (req, res) => {
    try {
        const position = await new Position({
            name: req.body.name,
            cost: req.body.cost,
            category: req.body.category,
            user: req.user.id
        }).save()// when we use save - mongoose add id field to our position and then we just return it
        res.status(201).json(position)
        
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.remove = async (req, res) => {
    try {
        await Position.remove({ _id: req.params.id });
        res.status(200).json({
            message: 'Position was removed'
        });       
    } catch (e) {
        errorHandler(res, e);
    }
}
module.exports.update = async (req, res) => {
    try {
        const position = await Position.findByIdAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(position);
    } catch (e) {
        errorHandler(res, e);
    }
}