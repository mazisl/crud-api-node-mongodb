const express = require('express')
const app = express()

const Product = require('./models/productModel')

const mongoose = require('mongoose')

//this enables us to use json for our API requests
app.use(express.json())

//this enables us to use form data for our API requests
app.use(express.urlencoded({extended: false}))

//routes
app.get('/', (req, res) => {
  res.send(`Hello Node API`)
})

app.get('/blog', (req, res) => {
  res.send(`Hello blog! My name is Devtamin`)
})

//we want to connect to our DB before running node server
//therefore we will move this code inside .then of mongoose.connect
// app.listen(3000, () => {
//   console.log(`Node API is running on port 3000`)
// })

//now we come back here after creating our product model
app.post('/products', async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(200).json(product)
    
  } catch (err) {
    console.log(err.message)
    res.status(500).json({message: err.message})
  }
})

//with this get method we retrieve data from our database
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find({})
    res.status(200).json(products)

  } catch (err) {
    console.log(err.message)
    res.status(500).json({message: err.message})
  }
})

//this is to fetch a single prod using id
app.get('/products/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const product = await Product.findById(id)
    res.status(200).json(product)

  } catch (err) {
    console.log(err.message)
    res.status(500).json({message: err.message})
  }
})

//update a product
app.put('/products/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body)
    //if prod not found in db
    if (!product) {
      return res.status(404).json({message: `Cannot find product with ID ${id}`})
    }
    //else if prod is found in db
    const updatedProduct = await Product.findById(id)
    res.status(200).json(updatedProduct)

  } catch (err) {
    console.log(err.message)
    res.status(500).json({message: err.message})
  }
})

//delete a product
app.delete('/products/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id)
    //if prod not found in db
    if (!product) {
      return res.status(404).json({message: `Cannot find product with ID ${id}`})
    }
    //else if prod is found and deleted from db
    res.status(200).json(product)

  } catch (err) {
    console.log(err.message)
    res.status(500).json({message: err.message})
  }
})

mongoose
  .connect('mongodb+srv://mazislam1:9mKb3E27kgb@cluster0.oxe5rgr.mongodb.net/RESTful-API-with-node?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    app.listen(3000, () => {
      console.log(`Node API is running on port 3000`)
    })
    console.log('connected to MongoDB')
  })
  .catch((err) => {
    console.log(err)
  })
