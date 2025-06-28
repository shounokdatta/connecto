import express from 'express';
import { chackAuth,updateProfile,signup, login, logout } from '../controllers/auth.controllar.js';
import {protectRoute} from '../middleware/auth.middelware.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update-Profile",protectRoute, updateProfile);
router.get("/check", protectRoute, chackAuth);

export default router;