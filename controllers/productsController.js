const Product = require('../models/product');
const getNextSequenceValue = require('../utilities/database/counter/getNextSequenceValue');
const messageClass = require('../utilities/messageClass/messageClass');

const createProduct = async (req, res) => {
    const id = await getNextSequenceValue('productId', 45692);
    try {
        const {
            name, description, images, category, brand, rating, reviews, tags, price, discount, stock, isAvailable, seoTitle, seoDescription,
        } = req.body;

        const product = new Product({
            _id: id, name, description, images, category, brand, rating, reviews, tags, price, discount, stock, isAvailable, seoTitle, seoDescription,
        });

        await product.save();
        res.status(201).json(messageClass(false, product, 'product successfuly created'));
    } catch (err) {
        res.status(400).json(messageClass(true, null, err.message));
    }
};

// Get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(messageClass(false, products, 'Products report successfuly created'));
    } catch (err) {
        res.status(500).json(messageClass(true, null, err.message));
    }
};

// Get a product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json(messageClass(true, null, 'Product not found'));
        }
        res.json(messageClass(false, product, 'Product report created successfuly'));
    } catch (err) {
        res.status(500).json(messageClass(true, null, err.message));
    }
};

// Update a product
const updateProduct = async (req, res) => {
    try {
        const {
            name, description, images, category, brand, rating, reviews, tags, price, discount, stock, isAvailable, seoTitle, seoDescription,
        } = req.body;

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name, description, images, category, brand, rating, reviews, tags, price, discount, stock, isAvailable, seoTitle, seoDescription,
            },
            { new: true }
        );

        if (!product) {
            return res.status(404).json(messageClass(true, null, 'Product not found'));
        }

        res.json(messageClass(false, product, 'product updated successfuly'));
    } catch (err) {
        res.status(500).json(messageClass(true, null, err.message));
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json(messageClass(true, null, 'Product not found'));
        }
        res.json(messageClass(false, null, 'Product deleted'));
    } catch (err) {
        res.status(500).json(messageClass(true, null, err.message));
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};