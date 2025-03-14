import jwt from "jsonwebtoken";
import { config } from "../config/auth.config.js"; // Import the JWT config from "../config/auth.config.js"; // Import the JWT configuration

console.log("JWT Secret Key:", config.secret); // Debugging line

export const login = (req, res) => {
    if (req.body.username !== "test") {
        return res.status(401).send({ message: "User not found." });
    }

    if (req.body.password === "test") {
        // Generate a JWT token
        const token = jwt.sign({ id: req.body.username }, config.secret, { expiresIn: 86400 });

        return res.status(200).send({ message: "Login successful", accessToken: token });
    } else {
        return res.status(401).send({ message: "Invalid password" });
    }
};

export const admin = (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Admin area reached successfully"
    });
};
