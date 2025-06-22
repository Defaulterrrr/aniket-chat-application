

import { Router } from "express";
import { signUp, signIn, logOut , getAllUser} from "../controls/user.controler.js";
import secureRoute from "../middleware/secureRoutes.js";

const router = Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/logout", logOut);
router.get("/allusers", secureRoute, getAllUser); // Assuming you have a function to get all users


export default router;