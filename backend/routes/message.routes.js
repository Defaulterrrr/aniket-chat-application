import express from 'express';
import sendMessage, { getMessages } from '../controls/message.controller.js'; // Import the sendMessage function
import secureRoute from '../middleware/secureRoutes.js';
const router =  express.Router();
router.post("/send/:id", secureRoute, sendMessage);
router.get("/get/:id", secureRoute, getMessages);

export default router;