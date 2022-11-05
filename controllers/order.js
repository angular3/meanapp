const Order = require('../models/Order');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async (req, res) => {
    const query = {
        user: req.user.id,
    };
// date from the order creation
    if (req.guery.start) {
        query.date = {
            $gte: req.query.start    //greatful or equall
        }
    };

    // date from the order creation
    if (req.guery.end) {
        if (!query.date) {
            query.date = {};
        }
        query.date[$lte] = req.query.end;   //less or equall
    };

    if (req.query.order) {
        query.order = Number(req.query.order);
    };

    try {
        const orders = await Order
            .find(query)
            .sort({ date: -1 })
            .skip(Number(req.query.offset))
            .limit(Number(req.query.limit));
        
        res.status(200).json({ orders });
    } catch (e) {
        errorHandler(res,e);
    }

}

module.exports.create = async (req, res) => {
    try {
        const lastOrder = await Order
            .findOne({ user: req.user.id })
            .sort({ date: -1 }); // sorting in arrange in descending order

        const maxOrder = lastOrder?.order || 0;
        const order = await new Order({
            //dare will be added by mongoose autimatically
            list: req.body.list,
            order: maxOrder + 1, // number in order of all our orsers
            user: req.user.id,
        }).save()
        res.status(201).json({
            order,
            message: 'order eas created',
        })
    } catch (e) {
        errorHandler(res,e);
    }

}
