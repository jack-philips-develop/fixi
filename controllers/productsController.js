const Product = require('../models/product');
const getNextSequenceValue = require('../utilities/database/counterFunction/getNextSequenceValue');

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
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
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
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};