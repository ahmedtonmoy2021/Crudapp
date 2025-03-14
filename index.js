import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import Product from "./models/productModel.js";
import apiRoutes from "./routes/api-routes.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Use API routes
app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  res.send("hello node api");
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/product", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ message: `Cannot find any product with ID ${id}` });
    }
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: `Cannot find product with ID ${id}` });
    }
    res.status(200).json({ message: "Product deleted successfully", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// MongoDB Connection
mongoose
  .connect("mongodb+srv://ahmedtonmoy:admin@tonmoy.qi8qj.mongodb.net/Node-Api?retryWrites=true&w=majority&appName=Tonmoy")
  .then(() => {
    console.log("Connected to the database");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.log(error);
  });

