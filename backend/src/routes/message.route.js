import express from 'express';
import { getUsersForSidebar,getMessages,sendMessage } from '../controllers/message.controller.js';
import { protectRoute } from '../middleware/auth.middelware.js';
import {getAIResponse  } from '../controllers/ai.controllar.js';

const router = express.Router();

router.get("/user",protectRoute, getUsersForSidebar);
router.get("/:id",protectRoute,getMessages);
router.post("/send/:id",protectRoute,sendMessage);
router.post("/chat/ai", getAIResponse );

export default router;
