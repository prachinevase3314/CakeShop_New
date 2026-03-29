const Joi = require("joi");
const slugify = require("slugify");
const Order = require("../models/order.model");

const orderSchema = Joi.object({
  customerId: Joi.string().hex().length(24).required(),
  products: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().hex().length(24).required(),
        quantity: Joi.number().integer().min(1).required(),
      }),
    )
    .min(1)
    .required(),
  totalAmount: Joi.number().min(0).required(),
});

exports.createOrder = async (req, res, next) => {
  try {
    const { error, value } = orderSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error)
      return res.status(400).json({
        error: error.details.map((detail) => detail.message),
      });

    const { customerId, products, totalAmount } = value;
    const customer = await User.findById(customerId);
    if (!customer) return res.status(404).json({ error: "Customer not found" });

    const order = new Order({
      customerId,
      products,
      totalAmount,
    });

    const saved = await order.save();

    res.status(201).json({
      orderId: saved._id,
      message: "Order created successfully",
    });
  } catch (err) {
    next(err);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    const ordersWithDetails = await Promise.all(
      orders.map(async (order) => {
        const customer = await User.findById(order.customerId).select(
          "name email",
        );
        const products = await Promise.all(
          order.products.map(async (item) => {
            const product = await Product.findById(item.productId).select(
              "name price",
            );
            return {
              productId: item.productId,
              name: product.name,
              price: product.price,
              quantity: item.quantity,
            };
          }),
        );
        return {
          orderId: order._id,
          customerId: order.customerId,
          customerName: customer.name,
          customerEmail: customer.email,
          customerAddress: customer.address,
          products,
          totalAmount: order.totalAmount,
          createdAt: order.createdAt,
          updatedAt: order.updatedAt,
        };
      }),
    );

    res.status(200).json({
      orders: ordersWithDetails,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    next(err);
  }
};
