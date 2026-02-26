const User = require("../models/User");

exports.createUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const newUser = new User({ username, password, role });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username, password });

    if (!user)
      return res.status(401).json({ message: "Invalid credentials" });

    res.json({
      message: "Login successful",
      role: user.role,
      userId: user._id
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};