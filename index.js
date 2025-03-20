import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import productRouter from './routes/product.Routes.js';
import userRouter from './routes/userRoutes.js';

const app = express();
dotenv.config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route Path
app.use('/api/products', productRouter);
app.use("/api/users", userRouter);

// Root Route
app.get('/', (req, res) => {
    res.send('Hello, Node API is running!');
});

// Database Connection
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to the database");
    app.listen(3000, () => console.log("Server running on port 3000"));
  });
