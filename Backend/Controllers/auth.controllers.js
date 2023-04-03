const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    const existingUserWithEmail = await User.findOne({ email });
    const existingUserWithUsername = await User.findOne({ username });

    if (existingUserWithEmail) return res.status(409).json({ message: "Email already exists" });
    
    if (existingUserWithUsername) return res.status(409).json({ message: "Username already exists" });

    const user = new User();
    user.username = username;
    user.email = email;
    user.password = password;

    await user.save();

    const { password: hashedPassword, ...newUser } = user.toJSON()
    res.status(201).json(newUser);
}

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Invalid Credentials" });

    const isMatched = await user.matchPassword(password);
    if (!isMatched) return res.status(404).json({ message: "Invalid Credentials" });

    const { password: userPassword, ...userWithoutPassword } = user.toObject(); 

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.SECRET_KEY);
    res.json({ token, user: userWithoutPassword });
}