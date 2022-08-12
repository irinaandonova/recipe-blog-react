const router = require('express').Router();
const productService = require('../services/productService.js');

router.get('/details/:_id', async (req, res) => {
    const id = req.params._id;
    try {
        let product = await productService.getOne(id);

        let result = JSON.stringify(product);
        res.json(result)
    }
    catch (err) {
        console.log(err);
        return res.json({ status: 'err' });
    }

});

router.get('/:animal/:subtype', async (req, res) => {
    const animal = req.params.animal;
    const subtype = req.params.subtype;
    console.log(subtype);
    const animals = ['all', 'dog', 'cat', 'roden', 'other'];

    if (!animals.includes(animal)) {
        res.json({ status: 'error' });

        return;
    }
    try {
        let products = await productService.getByType(animal, subtype);

        res.json({ status: 'ok', products });
    }
    catch (err) {
        console.log(err);
        return res.json({ status: 'err' });
    }
});

router.post('/:_id/rate', async (req, res) => {
    const { _id } = req.params;
    const { userId, rating } = req.body;

    try {
        let response = await productService.rateProduct({ _id, userId, rating });
        res.json(response);
    }
    catch (err) {
        console.log(err);
        return res.json({ status: 'err' });
    }
});

module.exports = router;