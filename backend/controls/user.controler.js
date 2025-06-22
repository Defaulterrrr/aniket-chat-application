import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import createTokenAndCookie from "../jwt/generateTokenAndCookies.js"; // Import the function to create token and cookies

export const signUp = async (req, res) => {
  const { fullname, email, password, confirmPassword } = req.body;

  try {
    // Validate passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(500).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    if (newUser) {
      createTokenAndCookie(newUser._id, res); // Generate token and set cookies
      console.log("User created:", newUser);
      res.status(201).json({
        message: "User created successfully",
        user: {
          _id: newUser._id,
          fullname: newUser.fullname,
          email: newUser.email,
        },
      });
    }
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const signIn = async (req, res) => {
  // Sign-in logic here
  const { email, password } = req.body;
  try {
    const existingUserForSignIn = await User.findOne({ email });
    if (!existingUserForSignIn) {
      return res.status(400).json({ error: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUserForSignIn.password
    );
    if (!isPasswordValid) {
      return res.status(500).json({ error: "Invalid password" });
    }
    // Generate token and set cookies
    createTokenAndCookie(existingUserForSignIn._id, res); // Generate token and set cookies
    res.status(200).json({
      message: "User signed in successfully",
      user: {
        _id: existingUserForSignIn._id,
        fullname: existingUserForSignIn.fullname,
        email: existingUserForSignIn.email,
      },
    });
  } catch (error) {
    error.status = 500;
    console.error("Error during sign-in:", error);
  }
};

export const logOut = (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllUser = async (req, res) => {
  try {
    // Fetch all users from the database
    // You can use pagination or filtering if needed
    const loggedInUser = req.user._id; // Get the logged-in user's ID from the request
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password"); // Exclude password field from the response
    if (!filteredUsers) {
      return res.status(404).json({ error: "No users found" });
    }
    console.log("All users:", filteredUsers);
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
