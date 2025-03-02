const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

class authController {
  // Register a new user
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      // Validate input
      if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const user = new User({ name, email, password: hashedPassword });
      await user.save();

      res.redirect('/signin'); // Redirect to login page
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }

  // User login
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Ensure JWT_SECRET is set
      if (!process.env.JWT_SECRET) {
        return res.status(500).json({ message: "JWT secret is not defined" });
      }

      // Generate JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

      // Store token in HTTP-only cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600000, // 1 hour
      });

      res.redirect('/show'); // Redirect to the dashboard
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }

  // Logout user
  async logout(req, res) {
    try {
      res.clearCookie("token", "", { httpOnly: true, expires: new Date(0) });
      res.redirect('/signin'); // Redirect to login page
    } catch (error) {
      res.status(500).json({ message: "Logout failed", error: error.message });
    }
  }
}

module.exports = new authController();
