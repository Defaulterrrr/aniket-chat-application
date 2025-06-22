import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Path from "path"; // yeh path ko import kar raha hai
import { app, server } from "./socketIO/server.js"; // yeh socket.io ka server hai
import cookieParser from "cookie-parser"; // yeh cookie ko parse kar raha hai
import cors from "cors";
// app.use(cors()); // yeh cors ko import kar raha hai
import userRoutes from "./routes/user.routes.js"; // yeh user ki route hai
import messageRoutes from "./routes/message.routes.js"; // yeh message ki route hai
// const app = express()  // yeh line server.js pe forward krdi hai for soket.io------------------------------------
app.use(express.json()); // yeh body ko json main convert kar raha hai
app.use(express.urlencoded({ extended: true })); // yeh url ko json main convert kar raha hai
app.use(cookieParser()); // yeh cookie ko parse kar raha hai
app.use(express.static("public")); // yeh public folder ko static bana raha hai
app.use(cors()); // yeh cors ko use kar raha hai

// ------------------code for deployment-------------------
if (process.env.NODE_ENV === "production") {
  // yeh check kar raha hai ki agar production main hai to
  const dirPath = Path.resolve(); // yeh current directory ka path le raha hai

  app.use(express.static("./frontend/dist")); // yeh frontend ki static files ko serve kar raha hai
  app.get("*", (req, res) => {
    res.sendFile(path.resolve( dirPath, "./frontend/dist", "index.html")); // yeh index.html file ko serve kar raha hai
  });
}

dotenv.config();
const PORT = process.env.PORT || 3002; //env file se port utha rha hai
//env file se URI utha rha hai
const URI = process.env.MONGOOS_URI; // yeh mongodb ki URI hai

if (!URI) {
  console.error("MongoDB URI is not defined. Please check your .env file.");
  process.exit(1); // Exit the application if URI is not defined
}

mongoose
  .connect(URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });
app.use("/api/user", userRoutes); // yeh user ki route ko use kar raha hai
app.use("/api/message", messageRoutes); // yeh message ki route ko use kar raha hai

server.listen(PORT, () => {
  console.log(` app listening on port ${PORT}`);
});
