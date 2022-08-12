const User = require('../models/User.js');
const Order = require('../models/Order.js');

const createOrder = async({ userDetails, cart, paymentMethod }) => {
    const { cartItems, totalPrice } = cart;
    
    try {
        const order = await new Order({ userDetails, cartItems, totalPrice, paymentMethod});
        await order.save();

        const user = await User.findById(userDetails.userId);
        user.hasOrder = true;
        user.save();

        return { status: 'ok', cart };
    }
    catch(err) {
        console.log(err);
        return 'error'
    }
}

const orderService = {
    createOrder,
}

module.exports = orderService;