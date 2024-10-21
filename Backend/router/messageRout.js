import express from "express";
const router = express.Router();
import secureRoute from "./../middleware/secureRoute.js";
import { getMessage, sendMessage } from "../controller/messageControlle.js";
router.post("/send/:id", secureRoute, sendMessage);
router.get("/get/:id", secureRoute, getMessage);

export default router;