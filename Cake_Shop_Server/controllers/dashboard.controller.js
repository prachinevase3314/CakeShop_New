const Product = require("../models/product.model");
const Order = require("../models/order.model");
const User = require("../models/user.model");

exports.getDashboardStats = async (req, res, next) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalRevenue = await Order.aggregate([
      {
        $group: {
          _id: null, // We don't want to group by a specific field, just total everything
          totalRevenue: { $sum: "$totalAmount" }, // Sums the 'totalPrice' field
          totalOrders: { $count: {} }, // Optional: also get the count of orders
        },
      },
    ]);

    res.json({
      totalProducts,
      totalOrders,
      totalUsers,
      totalRevenue: totalRevenue.length > 0 ? totalRevenue[0].totalRevenue : 0,
    });
  } catch (error) {
    next(error);
  }
};
