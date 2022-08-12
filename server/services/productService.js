const Product = require("../models/Product.js")

const getAll = async (subtype) => {
    try {
        
    }
    catch (err) {
        console.log(err);
        return { status: 'err' };
    }
}
const subtypeFilter = (products, subtype) => {
    if(subtype === 'all') {
        return products;
    }
    let result = products.filter(x => x.subtype === subtype);
    return result;

}
const getOne = async (id) => {
    try {
        let product = await Product.findById(id).lean()
        return product;
    }
    catch (err) {
        console.log(err);
        return { status: 'err' };
    }
}

const getByType = async (animal, subtype) => {
    try {
        let products = await Product.find({}).lean();
        if(animal !== 'all') {
        products = products.filter(x => x.animal === animal);
        }
        let result = subtypeFilter(products, subtype);

        return result;
    }
    catch (err) {
        console.log(err);
        return { status: 'err' };
    }
}

const rateProduct = async ({ _id, rating, userId }) => {
    try {
        let product = await Product.findById(_id);
        let index = product.rating.findIndex(x => x.userId.toString() === userId);

        if (index !== -1) {
            product.rating[index].rating = rating;
        }
        else {
            product.rating.push({ userId, rating });
        }

        await product.save();
        return { status: 'ok' };
    }
    catch (err) {
        console.log(err);
        return { status: 'error' }
    }
}
const productService = {
    getAll,
    getByType,
    getOne,
    rateProduct
}

module.exports = productService;