
import express from "express";
// import { Router } from "express";
import { signUp, signIn, logOut , allUsers} from "../controls/user.controler.js";
import secureRoute from "../middleware/secureRoute.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/logout", logOut);
router.get("/allusers", secureRoute, allUsers); // Assuming you have a function to get all users


export default router;