const User = require("../Models/userModel.js");

exports.adminMiddleware = async (req, res, next) => {

  const user = req.user;

  if (user.role === "admin") return next()

  return res.status(401).json({ message: "Unauthorized" })
}