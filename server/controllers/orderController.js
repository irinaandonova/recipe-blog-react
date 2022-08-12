const router = require('express').Router();
const orderService = require('../services/orderService.js');

router.post('', async(req, res) => {
    const { userDetails, paymentMethod, cart } = req.body;

    try {
        let result = await orderService.createOrder({ userDetails, paymentMethod, cart });
        res.json(result);
    }
    catch(err) {
        console.log(err);
        return { status: 'err', err }
    }
    
})

module.exports = router;