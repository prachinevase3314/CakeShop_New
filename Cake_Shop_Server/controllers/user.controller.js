const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const registerSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.any()
    .valid(Joi.ref("password"))
    .required()
    .messages({ "any.only": "Confirm password must match password" }),
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required(),
  address: Joi.string().min(5).max(255).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const jwtSecret = process.env.JWT_SECRET || "";

exports.registerUser = async (req, res, next) => {
  try {
    const { error, value } = registerSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error)
      return res.status(400).json({
        error: error.details.map((detail) => detail.message),
      });

    const { firstName, lastName, email, password, phone, address } = value;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ error: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      address,
    });

    const saved = await user.save();
    const authToken = jwt.sign(
      { id: saved._id, email: saved.email },
      jwtSecret,
      {
        expiresIn: "7d",
      },
    );

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: saved._id,
        firstName: saved.firstName,
        lastName: saved.lastName,
        email: saved.email,
        phone: saved.phone,
        address: saved.address,
        role: saved.role,
      },
      authToken,
    });
  } catch (err) {
    next(err);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const user = await User.findOne({ email: value.email });
    if (!user)
      return res.status(401).json({ error: "Invalid email or password" });

    const isMatch = await bcrypt.compare(value.password, user.password);
    if (!isMatch)
      return res.status(401).json({ error: "Invalid email or password" });

    const authToken = jwt.sign({ id: user._id, email: user.email }, jwtSecret, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      authToken,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { user_Id } = req.params;
    const user = await User.findById(user_Id);

    if (!user) return res.status(404).json({ error: "User not found" });
    const updatedUser = await User.findByIdAndUpdate(user_Id, req.body, {
      returnDocument: true,
    }).select("-password");
    res.json({ user: updatedUser });
  } catch (err) {
    next(err);
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ user });
  } catch (err) {
    next(err);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.json({ users });
  } catch (err) {
    next(err);
  }
};
