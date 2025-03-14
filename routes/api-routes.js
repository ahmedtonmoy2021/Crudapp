import express from "express";
import { login, admin } from "../Controller/userController.js";
import { verifyToken } from "../config/auth.config.js"; 

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    status: "API is Working",
    message: "Welcome to my REST API!",
  });
});

router.post("/login", login);
router.get("/admin", verifyToken, admin);

export default router;
