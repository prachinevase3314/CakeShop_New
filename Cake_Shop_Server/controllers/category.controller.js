const Joi = require("joi");
const slugify = require("slugify");
const Category = require("../models/category.model");

const categorySchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  description: Joi.string().max(255).required(),
});

exports.createCategory = async (req, res, next) => {
  try {
    const { error, value } = categorySchema.validate(req.body, {
      abortEarly: false,
    });
    if (error)
      return res.status(400).json({
        error: error.details.map((detail) => detail.message),
      });

    const { name, description } = value;

    const existingCategory = await Category.findOne({
      slug: slugify(name, { lower: true }),
    });
    if (existingCategory)
      return res.status(409).json({ error: "Category already exists" });

    const category = new Category({
      name,
      slug: slugify(name, { lower: true }),
      description,
    });

    const saved = await category.save();

    res.status(201).json({
      message: "Category created successfully",
    });
  } catch (err) {
    next(err);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const { error, value } = categorySchema.validate(req.body, {
      abortEarly: false,
    });
    if (error)
      return res.status(400).json({
        error: error.details.map((detail) => detail.message),
      });

    const { name, description } = value;

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name,
        slug: slugify(name, { lower: true }),
        description,
      },
      { returnDocument: true },
    );

    if (!category) return res.status(404).json({ error: "Category not found" });

    res.json({
      message: "Category updated successfully",
      category,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    next(err);
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (err) {
    next(err);
  }
};
