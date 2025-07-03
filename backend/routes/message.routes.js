import express from 'express';
import { getMessage, sendMessage } from '../controls/message.controller.js'; // Import the sendMessage function
import secureRoute from '../middleware/secureRoute.js';
const router =  express.Router();
router.post("/send/:id", secureRoute, sendMessage);
router.get("/get/:id", secureRoute, getMessage);

export default router;