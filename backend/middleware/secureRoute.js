import jwt from "jsonwebtoken";
import User from "../models/user.model.js"; // Adjust the path to your User model

const secureRoute = async (req, res, next) => {
  try {
    const token = await req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "No token : authorized denied" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token : unauthorized token" });
    }

    const user = await User.findById(decoded.userId).select("-password");//current logged in user ki details uthana hai
    if (!user) {
      return res.status(401).json({ message: "User not found : unauthorized token" });
    }
    req.user = user; // Attach the user to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error in secureRoute middleware:", error);
  }
};
export default secureRoute;
