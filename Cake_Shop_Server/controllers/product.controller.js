const Joi = require("joi");
const slugify = require("slugify");
const Product = require("../models/product.model");

const productSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().max(500).required(),
  productCategory: Joi.string().required(),
  price: Joi.number().positive().precision(2).required(),
  stock: Joi.number().integer().min(0).required(),
});

exports.createProduct = async (req, res, next) => {
  try {
    const { error, value } = productSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error)
      return res.status(400).json({
        error: error.details.map((detail) => detail.message),
      });

    const { name, description, price, stock, productCategory } = value;

    const existingProduct = await Product.findOne({
      slug: slugify(name, { lower: true }),
    });
    if (existingProduct)
      return res.status(409).json({ error: "Product already exists" });

    const imageUrl = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : undefined;

    const product = new Product({
      name,
      slug: slugify(name, { lower: true }),
      description,
      productCategory,
      price,
      stock,
      image: imageUrl,
    });

    const saved = await product.save();

    res.status(201).json({
      message: "Product created successfully",
      product: saved,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { error, value } = productSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error)
      return res.status(400).json({
        error: error.details.map((detail) => detail.message),
      });

    const { name, description, price, stock, productCategory } = value;

    const updateData = {
      name,
      productCategory,
      slug: slugify(name, { lower: true }),
      description,
      price,
      stock,
    };

    if (req.file) {
      updateData.image = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
      returnDocument: true,
    });

    if (!product) return res.status(404).json({ error: "Product not found" });

    res.json({
      message: "Product updated successfully",
      product,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    next(err);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find()
      .populate("productCategory", "name")
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (err) {
    next(err);
  }
};
