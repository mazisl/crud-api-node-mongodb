//here we create a product model we will use to save data in MongoDB

//to create product model we need to include mongoose in this file
//we use mongoose for everything that interacts with the database
const mongoose = require('mongoose');

//we need prod schema to determine what kind of data we have in prod model
//inside schema we create fields and their types
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a product name']
    },
    quantity: {
      type: Number,
      required: true,
      default: 0
    },
    price: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: false
    }
  },

  {
    timestamps: true
  }
)

const Product = mongoose.model('Product', productSchema);

module.exports = Product;