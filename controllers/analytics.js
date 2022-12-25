const moment = require('moment');
const Order = require('../models/Order');
const errorHandler = require('../utils/errorHandler');


errorHandler

module.exports.overview = async (req, res) => {
    try {
        const allOrders = await Order.find({ user: req.user.id }).sort(1);
        const ordersMap = getOrdersMap(allOrders);
        const yesterdaysOrders = ordersMap[moment().add(-1, 'd').format('DD.MM.YYYY')] || []; // here we add -1 day to current one
        const yesterdaysOrdersCount = yesterdaysOrders.length;

        // count of all orders:
        const allOrdersCount = allOrders.length;
        // count of all working days(when we have orders):
        const allDaysCount = Object.keys(ordersMap).length;
        // oprders per day:
        const ordersPerDay = (allOrdersCount / allDaysCount).toFixed(0);
        // percent of orders count
        const ordersPercent = (((yesterdaysOrdersCount / ordersPerDay) - 1) * 100).toFixed(2);
        // total gain:
        const totalGain = calculatePrice(allOrders);
        // gain per day: 
        const gainPerDay = totalGain / allDaysCount;
        // gain for yesterday:
        const yesterdaysGain = calculatePrice(yesterdaysOrders);
        //gain percent:
        const gainPercent = (((yesterdaysGain / gainPerDay) - 1) * 100).toFixed(2);
        // compare our gain:
        const compareGain = (yesterdaysGain - gainPerDay).toFixed(2);
        //compare numbers of orders:
        const compareOrdersNumbers = (yesterdaysOrdersCount - ordersPerDay).toFixed(2);

        res.status(200).json({
            gain: {
                precent: Math.abs(+gainPercent),
                compare: Math.abs(+compareGain),
                yesterday: +yesterdaysGain,
                isHigher: gainPercent > 0,
            }, 
            orders: {
                precent: Math.abs(+ordersPercent),
                compare: Math.abs(+compareOrdersNumbers),
                yesterday: +yesterdaysOrders,
                isHigher: ordersPercent > 0,
            }
        })
    } catch (e) {
        errorHandler(res, e);
    }

}

module.exports.analytics = (req, res) => {

}


function getOrdersMap(orders= []) {
    const daysOrders = {}; 
    orders.forEach(order => {
        const date = moment(order.date).format('DD.MM.YYYY');

        if(date === moment().format('DD.MM.YYYY')) {
            return;
        }

        if (!daysOrders[date]) {
            daysOrders[date] = [];
        }
        daysOrders[date].push(order);
    })
    return daysOrders;
};

function calculatePrice(orders = []) {
    return orders.reduce((acc, order) => {
        const orderPrice = order.list.reduce((orderTotal, el) => {
            return orderTotal += el.cost * el.quantity;
        }, 0);
        return acc += orderPrice;
    }, 0)
}