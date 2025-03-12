const mongoose = require('mongoose')
const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "please enter a product name"] // Validation error message
        },

        quantity:{
            type: Number,
            required: true,
            default: 0
        },
        price:{
            type: Number,
            required: true,
        }
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model('product',productSchema);
module.exports = Product;