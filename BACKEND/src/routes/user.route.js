import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { getAllUrls } from '../controller/user.controller.js';

const router = express.Router();

router.post("/urls",authMiddleware,getAllUrls)

export default router